import React from 'react';
import { StretchHorizontal, Grid2x2, Volume2, VolumeX } from 'lucide-react';

export type ViewMode = 'carousel' | 'grid';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onHomeClick?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  isMuted = true,
  onToggleMute,
}) => {
  return (
    <header className="site-header">
      <div className="header-top-row">
        <div className="header-title-group">
          <h1 className="site-title">Mihir's Fav Movies</h1>
        </div>

        <nav className="header-nav">
          {/* Audio Toggle Button placed before carousel/grid toggle */}
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

          {/* Compact Icon-Only View Mode Toggle */}
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
