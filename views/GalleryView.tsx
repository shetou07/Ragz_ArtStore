
import React, { useState } from 'react';
import { Artwork } from '../types';

interface GalleryViewProps {
  artworks: Artwork[];
  onArtworkClick: (id: string) => void;
}

const GalleryView: React.FC<GalleryViewProps> = ({ artworks, onArtworkClick }) => {
  const [filter, setFilter] = useState('All Art');

  const filteredArtworks = artworks.filter(artwork => 
    filter === 'All Art' || artwork.category === filter
  );

  return (
    <div className="fade-in py-8 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      {/* Hero Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111418] dark:text-white mb-3">Rwandan Modern Art</h2>
          <p className="text-lg text-[#637588] dark:text-gray-400 max-w-xl">
            A curated space for Rwanda's finest independent creators. From the hills of Musanze to the heart of Kigali.
          </p>
        </div>
        
        {/* Chips */}
        <div className="flex flex-wrap gap-2 md:justify-end">
          {['All Art', 'Paintings', 'Photography', 'Digital', 'Sculpture'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white dark:bg-gray-800 border border-[#e5e7eb] dark:border-gray-700 text-[#111418] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      {filteredArtworks.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 masonry-grid space-y-6 pb-20">
          {filteredArtworks.map((artwork) => (
            <div 
              key={artwork.id}
              onClick={() => onArtworkClick(artwork.id)}
              className="masonry-item break-inside-avoid group relative cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-800">
                <img 
                  alt={artwork.title} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" 
                  loading="lazy" 
                  src={artwork.image_url}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white/90 backdrop-blur text-[#111418] px-5 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Piece
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[#111418] dark:text-white font-bold leading-tight text-lg group-hover:text-primary transition-colors">{artwork.title}</h3>
                    <p className="text-[#637588] dark:text-gray-400 text-sm mt-0.5">{artwork.artist}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-primary font-bold text-sm">{artwork.price?.toLocaleString()} RWF</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-400">
           <span className="material-symbols-outlined text-4xl mb-2">image_search</span>
           <p>No artworks found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default GalleryView;
