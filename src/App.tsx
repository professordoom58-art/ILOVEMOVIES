import { useState, useEffect, useRef } from 'react';
import { FAVORITE_MEDIA } from './data/favoriteMovies';
import { fetchCollection } from './services/tmdb';
import type { MediaItem } from './types/movie';
import { Header, type ViewMode } from './components/Header';
import { CarouselGrid } from './components/CarouselGrid';
import { MovieGrid } from './components/MovieGrid';
import { MovieDetailDrawer } from './components/MovieDetailDrawer';

const VIEW_MODE_STORAGE_KEY = 'mfm_view_mode';
const CATALOG_SNAPSHOT_KEY = 'mfm_catalog_snapshot_v4';

function getInitialCatalog(): MediaItem[] {
  try {
    const raw = localStorage.getItem(CATALOG_SNAPSHOT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Ignore storage parse error
  }
  return [];
}

export function App() {
  const [items, setItems] = useState<MediaItem[]>(getInitialCatalog);
  const [isLoading, setIsLoading] = useState<boolean>(() => getInitialCatalog().length === 0);
  const [error, setError] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const displayedItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    return item.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
  });

  // Background audio state (defaults to muted)
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/jazz.mp3');
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.play().catch((e) => console.warn('Audio playback error:', e));
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  // View mode state — defaults to 'carousel', persisted in localStorage
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try {
      const saved = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
      if (saved === 'grid' || saved === 'carousel') {
        return saved;
      }
    } catch (e) {
      console.warn('Unable to read view mode from localStorage:', e);
    }
    return 'carousel';
  });

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
    } catch (e) {
      console.warn('Unable to save view mode to localStorage:', e);
    }
  };

  // Sync with URL hash for deep linking (e.g. /#movie=18785, /#media=col-fast-furious-1-7)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const movieMatch = hash.match(/#movie=(\d+)/);
      const mediaMatch = hash.match(/#media=([^&]+)/);

      if (mediaMatch) {
        const val = mediaMatch[1];
        if (!isNaN(Number(val))) {
          setSelectedItemId(Number(val));
        } else {
          setSelectedItemId(val);
        }
      } else if (movieMatch) {
        setSelectedItemId(parseInt(movieMatch[1], 10));
      } else {
        setSelectedItemId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadMediaData() {
      try {
        const fetchedItems = await fetchCollection(FAVORITE_MEDIA);
        if (isMounted) {
          setItems(fetchedItems);
          setError(null);
          try {
            localStorage.setItem(CATALOG_SNAPSHOT_KEY, JSON.stringify(fetchedItems));
          } catch {
            // Ignore quota errors
          }
        }
      } catch (err: any) {
        if (isMounted && items.length === 0) {
          setError('Unable to load collection. Please check your network connection.');
          console.error('Error fetching collection:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMediaData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectItem = (item: MediaItem) => {
    const id = item.kind === 'collection' ? item.id : item.tmdbId;
    setSelectedItemId(id);
    window.location.hash = `media=${id}`;
  };

  const handleCloseDrawer = () => {
    setSelectedItemId(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  const selectedItem =
    items.find((item) => (item.kind === 'collection' ? item.id === selectedItemId : item.tmdbId === selectedItemId)) || null;

  const selectedIndex = items.findIndex((item) =>
    item.kind === 'collection' ? item.id === selectedItemId : item.tmdbId === selectedItemId
  );

  const handlePrevItem = () => {
    if (selectedIndex === -1 || items.length === 0) return;
    const prevIndex = (selectedIndex - 1 + items.length) % items.length;
    handleSelectItem(items[prevIndex]);
  };

  const handleNextItem = () => {
    if (selectedIndex === -1 || items.length === 0) return;
    const nextIndex = (selectedIndex + 1) % items.length;
    handleSelectItem(items[nextIndex]);
  };

  return (
    <div className={`app-workspace ${selectedItem ? 'drawer-active' : 'drawer-closed'} view-mode-${viewMode}`}>
      {/* Persistent Left Collection Shelf */}
      <div className="collection-main-container">
        <div className="collection-shelf-content">
          <Header
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onHomeClick={handleCloseDrawer}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {error && (
            <div className="error-banner" role="alert">
              <p>{error}</p>
            </div>
          )}

          <main className="shelf-grid-wrapper">
            {viewMode === 'carousel' ? (
              <CarouselGrid
                items={displayedItems}
                selectedId={selectedItemId || undefined}
                onSelectItem={handleSelectItem}
                isLoading={isLoading}
                hasError={Boolean(error) && items.length === 0}
              />
            ) : (
              <MovieGrid
                items={displayedItems}
                selectedId={selectedItemId || undefined}
                onSelectItem={handleSelectItem}
                isLoading={isLoading}
                hasError={Boolean(error) && items.length === 0}
              />
            )}
          </main>

          {viewMode === 'grid' && (
            <footer className="site-footer">
              <p className="footer-subtitle">A personal collection of films worth remembering.</p>
            </footer>
          )}
        </div>
      </div>

      {/* Right-Side Detail Drawer */}
      <MovieDetailDrawer
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={handleCloseDrawer}
        onPrevItem={handlePrevItem}
        onNextItem={handleNextItem}
      />
    </div>
  );
}

export default App;
