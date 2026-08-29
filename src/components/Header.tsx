import React from 'react';
import { StretchHorizontal, Grid2x2 } from 'lucide-react';

export type ViewMode = 'carousel' | 'grid';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onHomeClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  return (
    <header className="site-header">
      <div className="header-top-row">
        <div className="header-title-group">
          <h1 className="site-title">Mihir's Fav Movies</h1>
        </div>

        <nav className="header-nav">
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
