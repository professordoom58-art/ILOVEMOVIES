import React from 'react';
import type { MediaItem } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  items: MediaItem[];
  selectedId?: string | number;
  onSelectItem: (item: MediaItem) => void;
  isLoading?: boolean;
  hasError?: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  items,
  selectedId,
  onSelectItem,
  isLoading,
  hasError
}) => {
  if (isLoading) {
    return (
      <div className="movie-grid" aria-label="Loading Collection">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
          <div key={idx} className="movie-card skeleton-card">
            <div className="poster-frame skeleton-box" />
            <div className="movie-meta-info">
              <div className="skeleton-line title-line" />
              <div className="skeleton-line year-line" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (hasError) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h3 className="empty-title">No movies found</h3>
        <p className="empty-text">Try adjusting your search query.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid" aria-label="Personal Media Collection">
      {items.map((item, idx) => {
        const uniqueKey = item.kind === 'collection' ? item.id : `${item.kind}_${item.tmdbId}`;
        const isSelected = item.kind === 'collection' ? selectedId === item.id : selectedId === item.tmdbId;

        return (
          <MovieCard
            key={uniqueKey}
            item={item}
            index={idx}
            isSelected={isSelected}
            onSelect={onSelectItem}
          />
        );
      })}
    </div>
  );
};
