import React, { useState } from 'react';
import type { Movie } from '../types/movie';
import { Scoreboard } from './Scoreboard';
import { CastLineup } from './CastLineup';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getCustomGenre } from '../data/customGenres';

interface MovieDetailPaneProps {
  movie: Movie | null;
  onBackToCollection?: () => void;
}

export const MovieDetailPane: React.FC<MovieDetailPaneProps> = ({
  movie,
  onBackToCollection
}) => {
  const [imgError, setImgError] = useState(false);

  if (!movie) {
    return (
      <div className="empty-detail-pane">
        <p>Select a film from your collection to view details.</p>
      </div>
    );
  }

  const customGenre = getCustomGenre(movie);

  return (
    <div className="movie-detail-pane" key={movie.tmdbId}>
      {/* Top Bar with Back Button */}
      <div className="detail-top-nav">
        {onBackToCollection && (
          <button
            type="button"
            className="back-btn"
            onClick={onBackToCollection}
            aria-label="Back to collection"
          >
            <ArrowLeft size={14} />
            <span>Back to collection</span>
          </button>
        )}
      </div>

      {/* Main Movie Header: Poster + Title + Scoreboard + Overview */}
      <div className="detail-hero-layout">
        {/* Large Poster */}
        <div className="detail-poster-frame">
          {movie.poster && !imgError ? (
            <img
              src={movie.poster}
              alt={`${movie.title} Poster`}
              className="detail-poster-image"
              loading="eager"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="detail-poster-fallback">
              <span className="fallback-title">{movie.title}</span>
              <span className="fallback-year">{movie.year}</span>
            </div>
          )}
        </div>

        {/* Title & Metadata & Scoreboard */}
        <div className="detail-primary-info">
          <div className="detail-title-row">
            <h1 className="detail-movie-title">{movie.title}</h1>
            {customGenre && (
              <span className="card-genre-badge">{customGenre}</span>
            )}
          </div>

          <div className="detail-metadata-line">
            <span>{movie.year}</span>
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
            {movie.certification && movie.certification.toLowerCase() !== 'feature' && (
              <span className="certification-badge">{movie.certification}</span>
            )}
            {movie.director && (
              <>
                <span className="meta-bullet">&bull;</span>
                <span className="director-tag">Dir. {movie.director}</span>
              </>
            )}
          </div>

          {/* 3-Column Scoreboard */}
          <Scoreboard scores={movie.scores} />

          {/* Overview from TMDB */}
          {movie.overview && (
            <p className="detail-overview-text">{movie.overview}</p>
          )}
        </div>
      </div>

      {/* Cast Section */}
      <CastLineup cast={movie.cast} />

      {/* Where to Watch Section */}
      <section className="watch-section" aria-label="Where to Watch">
        <div className="section-divider-row">
          <h3 className="editorial-section-title">WHERE TO WATCH</h3>
        </div>

        <div className="watch-links-table">
          {movie.watchLinks && movie.watchLinks.length > 0 ? (
            movie.watchLinks.map((link, idx) => (
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
  );
};
