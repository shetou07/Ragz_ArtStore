
import React, { useState } from 'react';
import { ViewType } from '../types';
import { GoogleGenAI } from '@google/genai';

interface HeaderProps {
  onNavigate: (view: ViewType, payload?: any) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isDarkMode, toggleDarkMode }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchInsight, setSearchInsight] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchInsight(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a very brief (1-2 sentences) artistic or market context for the search query: "${query}". Focus on current trends or historical significance.`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      
      setSearchInsight(response.text || null);
    } catch (err) {
      console.error('Search grounding failed', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#111921]/90 backdrop-blur-md border-b border-[#f0f2f4] dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('Gallery')}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="size-8 text-primary transition-transform group-hover:scale-110">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-[#111418] dark:text-white">ArtSpace</h1>
            </button>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => onNavigate('Gallery')} className="text-sm font-medium text-[#111418] dark:text-gray-200 hover:text-primary transition-colors">Gallery</button>
              <button onClick={() => onNavigate('Artist', 'elena-vora')} className="text-sm font-medium text-[#637588] dark:text-gray-400 hover:text-primary transition-colors">Artists</button>
              <button className="text-sm font-medium text-[#637588] dark:text-gray-400 hover:text-primary transition-colors">About</button>
              <button onClick={() => onNavigate('Contact')} className="text-sm font-medium text-[#637588] dark:text-gray-400 hover:text-primary transition-colors">Contact</button>
            </nav>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end max-w-xl">
            <form onSubmit={handleSearch} className="relative hidden sm:flex w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className={`material-symbols-outlined text-[#637588] dark:text-gray-500 group-focus-within:text-primary transition-colors ${isSearching ? 'animate-spin' : ''}`} style={{ fontSize: '20px' }}>
                  {isSearching ? 'progress_activity' : 'search'}
                </span>
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2 border-none rounded-lg leading-5 bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white placeholder-[#637588] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all sm:text-sm" 
                placeholder="Search artwork, trends..." 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {searchInsight && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white dark:bg-[#1a222c] shadow-xl rounded-lg border border-primary/20 text-xs text-[#637588] dark:text-gray-400 fade-in z-[60]">
                  <div className="flex items-center gap-2 mb-1 text-primary font-bold uppercase tracking-widest text-[10px]">
                    <span className="material-symbols-outlined text-[14px]">google</span>
                    Market Insight
                  </div>
                  {searchInsight}
                </div>
              )}
            </form>
            
            <button 
              onClick={toggleDarkMode}
              className="flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[#111418] dark:text-white" style={{ fontSize: '24px' }}>
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>
            
            <button 
              onClick={() => onNavigate('AdminLogin')}
              className="relative group focus:outline-none shrink-0"
            >
              <div 
                className="size-10 rounded-full bg-cover bg-center ring-2 ring-transparent group-hover:ring-primary transition-all" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbaA0otXBHzaGGmrhDHDyjTurRwa7RZ7XsCDyLaPaC_oGOMq9zX58fBuOZQQoCbLEbVjGJ253NiP4e5PsTwsyhrH_MAFZkQJA2mJ0iicZtnD5eqoJvotouAlkb4YKyWsjCazBY1VhnJ8Jy2R9KnKpCXz8WHwuNjCPfnJstQS2pcw71kNedRTVj8g8822DmRq6e-zT5u2U4QeCmgXkz31ATHm5ESkQP_eaBB9PH_XqTaejK8jrpuXrjCSUz1WB-XoMEzlaEXojjf0Tu')" }}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
