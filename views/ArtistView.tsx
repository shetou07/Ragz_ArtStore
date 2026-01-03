
import React from 'react';
import { Artist, Artwork } from '../types';

interface ArtistViewProps {
  artist: Artist;
  artworks: Artwork[];
  onArtworkClick: (id: string) => void;
}

const ArtistView: React.FC<ArtistViewProps> = ({ artist, artworks, onArtworkClick }) => {
  const latestWorks = artworks.filter(a => a.artistId === artist.id).slice(0, 3);

  return (
    <div className="fade-in flex flex-col items-center py-5 md:py-10">
      <div className="flex flex-col max-w-[960px] flex-1 w-full px-4 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12 items-start">
          <div className="w-full md:w-1/2 lg:w-[45%] flex-shrink-0 md:sticky md:top-24">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-sm bg-gray-200 dark:bg-gray-800 group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${artist.avatarUrl}")` }}></div>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col gap-8 pt-2">
            <div className="flex flex-col gap-3">
              {artist.featured && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">Featured Artist</span>
                </div>
              )}
              <h1 className="text-[#111418] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">{artist.name}</h1>
              <h2 className="text-[#637588] dark:text-gray-300 text-lg font-normal leading-normal">Independent Artist based in {artist.location}.</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center border-b border-[#f0f2f4] dark:border-gray-800 pb-8">
              <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-blue-600 text-white text-base font-bold transition-all shadow-md shadow-blue-500/20">
                View Collection
              </button>
              <div className="flex gap-2">
                {['language', 'photo_camera', 'alternate_email'].map(icon => (
                  <button key={icon} className="size-10 flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 border border-[#f0f2f4] dark:border-gray-700 text-[#111418] dark:text-white hover:text-primary hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-[#111418] dark:text-white tracking-tight text-2xl font-bold">Biography</h3>
              <div className="text-[#111418] dark:text-gray-300 text-base font-normal leading-relaxed space-y-4">
                <p>{artist.biography}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-[#111418] dark:text-white tracking-tight text-2xl font-bold">Artistic Statement</h3>
              <div className="bg-white dark:bg-gray-800 border-l-4 border-primary p-6 rounded-r-lg shadow-sm">
                <p className="text-[#111418] dark:text-gray-200 text-lg font-medium italic leading-relaxed">
                  "{artist.statement}"
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div><span className="block text-[#637588] dark:text-gray-400 mb-1">Born</span><span className="font-medium dark:text-white">{artist.born || 'N/A'}</span></div>
              <div><span className="block text-[#637588] dark:text-gray-400 mb-1">Based in</span><span className="font-medium dark:text-white">{artist.location}</span></div>
              <div><span className="block text-[#637588] dark:text-gray-400 mb-1">Education</span><span className="font-medium dark:text-white">{artist.education || 'N/A'}</span></div>
              <div><span className="block text-[#637588] dark:text-gray-400 mb-1">Represented by</span><span className="font-medium dark:text-white">{artist.representation || 'Independent'}</span></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-12 mt-12 border-t border-[#f0f2f4] dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="text-[#111418] dark:text-white text-xl font-bold">Latest Works</h3>
            <button className="text-primary text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {latestWorks.map(work => (
              <div key={work.id} className="group cursor-pointer" onClick={() => onArtworkClick(work.id)}>
                <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("${work.imageUrl || (work as any).image_url}")` }}></div>
                </div>
                <h4 className="font-bold text-[#111418] dark:text-white group-hover:text-primary transition-colors">{work.title}</h4>
                <p className="text-sm text-[#637588] dark:text-gray-400">{work.medium}, {work.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistView;
