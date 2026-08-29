import React, { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import { Scoreboard } from './Scoreboard';
import { CastLineup } from './CastLineup';
import { ReviewSection } from './ReviewSection';
import { ArrowUpRight, X } from 'lucide-react';

interface MovieDetailsModalProps {
  movie: Movie | null;
  onClose: () => void;
  onScoreUpdated?: (tmdbId: number, newScore: string | null) => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose, onScoreUpdated }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (movie) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close detail view"
        >
          <span>CLOSE</span>
          <X size={14} />
        </button>

        <div className="modal-editorial-layout">
          <div className="modal-poster-frame">
            {movie.poster && !imgError ? (
              <img
                src={movie.poster}
                alt={`${movie.title} Cover`}
                className="modal-poster-img"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="poster-fallback">
                <div className="poster-fallback-title">{movie.title}</div>
                <div className="poster-fallback-year">{movie.year || ''}</div>
              </div>
            )}
          </div>

          <div className="modal-info-col">
            <h2 id="modal-title" className="modal-movie-title">
              {movie.title}
            </h2>
            
            <div className="detail-metadata-line">
              <span>{movie.year || '—'}</span>
              {movie.formattedReleaseDate && (
                <>
                  <span className="meta-bullet">&bull;</span>
                  <span>{movie.formattedReleaseDate}</span>
                </>
              )}
              {movie.runtime && (
                <>
                  <span className="meta-bullet">&bull;</span>
                  <span>{movie.runtime}</span>
                </>
              )}
              {movie.certification && (
                <span className="certification-badge">{movie.certification}</span>
              )}
            </div>

            <Scoreboard scores={movie.scores} />

            {movie.overview && (
              <p className="detail-overview-text" style={{ marginBottom: '1.5rem' }}>
                {movie.overview}
              </p>
            )}

            <CastLineup cast={movie.cast} />

            <ReviewSection
              tmdbId={movie.tmdbId}
              onReviewSaved={(score) => onScoreUpdated && onScoreUpdated(movie.tmdbId, score)}
            />

            <section className="watch-section" style={{ marginTop: '1.5rem' }}>
              <div className="section-divider-row">
                <h3 className="editorial-section-title">WHERE TO WATCH</h3>
              </div>
              <div className="watch-links-table">
                {movie.watchLinks.map((link, idx) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};
