import React, { useCallback, useEffect } from 'react';
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
    dragFree: true,
    loop: true,
    align: 'start',
    containScroll: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Mobile Carousel Mode Only: Debounced Vertical Visibility Snap
  useEffect(() => {
    let scrollTimeout: number | undefined;
    let isTouching = false;

    const handleTouchStart = () => {
      isTouching = true;
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };

    const handleTouchEnd = () => {
      isTouching = false;
      scheduleSnap();
    };

    const scheduleSnap = () => {
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        performVerticalSnap();
      }, 200);
    };

    const handleScroll = () => {
      if (isTouching) return;
      scheduleSnap();
    };

    const performVerticalSnap = () => {
      if (window.innerWidth > 768) return; // Mobile Carousel only!
      if (isTouching) return;

      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.getBoundingClientRect().height : 70;
      const topBound = headerHeight;
      const bottomBound = window.innerHeight;
      const usableCenter = topBound + (bottomBound - topBound) / 2;

      const cardElements = Array.from(
        document.querySelectorAll('.embla__slide .cc')
      ) as HTMLElement[];

      if (cardElements.length === 0) return;

      let maxVisibleArea = 0;
      let targetCardCenter = 0;
      let targetCard: HTMLElement | null = null;

      for (const card of cardElements) {
        const rect = card.getBoundingClientRect();
        const vTop = Math.max(rect.top, topBound);
        const vBottom = Math.min(rect.bottom, bottomBound);
        const visibleHeight = Math.max(0, vBottom - vTop);

        if (visibleHeight > maxVisibleArea) {
          maxVisibleArea = visibleHeight;
          targetCard = card;
          targetCardCenter = rect.top + rect.height / 2;
        }
      }

      if (!targetCard || maxVisibleArea === 0) return;

      const offsetDiff = targetCardCenter - usableCenter;
      if (Math.abs(offsetDiff) < 6) return; // Ignore tiny subpixel offsets

      const targetScrollY = Math.max(0, window.scrollY + offsetDiff);
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
    };
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
