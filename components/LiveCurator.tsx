
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Blob } from '@google/genai';
import { Artwork } from '../types';

interface LiveCuratorProps {
  artworks: Artwork[];
}

// Audio Helpers
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const LiveCurator: React.FC<LiveCuratorProps> = ({ artworks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<string>('Muraho! Ready to talk');
  const [transcript, setTranscript] = useState<{role: 'user' | 'model', text: string}[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    for (const source of activeSourcesRef.current) {
      source.stop();
    }
    activeSourcesRef.current.clear();
    setIsActive(false);
    setStatus('Muraho! Ready to talk');
  }, []);

  const startSession = async () => {
    try {
      setStatus('Connecting to Kigali...');
      setIsActive(true);
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const collectionContext = artworks.map(a => `${a.title} by ${a.artist}`).join(', ');

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: `You are Artie, a world-class art curator based in Kigali, Rwanda. You are sophisticated, friendly, and knowledgeable about East African art history, traditional Imigongo patterns, and the contemporary Rwandan creative scene. 
          You greet users with "Muraho" and use Rwandan cultural context in your explanations. 
          The current collection includes: ${collectionContext}. 
          Keep responses concise and engaging for a voice conversation.`,
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            setStatus('Listening...');
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              activeSourcesRef.current.add(source);
              source.onended = () => activeSourcesRef.current.delete(source);
            }
            if (message.serverContent?.interrupted) {
              for (const source of activeSourcesRef.current) source.stop();
              activeSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscript(prev => [...prev.slice(-10), { role: 'user', text }]);
            }
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscript(prev => [...prev.slice(-10), { role: 'model', text }]);
            }
          },
          onerror: (e) => {
            console.error('Live Curator Error:', e);
            stopSession();
          },
          onclose: () => {
            stopSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start Live Curator:', err);
      stopSession();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-80 h-[450px] bg-white dark:bg-[#1a222c] shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#111921]">
            <div className="flex items-center gap-2">
              <div className={`size-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="font-bold text-sm dark:text-white">Artie: Kigali Curator</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth bg-white dark:bg-[#1a222c]">
            {transcript.length === 0 && (
              <div className="text-center text-gray-400 dark:text-gray-500 mt-10">
                <span className="material-symbols-outlined text-[48px] mb-2 opacity-20">forum</span>
                <p>Ask me about Rwanda's art heritage.</p>
              </div>
            )}
            {transcript.map((t, i) => (
              <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl ${
                  t.role === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}>
                  {t.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 dark:bg-[#111921] border-t dark:border-gray-800 flex flex-col items-center gap-3">
            <button 
              onClick={isActive ? stopSession : startSession}
              className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                isActive 
                  ? 'bg-red-50 text-red-600 border border-red-100' 
                  : 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20'
              }`}
            >
              <span className="material-symbols-outlined">{isActive ? 'stop' : 'mic'}</span>
              {isActive ? 'Baho' : 'Talk with Artie'}
            </button>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{status}</p>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`size-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
          isOpen ? 'rotate-90 bg-gray-100 dark:bg-gray-800 text-gray-600' : 'bg-primary text-white hover:scale-110 active:scale-95'
        }`}
      >
        <span className="material-symbols-outlined text-[28px]">{isOpen ? 'close' : 'chat_bubble'}</span>
      </button>
    </div>
  );
};

export default LiveCurator;
