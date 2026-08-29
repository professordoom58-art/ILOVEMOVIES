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
      const headerHeight = header ? header.getBoundingClientRect().height : 70;
      const usableTop = headerHeight;
      const usableBottom = window.innerHeight;
      const usableCenter = usableTop + (usableBottom - usableTop) / 2;

      // Query all rendered carousel cards in the DOM
      const cards = Array.from(
        document.querySelectorAll('.embla__slide .cc')
      ) as HTMLElement[];

      if (cards.length === 0) return;

      let maxVisibleArea = 0;
      let targetCard: HTMLElement | null = null;

      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const vTop = Math.max(rect.top, usableTop);
        const vBottom = Math.min(rect.bottom, usableBottom);
        const visibleHeight = Math.max(0, vBottom - vTop);
        const visibleArea = visibleHeight * rect.width;

        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea;
          targetCard = card;
        }
      }

      if (!targetCard || maxVisibleArea === 0) return;

      const targetRect = targetCard.getBoundingClientRect();
      const cardCenter = targetRect.top + targetRect.height / 2;
      const delta = cardCenter - usableCenter;

      if (Math.abs(delta) < 4) return; // Already centered within 4px

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
