import React from 'react';
import type { MovieScores } from '../types/movie';
import { Star } from 'lucide-react';

interface ScoreboardProps {
  scores: MovieScores;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ scores }) => {
  return (
    <div className="scoreboard-container" aria-label="Movie Scores">
      {/* Column 1: Mihir Score */}
      <div className="score-col">
        <span className="score-label">MIHIR'S SCORE</span>
        <div className="score-value-row">
          <span className={`score-value ${scores.mihirScore ? 'highlight-score' : ''}`}>
            {scores.mihirScore
              ? String(scores.mihirScore).replace(/\s*\/\s*10$/, '')
              : '—'}
          </span>
        </div>
        <span className="score-subtext">
          {scores.mihirScore ? '' : 'Not rated'}
        </span>
      </div>

      {/* Column 2: IMDb Score */}
      <div className="score-col">
        <span className="score-label">IMDb</span>
        <div className="score-value-row">
          {scores.imdbScore ? (
            <>
              <Star size={13} className="star-icon" fill="#f5c518" color="#f5c518" />
              <span className="score-value">{scores.imdbScore}</span>
            </>
          ) : (
            <span className="score-value">N/A</span>
          )}
        </div>
        <span className="score-subtext">{scores.imdbVotes || 'Official'}</span>
      </div>

      {/* Column 3: Rotten Tomatoes */}
      <div className="score-col">
        <span className="score-label">ROTTEN TOM.</span>
        <div className="score-value-row">
          {scores.rottenTomatoes ? (
            <>
              <span className="tomato-icon">🍅</span>
              <span className="score-value">{scores.rottenTomatoes}</span>
            </>
          ) : (
            <span className="score-value">N/A</span>
          )}
        </div>
        <span className="score-subtext">Tomatometer</span>
      </div>
    </div>
  );
};
