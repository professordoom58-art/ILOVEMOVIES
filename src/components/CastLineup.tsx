import React, { useState } from 'react';
import type { CastMember } from '../types/movie';

interface CastLineupProps {
  cast: CastMember[];
}

export const CastLineup: React.FC<CastLineupProps> = ({ cast }) => {
  const [failedPhotoIds, setFailedPhotoIds] = useState<Set<number>>(new Set());

  if (!cast || cast.length === 0) return null;

  const handleImageError = (id: number, name: string, url?: string) => {
    console.warn(`TMDB actor photo failed to load for "${name}":`, url);
    setFailedPhotoIds((prev) => new Set(prev).add(id));
  };

  return (
    <section className="cast-section" aria-label="Principal Cast">
      <div className="section-divider-row">
        <h3 className="drawer-section-heading">CAST</h3>
      </div>

      <div className="cast-grid">
        {cast.slice(0, 6).map((member) => {
          const hasPhoto = Boolean(member.photoUrl) && !failedPhotoIds.has(member.id);

          return (
            <div key={member.id} className="cast-card">
              <div className="cast-photo-frame">
                {hasPhoto && member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="cast-photo-img"
                    loading="lazy"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(member.id, member.name, member.photoUrl)}
                  />
                ) : (
                  <div className="cast-photo-unavailable">
                    <span className="photo-unavailable-text">Photo unavailable</span>
                  </div>
                )}
              </div>

              <div className="cast-info">
                <h4 className="cast-name">{member.name}</h4>
                <span className="cast-character">
                  as {member.character.replace(/^(as\s+)/i, '')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
