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

  // Mobile Carousel Mode Only: Deterministic Vertical Snap to Usable Viewport Center
  useEffect(() => {
    let scrollTimeout: number | undefined;
    let isTouching = false;
    let isProgrammaticSnapping = false;

    const handleTouchStart = () => {
      isTouching = true;
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };

    const handleTouchEnd = () => {
      isTouching = false;
      scheduleSnap();
    };

    const scheduleSnap = () => {
      if (isProgrammaticSnapping || isTouching) return;
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        performVerticalSnap();
      }, 150);
    };

    const handleScroll = () => {
      if (isTouching || isProgrammaticSnapping) return;
      scheduleSnap();
    };

    const performVerticalSnap = () => {
      if (window.innerWidth > 768) return; // Mobile Carousel mode only!
      if (isTouching || isProgrammaticSnapping) return;

      const header = document.querySelector('.site-header');
      if (!header) return;

      const headerHeight = header.getBoundingClientRect().height;
      const viewportCenter = headerHeight + (window.innerHeight - headerHeight) / 2;

      // Query all rendered carousel cards in the DOM
      const cards = Array.from(
        document.querySelectorAll('.embla__slide .cc')
      ) as HTMLElement[];

      if (cards.length === 0) return;

      const target = cards.reduce<{ card: HTMLElement; center: number } | null>(
        (closest, card) => {
          const rect = card.getBoundingClientRect();
          const center = rect.top + rect.height / 2;

          if (!closest) return { card, center };

          return Math.abs(center - viewportCenter) < Math.abs(closest.center - viewportCenter)
            ? { card, center }
            : closest;
        },
        null
      );

      if (!target) return;

      const delta = target.center - viewportCenter;

      if (Math.abs(delta) < 5) return; // Already centered within 5px

      isProgrammaticSnapping = true;

      window.scrollBy({
        top: delta,
        behavior: 'smooth',
      });

      window.setTimeout(() => {
        isProgrammaticSnapping = false;
      }, 400);
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
