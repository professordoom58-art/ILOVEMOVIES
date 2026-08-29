import React, { useEffect, useRef, useState } from 'react';
import type { MediaItem } from '../types/movie';

interface MovieCardProps {
  item: MediaItem;
  isSelected?: boolean;
  onSelect: (item: MediaItem) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ item, isSelected, onSelect }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSelected && cardRef.current) {
      const timer = setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isSelected]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(item);
    }
  };

  const showImage = Boolean(item.poster) && !hasImageError;

  let subtitle = '';
  let badgeLabel: string | null = null;

  if (item.kind === 'collection') {
    badgeLabel = item.tag;
    const countText = `${item.movieCount} ${item.movieCount === 1 ? 'Film' : 'Films'}`;
    subtitle = item.yearsCovered ? `${countText} · ${item.yearsCovered}` : countText;
  } else if (item.kind === 'tv') {
    badgeLabel = 'TV SERIES';
    subtitle = item.year ? `${item.year}` : 'TV Series';
  } else {
    subtitle = item.year ? `${item.year}` : '—';
  }

  const rawScore = item.scores?.mihirScore ?? null;
  const scoreDisplay =
    rawScore != null ? String(rawScore).replace(/\s*\/\s*10$/, '') : null;

  return (
    <button
      ref={cardRef}
      className={`movie-card ${isSelected ? 'is-selected' : ''} card-${item.kind}`}
      onClick={() => onSelect(item)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      type="button"
      aria-label={`${item.title} (${subtitle})`}
    >
      <div className="poster-container">
        {showImage ? (
          <img
            src={item.poster}
            alt={`${item.title} poster`}
            className="poster-image"
            loading="lazy"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onError={() => {
              console.warn(`Poster failed to load for "${item.title}":`, item.poster);
              setHasImageError(true);
            }}
          />
        ) : (
          <div className="poster-unavailable-box">
            <span className="poster-unavailable-text">Poster unavailable</span>
          </div>
        )}

        {badgeLabel && (
          <div className="card-badge-pill" aria-hidden="true">
            <span>{badgeLabel}</span>
          </div>
        )}

        {scoreDisplay && (
          <div className="cc__score" aria-label={`Mihir's score: ${scoreDisplay}`}>
            <span className="cc__score-num">{scoreDisplay}</span>
          </div>
        )}
      </div>

      <div className="movie-meta-info">
        <h3 className="movie-card-title">{item.title}</h3>
        <span className="movie-card-year">{subtitle}</span>
      </div>
    </button>
  );
};
