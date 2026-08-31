import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    loop: true,
    align: 'start',
    dragFree: true,
    skipSnaps: true,
    containScroll: false,
    startIndex: 0,
    breakpoints: {
      '(max-width: 768px)': {
        align: 'center',
        containScroll: false,
        dragFree: false,
        skipSnaps: false,
      },
    },
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

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

  // Enable mouse wheel / trackpad infinite scrolling for Carousel
  useEffect(() => {
    if (!emblaApi) return;

    const rootNode = emblaApi.rootNode();
    if (!rootNode) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let accumulatedDelta = 0;

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 5) return;

      e.preventDefault();

      accumulatedDelta += delta;

      if (timeoutId) clearTimeout(timeoutId);

      if (Math.abs(accumulatedDelta) >= 20) {
        if (accumulatedDelta > 0) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollPrev();
        }
        accumulatedDelta = 0;
      }

      timeoutId = setTimeout(() => {
        accumulatedDelta = 0;
      }, 100);
    };

    rootNode.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      rootNode.removeEventListener('wheel', handleWheel);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [emblaApi]);



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

  if (hasError) return null;

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h3 className="empty-title">No movies found</h3>
        <p className="empty-text">Try adjusting your search query.</p>
      </div>
    );
  }

  const barCount = Math.min(items.length, 6);
  const activeBarIndex =
    items.length <= 6
      ? selectedIndex % Math.max(1, items.length)
      : Math.min(
          barCount - 1,
          Math.floor((selectedIndex / items.length) * barCount)
        );

  const handleBarClick = (idx: number) => {
    if (!emblaApi) return;
    if (items.length <= 6) {
      emblaApi.scrollTo(idx);
    } else {
      const targetIndex = Math.min(
        items.length - 1,
        Math.round((idx / (barCount - 1)) * (items.length - 1))
      );
      emblaApi.scrollTo(targetIndex);
    }
  };

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

      {/* Visual Carousel Progress / Pagination Bar Indicator */}
      {items.length > 1 && (
        <div
          className="carousel-progress-wrapper"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {Array.from({ length: barCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === activeBarIndex}
              aria-label={`Go to slide section ${idx + 1}`}
              className={`carousel-progress-bar ${
                idx === activeBarIndex ? 'active' : ''
              }`}
              onClick={() => handleBarClick(idx)}
            />
          ))}
        </div>
      )}

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
