import React, { useState, useRef, useEffect } from 'react';
import { Search, X, StretchHorizontal, Grid2x2, Volume2, VolumeX } from 'lucide-react';

export type ViewMode = 'carousel' | 'grid';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onHomeClick?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  isMuted = true,
  onToggleMute,
  searchQuery,
  onSearchChange,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleToggleSearch = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (!next && searchQuery) {
        onSearchChange('');
      }
      return next;
    });
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        if (searchQuery) onSearchChange('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, searchQuery, onSearchChange]);

  return (
    <header className="site-header">
      <div className="header-top-row">
        <div className="header-title-group">
          <h1 className="site-title">Mihir's Fav Movies</h1>
        </div>

        <nav className="header-nav">
          {/* 1. SEARCH: Single icon button */}
          <div className="search-control-wrapper">
            <div className="search-toggle-wrapper">
              <button
                type="button"
                className={`search-toggle-btn ${isSearchOpen || searchQuery ? 'active' : ''}`}
                onClick={handleToggleSearch}
                aria-label={isSearchOpen ? 'Close search' : 'Search catalog'}
                title={isSearchOpen ? 'Close search' : 'Search catalog'}
              >
                <Search size={15} strokeWidth={2} />
              </button>
            </div>

            {/* Compact Search Popover Overlay */}
            {isSearchOpen && (
              <div className="header-search-popover" role="search">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="header-search-input"
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label="Search catalog by title"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    className="header-search-clear"
                    onClick={() => {
                      onSearchChange('');
                      searchInputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="header-search-clear"
                    onClick={() => setIsSearchOpen(false)}
                    aria-label="Close search"
                    title="Close search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 2. MUSIC TOGGLE */}
          {onToggleMute && (
            <div className="audio-toggle-wrapper">
              <button
                type="button"
                className={`audio-toggle-btn ${!isMuted ? 'active' : ''}`}
                onClick={onToggleMute}
                aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
                title={isMuted ? 'Unmute background music' : 'Mute background music'}
              >
                {isMuted ? <VolumeX size={15} strokeWidth={2} /> : <Volume2 size={15} strokeWidth={2} />}
              </button>
            </div>
          )}

          {/* 3. CAROUSEL / GRID TOGGLE */}
          <div className="view-mode-toggle" role="radiogroup" aria-label="View Mode">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'carousel' ? 'active' : ''}`}
              onClick={() => onViewModeChange('carousel')}
              aria-checked={viewMode === 'carousel'}
              aria-label="Carousel View"
              title="Carousel View"
              role="radio"
            >
              <StretchHorizontal size={15} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              aria-checked={viewMode === 'grid'}
              aria-label="Grid View"
              title="Grid View"
              role="radio"
            >
              <Grid2x2 size={15} strokeWidth={2} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
