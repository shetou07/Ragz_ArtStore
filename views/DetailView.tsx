
import React from 'react';
import { Artwork, Artist } from '../types';

interface DetailViewProps {
  artwork: Artwork;
  artists: Artist[];
  artworks: Artwork[];
  onArtistClick: (id: string) => void;
  onRelatedClick: (id: string) => void;
}

const DetailView: React.FC<DetailViewProps> = ({ artwork, artists, artworks, onArtistClick, onRelatedClick }) => {
  if (!artwork) return null;
  
  const artist = artists.find(a => a.id === artwork.artistId);
  const moreFromArtist = artworks.filter(a => a.artistId === artwork.artistId && a.id !== artwork.id).slice(0, 4);
  const displayImageUrl = artwork.imageUrl || (artwork as any).image_url;

  return (
    <div className="fade-in max-w-[1280px] mx-auto py-10 px-4 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Imagery & Description */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
          <div className="group relative w-full bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm aspect-[4/3] lg:aspect-auto lg:h-[600px]">
            <div 
              className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url("${displayImageUrl}")` }}
            ></div>
            <button className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/70 p-2 rounded-lg backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-black transition-colors">
              <span className="material-symbols-outlined text-text-main dark:text-white">zoom_in</span>
            </button>
          </div>
          
          <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-8">
            <h3 className="text-lg font-bold mb-4 text-[#111418] dark:text-white">About the Work</h3>
            <div className="prose dark:prose-invert max-w-none text-[#637588] dark:text-gray-400 leading-relaxed">
              <p className="mb-4">{artwork.description}</p>
              <p>This piece embodies the spirit of <em>Agaciro</em> (Dignity). Each brushstroke reflects the resilience and beauty of the Rwandan landscape, drawing heavily from the traditional aesthetics found in national heritage sites.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="pb-6 border-b border-gray-100 dark:border-gray-800">
              <button 
                onClick={() => onArtistClick(artwork.artistId)} 
                className="text-primary font-semibold text-lg hover:underline mb-1 inline-block"
              >
                {artwork.artist}
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-[#111418] dark:text-white tracking-tight mb-4">{artwork.title}</h1>
              <div className="flex items-end gap-3">
                <span className="text-2xl font-medium text-[#111418] dark:text-white">{artwork.price?.toLocaleString()} RWF</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                <span>Inquire to Buy</span>
              </button>
              <button className="w-full h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#111418] dark:text-white font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                Book a Private Viewing
              </button>
              <p className="text-xs text-center text-[#637588] mt-1 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">local_shipping</span> 
                Available for local delivery in Kigali
              </p>
            </div>

            <div className="bg-[#f6f7f8] dark:bg-[#1a202c] rounded-xl p-5 border border-transparent dark:border-gray-800">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider text-[#637588] font-semibold">Medium</span>
                  <span className="text-sm font-medium dark:text-white">{artwork.medium}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider text-[#637588] font-semibold">Dimensions</span>
                  <span className="text-sm font-medium dark:text-white">{artwork.dimensions}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider text-[#637588] font-semibold">Year</span>
                  <span className="text-sm font-medium dark:text-white">{artwork.year}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-wider text-[#637588] font-semibold">Location</span>
                  <span className="text-sm font-medium dark:text-white">Kigali, Rwanda</span>
                </div>
              </div>
            </div>

            {artist && (
              <div className="flex items-center gap-4 pt-4">
                <div className="size-12 rounded-full bg-gray-300 overflow-hidden shrink-0">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${artist.avatarUrl}")` }}></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold dark:text-white">{artist.name}</span>
                  <span className="text-xs text-[#637588]">{artist.location}</span>
                  <button onClick={() => onArtistClick(artist.id)} className="text-xs text-primary font-medium mt-0.5 hover:underline text-left">View Profile</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
