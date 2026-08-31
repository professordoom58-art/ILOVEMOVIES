import React, { useEffect, useState } from 'react';
import type { MediaItem, Movie } from '../types/movie';
import { Scoreboard } from './Scoreboard';
import { CastLineup } from './CastLineup';
import { ArrowLeft, ArrowUpRight, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCustomGenre } from '../data/customGenres';

interface MovieDetailDrawerProps {
  item: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevItem?: () => void;
  onNextItem?: () => void;
}

export const MovieDetailDrawer: React.FC<MovieDetailDrawerProps> = ({
  item,
  isOpen,
  onClose,
  onPrevItem,
  onNextItem,
}) => {
  const [activeMovieInCollection, setActiveMovieInCollection] = useState<Movie | null>(null);
  const [hasPosterError, setHasPosterError] = useState(false);

  useEffect(() => {
    setActiveMovieInCollection(null);
    setHasPosterError(false);
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (activeMovieInCollection) {
          setActiveMovieInCollection(null);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, activeMovieInCollection]);

  if (!item) return null;

  // Determine what to display: if inside a collection and an individual movie is selected, show that movie
  const isViewingMovieInCollection = Boolean(activeMovieInCollection);
  const currentMedia: MediaItem = activeMovieInCollection || item;
  const customGenre = getCustomGenre(currentMedia);

  const posterToRender = currentMedia.largePoster || currentMedia.poster;
  const showPoster = Boolean(posterToRender) && !hasPosterError;

  return (
    <aside
      className={`detail-drawer-container ${isOpen ? 'is-open' : ''}`}
      role="dialog"
      aria-modal={isOpen}
      aria-label={`${currentMedia.title} Details`}
    >
      <div className="drawer-header-bar">
        {isViewingMovieInCollection ? (
          <button
            type="button"
            className="drawer-back-collection-btn"
            onClick={() => setActiveMovieInCollection(null)}
            aria-label={`Back to ${item.title}`}
          >
            <ArrowLeft size={16} />
            <span>Back to {item.title}</span>
          </button>
        ) : <div />}

        <div className="drawer-header-controls">
          {onPrevItem && (
            <button
              type="button"
              className="drawer-nav-btn"
              onClick={onPrevItem}
              aria-label="Previous movie"
              title="Previous movie"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {onNextItem && (
            <button
              type="button"
              className="drawer-nav-btn"
              onClick={onNextItem}
              aria-label="Next movie"
              title="Next movie"
            >
              <ChevronRight size={20} />
            </button>
          )}
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close details"
            title="Close details (Esc)"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="drawer-scroll-content">
        {/* ===================================================================
            1. COLLECTION / SAGA VIEW (When not drilled into a specific movie)
           =================================================================== */}
        {currentMedia.kind === 'collection' ? (
          <div className="collection-drawer-layout">
            <div className="movie-detail-top">
              {/* Left Column: Collection Poster */}
              <div className="drawer-poster-frame">
                {showPoster ? (
                  <img
                    src={posterToRender}
                    alt={`${currentMedia.title} Poster`}
                    className="drawer-poster-image"
                    loading="eager"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    onError={() => setHasPosterError(true)}
                  />
                ) : (
                  <div className="poster-unavailable-box large-box">
                    <span className="poster-unavailable-text">Poster unavailable</span>
                  </div>
                )}
              </div>

              {/* Right Column: Collection Meta */}
              <div className="drawer-right-column">
                <div className="drawer-kind-pill">
                  <span>{currentMedia.tag}</span>
                </div>
                <div className="drawer-title-row">
                  <h2 className="drawer-movie-title">{currentMedia.title}</h2>
                  {customGenre && (
                    <span className="card-genre-badge">{customGenre}</span>
                  )}
                </div>

                <div className="drawer-metadata-line">
                  <span>
                    {currentMedia.movieCount} {currentMedia.movieCount === 1 ? 'Film' : 'Films'}
                    {currentMedia.yearsCovered ? ` · ${currentMedia.yearsCovered}` : ''}
                  </span>
                </div>

                {/* Where to Watch */}
                {currentMedia.watchLinks && currentMedia.watchLinks.length > 0 && (
                  <section className="drawer-watch-section" aria-label="Where to Watch">
                    <div className="section-divider-row">
                      <h3 className="drawer-section-heading">WHERE TO WATCH</h3>
                    </div>
                    <div className="watch-links-table">
                      {currentMedia.watchLinks.map((link, idx) => (
                        <a
                          key={link.id || idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="watch-row"
                        >
                          <span className="watch-service-name">{link.name}</span>
                          <span className="watch-action-cta">
                            <span>Watch</span>
                            <ArrowUpRight size={14} />
                          </span>
                        </a>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* Collection Overview */}
            {currentMedia.overview && (
              <section className="drawer-overview-section" aria-label="Collection Overview">
                <div className="section-divider-row">
                  <h3 className="drawer-section-heading">OVERVIEW</h3>
                </div>
                <p className="drawer-overview-text">{currentMedia.overview}</p>
              </section>
            )}

            {/* Individual Films in Saga */}
            <section className="collection-movies-section" aria-label="Films in this collection">
              <div className="section-divider-row">
                <h3 className="drawer-section-heading">
                  FILMS IN THIS {currentMedia.tag} ({currentMedia.movies?.length || 0})
                </h3>
              </div>

              <div className="collection-movies-grid">
                {currentMedia.movies?.map((m) => (
                  <button
                    key={m.tmdbId}
                    type="button"
                    className="collection-film-card"
                    onClick={() => setActiveMovieInCollection(m)}
                  >
                    <div className="collection-film-poster-frame">
                      {m.poster ? (
                        <img
                          src={m.poster}
                          alt={m.title}
                          className="collection-film-poster"
                          loading="lazy"
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="poster-unavailable-box">
                          <span className="poster-unavailable-text">Poster unavailable</span>
                        </div>
                      )}
                      {(m.isFavorite || m.tmdbId === 9615) && (
                        <div className="love-badge-overlay" title="Loved Film">
                          <Heart size={14} fill="#E53E3E" color="#E53E3E" />
                        </div>
                      )}
                    </div>
                    <div className="collection-film-info">
                      <h4 className="collection-film-title">{m.title}</h4>
                      <span className="collection-film-year">{m.year || '—'}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* ===================================================================
              2. MOVIE & TV SERIES VIEW
             =================================================================== */
          <div className="single-media-layout">
            <div className="movie-detail-top">
              {/* Left Column: Poster */}
              <div className="drawer-poster-frame">
                {showPoster ? (
                  <img
                    src={posterToRender}
                    alt={`${currentMedia.title} Poster`}
                    className="drawer-poster-image"
                    loading="eager"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    onError={() => setHasPosterError(true)}
                  />
                ) : (
                  <div className="poster-unavailable-box large-box">
                    <span className="poster-unavailable-text">Poster unavailable</span>
                  </div>
                )}
              </div>

              {/* Right Column: Title / Metadata + Scoreboard + Where to Watch */}
              <div className="drawer-right-column">
                {currentMedia.kind === 'tv' && (
                  <div className="drawer-kind-pill">
                    <span>TV SERIES</span>
                  </div>
                )}

                <div className="drawer-title-row">
                  <h2 className="drawer-movie-title">{currentMedia.title}</h2>
                  {customGenre && (
                    <span className="card-genre-badge">{customGenre}</span>
                  )}
                </div>

                {currentMedia.kind === 'movie' ? (
                  <>
                    <div className="drawer-metadata-line">
                      <span>
                        {currentMedia.formattedReleaseDate || currentMedia.year}
                        {currentMedia.runtime ? ` · ${currentMedia.runtime}` : ''}
                      </span>
                      {currentMedia.certification && currentMedia.certification.toLowerCase() !== 'feature' && (
                        <span className="certification-tag">{currentMedia.certification}</span>
                      )}
                    </div>

                    {currentMedia.director && (
                      <div className="drawer-director-line">
                        Directed by <strong>{currentMedia.director}</strong>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="drawer-metadata-line">
                      <span>
                        {currentMedia.formattedFirstAirDate || currentMedia.year}
                        {currentMedia.seasonsCount
                          ? ` · ${currentMedia.seasonsCount} ${currentMedia.seasonsCount === 1 ? 'Season' : 'Seasons'}`
                          : ''}
                        {currentMedia.episodesCount ? ` · ${currentMedia.episodesCount} Episodes` : ''}
                      </span>
                    </div>

                    {currentMedia.creator && (
                      <div className="drawer-director-line">
                        Created by <strong>{currentMedia.creator}</strong>
                      </div>
                    )}
                  </>
                )}

                {/* 3-Column Scoreboard */}
                <Scoreboard scores={currentMedia.scores} />

                {/* WHERE TO WATCH directly below Scoreboard */}
                <section className="drawer-watch-section" aria-label="Where to Watch">
                  <div className="section-divider-row">
                    <h3 className="drawer-section-heading">WHERE TO WATCH</h3>
                  </div>

                  <div className="watch-links-table">
                    {currentMedia.watchLinks && currentMedia.watchLinks.length > 0 ? (
                      currentMedia.watchLinks.map((link, idx) => (
                        <a
                          key={link.id || idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="watch-row"
                        >
                          <span className="watch-service-name">{link.name}</span>
                          <span className="watch-action-cta">
                            <span>Watch</span>
                            <ArrowUpRight size={14} />
                          </span>
                        </a>
                      ))
                    ) : (
                      <p className="no-watch-links">No watch links configured.</p>
                    )}
                  </div>
                </section>
              </div>
            </div>

            {/* FULL WIDTH SECTION: OVERVIEW */}
            {currentMedia.overview && (
              <section className="drawer-overview-section" aria-label="Overview">
                <div className="section-divider-row">
                  <h3 className="drawer-section-heading">OVERVIEW</h3>
                </div>
                <p className="drawer-overview-text">{currentMedia.overview}</p>
              </section>
            )}

            {/* FULL WIDTH SECTION: CAST */}
            <CastLineup cast={currentMedia.cast} />
          </div>
        )}
      </div>
    </aside>
  );
};
