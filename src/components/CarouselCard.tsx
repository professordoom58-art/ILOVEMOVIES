import React, { useState } from 'react';
import type { MediaItem } from '../types/movie';

interface CarouselCardProps {
  item: MediaItem;
  index?: number;
  isSelected: boolean;
  onSelect: (item: MediaItem) => void;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  index,
  isSelected,
  onSelect,
}) => {
  const [hasImageError, setHasImageError] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(item);
    }
  };

  const showImage = Boolean(item.poster) && !hasImageError;

  let badgeLabel: string | null = null;
  let yearLine = '';

  if (item.kind === 'collection') {
    badgeLabel = item.tag;
    const n = item.movieCount;
    yearLine = item.yearsCovered
      ? `${n} ${n === 1 ? 'Film' : 'Films'} · ${item.yearsCovered}`
      : `${n} ${n === 1 ? 'Film' : 'Films'}`;
  } else if (item.kind === 'tv') {
    badgeLabel = 'TV';
    yearLine = item.year ? String(item.year) : 'TV Series';
  } else {
    yearLine = item.year ? String(item.year) : '—';
  }

  const rawScore = item.scores?.mihirScore ?? null;
  const scoreDisplay =
    rawScore != null ? String(rawScore).replace(/\s*\/\s*10$/, '') : null;

  return (
    <button
      className={`cc${isSelected ? ' cc--selected' : ''} card-${item.kind}`}
      onClick={() => onSelect(item)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      type="button"
      aria-label={`${item.title}${yearLine ? ` (${yearLine})` : ''}`}
      aria-pressed={isSelected}
    >
      {/* Poster Frame (completely clean poster, no overlay number) */}
      <div className="cc__poster">
        {showImage ? (
          <img
            src={item.poster}
            alt={`${item.title} poster`}
            className="cc__img"
            loading="lazy"
            draggable={false}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="cc__no-img">
            <span>{item.title}</span>
          </div>
        )}

        {/* Type Badge */}
        {badgeLabel && (
          <div className="cc__badge" aria-hidden="true">
            {badgeLabel}
          </div>
        )}
      </div>

      {/* Metadata BELOW Poster */}
      <div className="cc__meta">
        {/* Number / Index below poster */}
        {index != null && (
          <span className="cc__number-line">#{index + 1}</span>
        )}

        {/* Title */}
        <h3 className="cc__title">{item.title}</h3>

        {/* Year + Mihir Score line */}
        <div className="cc__info-row">
          {yearLine && <span className="cc__year">{yearLine}</span>}
          {scoreDisplay && (
            <span className="cc__score-val" aria-label={`Score: ${scoreDisplay}`}>
              {scoreDisplay}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
