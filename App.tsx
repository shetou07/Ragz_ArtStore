
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ARTWORKS as MOCK_ARTWORKS, ARTISTS as MOCK_ARTISTS } from './constants';
import { ViewType, Artwork, Artist } from './types';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import Footer from './components/Footer';
import GalleryView from './views/GalleryView';
import DetailView from './views/DetailView';
import ArtistView from './views/ArtistView';
import ContactView from './views/ContactView';
import AdminLogin from './views/AdminLogin';
import AdminDashboard from './views/AdminDashboard';
import AdminUpload from './views/AdminUpload';
import LiveCurator from './components/LiveCurator';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('Gallery');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(null);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Reusable fetch function to keep public view in sync
  const refreshData = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const { data: artworksData, error: artworksError } = await supabase
        .from('artworks')
        .select('*')
        .order('dateAdded', { ascending: false });

      const { data: artistsData, error: artistsError } = await supabase
        .from('artists')
        .select('*');

      if (artworksError || artistsError) {
        console.warn('Database fetch failed, falling back to mock data');
        setArtworks(MOCK_ARTWORKS);
        setArtists(MOCK_ARTISTS);
      } else {
        setArtworks(artworksData || []);
        setArtists(artistsData || []);
      }
    } catch (err) {
      console.error('Error fetching from Supabase:', err);
      setArtworks(MOCK_ARTWORKS);
      setArtists(MOCK_ARTISTS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navigateTo = (view: ViewType, payload?: any) => {
    if (view === 'Detail') {
      setSelectedArtworkId(payload);
    } else if (view === 'Artist') {
      setSelectedArtistId(payload);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentArtwork = useMemo(() => 
    artworks.find(a => a.id === selectedArtworkId) || artworks[0]
  , [selectedArtworkId, artworks]);

  const currentArtist = useMemo(() => 
    artists.find(a => a.id === (selectedArtistId || currentArtwork?.artistId)) || artists[0]
  , [selectedArtistId, currentArtwork, artists]);

  const renderView = () => {
    if (isLoading && artworks.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
          <p className="mt-4 text-slate-500 font-medium">Connecting to ArtSpace Kigali...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'Gallery':
        return <GalleryView artworks={artworks} onArtworkClick={(id) => navigateTo('Detail', id)} />;
      case 'Detail':
        return <DetailView 
          artwork={currentArtwork} 
          artists={artists}
          artworks={artworks}
          onArtistClick={(id) => navigateTo('Artist', id)} 
          onRelatedClick={(id) => navigateTo('Detail', id)}
        />;
      case 'Artist':
        return <ArtistView 
          artist={currentArtist} 
          artworks={artworks}
          onArtworkClick={(id) => navigateTo('Detail', id)}
        />;
      case 'Contact':
        return <ContactView />;
      case 'AdminLogin':
        return <AdminLogin onLogin={() => { setIsLoggedIn(true); navigateTo('AdminDashboard'); }} onBack={() => navigateTo('Gallery')} />;
      case 'AdminDashboard':
        return isLoggedIn ? 
          <AdminDashboard 
            artworks={artworks}
            onUploadClick={() => navigateTo('AdminUpload')} 
            onLogout={() => { setIsLoggedIn(false); navigateTo('Gallery'); }}
          /> : 
          <AdminLogin onLogin={() => setIsLoggedIn(true)} onBack={() => navigateTo('Gallery')} />;
      case 'AdminUpload':
        return isLoggedIn ? 
          <AdminUpload 
            artists={artists}
            onCancel={() => navigateTo('AdminDashboard')} 
            onPublished={async () => {
              // Refresh data silently and navigate back
              await refreshData(true);
              navigateTo('AdminDashboard');
            }} 
          /> : 
          <AdminLogin onLogin={() => setIsLoggedIn(true)} onBack={() => navigateTo('Gallery')} />;
      default:
        return <GalleryView artworks={artworks} onArtworkClick={(id) => navigateTo('Detail', id)} />;
    }
  };

  const isViewWithUI = !['AdminLogin', 'AdminDashboard', 'AdminUpload'].includes(currentView);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-backgroundDark transition-colors">
      {isViewWithUI && (
        <Header 
          onNavigate={navigateTo} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
        />
      )}
      
      <main className="flex-grow relative">
        {renderView()}
      </main>

      {isViewWithUI && (
        <>
          <LiveCurator artworks={artworks} />
          <Footer onNavigate={navigateTo} />
        </>
      )}
    </div>
  );
};

export default App;
