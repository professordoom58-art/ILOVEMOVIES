import React, { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MediaItem } from '../types/movie';
import { CarouselCard } from './CarouselCard';

interface CarouselGridProps {
  items: MediaItem[];
  selectedId?: string | number;
  onSelectItem: (item: MediaItem) => void;
  isLoading?: boolean;
  hasError?: boolean;
}

export const CarouselGrid: React.FC<CarouselGridProps> = ({
  items,
  selectedId,
  onSelectItem,
  isLoading,
  hasError,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    loop: true,
    align: 'center',
    skipSnaps: true,
    startIndex: 0,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const hasInitializedRef = useRef(false);

  // Force reset Embla to slide #0 (#1 Avengers: Infinity War) on fresh page load/reload
  useEffect(() => {
    if (!emblaApi) return;

    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      emblaApi.scrollTo(0, true);
    }
  }, [emblaApi, items]);

  // Clean up any stale persisted carousel keys
  useEffect(() => {
    try {
      localStorage.removeItem('mfm_carousel_index');
      sessionStorage.removeItem('mfm_carousel_index');
      localStorage.removeItem('embla_carousel_index');
      sessionStorage.removeItem('embla_carousel_index');
    } catch (e) {
      // Ignore storage errors
    }
  }, []);



  if (isLoading) {
    return (
      <div className="embla" aria-label="Loading collection">
        <div className="embla__container">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="embla__slide" key={i}>
              <div className="cc skeleton-card">
                <div className="cc__poster skeleton-box" />
                <div className="cc__meta">
                  <div className="skeleton-line title-line" />
                  <div className="skeleton-line year-line" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (hasError || items.length === 0) return null;

  return (
    <div className="embla-outer">
      {/* Embla root — viewport */}
      <div className="embla" ref={emblaRef}>
        {/* Embla container — single flex row, never wraps */}
        <div className="embla__container">
          {items.map((item, idx) => {
            const key =
              item.kind === 'collection' ? item.id : `${item.kind}_${item.tmdbId}`;
            const isSelected =
              item.kind === 'collection'
                ? selectedId === item.id
                : selectedId === item.tmdbId;

            return (
              <div className="embla__slide" key={key}>
                <CarouselCard
                  item={item}
                  index={idx}
                  isSelected={isSelected}
                  onSelect={onSelectItem}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Centered Bottom Navigation Controls */}
      <div className="carousel-bottom-controls">
        <button
          className="carousel-arrow-btn"
          onClick={scrollPrev}
          aria-label="Scroll Left"
          type="button"
        >
          <ChevronLeft size={20} strokeWidth={2.2} />
        </button>
        <button
          className="carousel-arrow-btn"
          onClick={scrollNext}
          aria-label="Scroll Right"
          type="button"
        >
          <ChevronRight size={20} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
};
