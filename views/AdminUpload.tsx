
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { supabase } from '../lib/supabase';
import { Artist } from '../types';

interface AdminUploadProps {
  artists: Artist[];
  onCancel: () => void;
  onPublished: () => void;
}

const AdminUpload: React.FC<AdminUploadProps> = ({ artists, onCancel, onPublished }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Paintings');
  const [price, setPrice] = useState<number>(0);
  const [artistId, setArtistId] = useState(artists[0]?.id || '');
  const [description, setDescription] = useState('');
  const [medium, setMedium] = useState('Acrylic on Canvas');
  const [dimensions, setDimensions] = useState('100 x 100 cm');
  const [year, setYear] = useState('2024');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handlePublish = async () => {
    if (!title || !selectedFile || !artistId) {
      alert("Please fill in the title, select an artist, and upload an image.");
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload Image to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `artwork-images/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('art-assets')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('art-assets')
        .getPublicUrl(filePath);

      // 3. Insert Row to Database
      const artist = artists.find(a => a.id === artistId);
      const { error: insertError } = await supabase
        .from('artworks')
        .insert([{
          title,
          artist: artist?.name || 'Unknown',
          artistId,
          price,
          category,
          image_url: publicUrl,
          description,
          medium,
          dimensions,
          year,
          status: 'Available',
          dateAdded: new Date().toISOString()
        }]);

      if (insertError) throw insertError;

      onPublished();
    } catch (err) {
      console.error('Publishing failed:', err);
      alert('Error publishing artwork. Check if the "art-assets" bucket exists in Supabase.');
    } finally {
      setIsUploading(false);
    }
  };

  const generateAIStory = async () => {
    if (!title) {
      alert("Please enter a title first.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Provide a high-end, gallery-ready critical analysis and description for an artwork titled "${title}" in the category "${category}". 
                   The description should be rooted in Rwandan cultural context, mentioning local themes, landscapes, or traditional concepts like Imigongo if applicable. 
                   Maintain a tone suitable for a luxury art house in Kigali.`,
        config: {
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });
      
      const story = response.text || "Could not generate analysis at this time.";
      setDescription(story);
    } catch (err) {
      console.error(err);
      alert("AI Analysis failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fade-in flex flex-col h-screen bg-backgroundLight dark:bg-backgroundDark">
      <header className="flex items-center justify-between border-b px-6 py-3 bg-white dark:bg-[#1a222c] shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-500">My Artwork / Upload</span>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="h-10 px-4 rounded-lg border border-slate-200 dark:border-[#374151] bg-white dark:bg-[#1f2937] text-sm font-medium">Cancel</button>
          <button 
            onClick={handlePublish} 
            disabled={isUploading}
            className="h-10 px-6 rounded-lg bg-primary text-white text-sm font-bold flex gap-2 items-center hover:bg-blue-600 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <span className="material-symbols-outlined animate-spin !text-[18px]">progress_activity</span>
                Publishing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">publish</span>
                Publish
              </>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6 pb-20">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#111418] dark:text-white">Curate New Piece</h1>
            <p className="text-slate-500">Expanding Rwanda's digital art legacy.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h3 className="text-lg font-bold dark:text-white">Media</h3>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex flex-col items-center justify-center w-full aspect-[4/5] rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-[#1a222c] hover:border-primary transition-all cursor-pointer overflow-hidden"
              >
                {previewUrl ? (
                  <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center px-4">
                    <div className="rounded-full bg-slate-100 dark:bg-slate-700 p-4 mb-3">
                      <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
                    </div>
                    <p className="text-sm font-medium dark:text-gray-200">Select Artwork Image</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="bg-white dark:bg-[#1a222c] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="text-lg font-bold mb-5 pb-2 border-b dark:text-white dark:border-gray-800">Piece Details</h3>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium dark:text-gray-200">Title <span className="text-red-500">*</span></label>
                    <input 
                      className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-transparent px-4 py-2.5 dark:text-white focus:ring-primary focus:border-primary" 
                      placeholder="e.g. Morning in Musanze" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium dark:text-gray-200">Price (RWF)</label>
                      <input 
                        className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-transparent px-4 py-2.5 dark:text-white focus:ring-primary focus:border-primary" 
                        placeholder="500,000" 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium dark:text-gray-200">Artist</label>
                      <select 
                        className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-transparent dark:bg-[#1a222c] dark:text-white focus:ring-primary focus:border-primary"
                        value={artistId}
                        onChange={(e) => setArtistId(e.target.value)}
                      >
                        {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a222c] p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center justify-between mb-5 border-b pb-2 dark:border-gray-800">
                  <h3 className="text-lg font-bold dark:text-white">Cultural Narrative</h3>
                  <button 
                    onClick={generateAIStory}
                    disabled={isGenerating}
                    className="flex items-center gap-2 text-xs font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors border border-primary/20 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined !text-[16px]">{isGenerating ? 'refresh' : 'auto_awesome'}</span>
                    {isGenerating ? 'Drafting...' : 'AI Cultural Assistant'}
                  </button>
                </div>
                <div className="flex flex-col gap-1.5">
                  <textarea 
                    className="w-full rounded-lg border-slate-300 dark:border-gray-700 bg-transparent p-4 text-base min-h-[220px] dark:text-white focus:ring-primary focus:border-primary" 
                    placeholder="Describe the cultural significance of this piece..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUpload;
