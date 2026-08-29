import React, { useState, useEffect } from 'react';
import { getSavedReview, saveReview } from '../services/reviews';
import { Check, Star } from 'lucide-react';

interface ReviewSectionProps {
  tmdbId: number;
  onReviewSaved?: (mihirScore: string | null) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ tmdbId, onReviewSaved }) => {
  const [reviewText, setReviewText] = useState('');
  const [mihirScore, setMihirScore] = useState<string>('');
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    const saved = getSavedReview(tmdbId);
    if (saved) {
      setReviewText(saved.reviewText || '');
      setMihirScore(saved.mihirScore ? `${saved.mihirScore}` : '');
    } else {
      setReviewText('');
      setMihirScore('');
    }
    setSavedStatus(false);
  }, [tmdbId]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedScore = mihirScore.trim() ? mihirScore.trim() : null;
    saveReview(tmdbId, reviewText, formattedScore);
    setSavedStatus(true);
    if (onReviewSaved) {
      onReviewSaved(formattedScore);
    }
    setTimeout(() => setSavedStatus(false), 3000);
  };

  return (
    <section className="drawer-review-section" id="my-review-section" aria-label="Personal Movie Review">
      <div className="section-divider-row">
        <h3 className="drawer-section-heading">MY REVIEW</h3>
      </div>

      <form onSubmit={handleSave} className="review-form">
        <div className="review-input-wrapper">
          <textarea
            className="review-textarea"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={4}
            aria-label="Personal Review Text"
          />
        </div>

        <div className="review-controls-bar">
          <span className="review-privacy-note">
            Your review is private and only visible to you.
          </span>

          <div className="review-action-group">
            <div className="score-input-container">
              <label htmlFor="mihir-score-input" className="score-input-label">
                <Star size={12} fill="currentColor" color="var(--accent-terracotta)" />
                <span>MIHIR SCORE</span>
              </label>
              <div className="score-input-box-wrapper">
                <input
                  id="mihir-score-input"
                  type="text"
                  className="mihir-score-input"
                  placeholder="—"
                  value={mihirScore}
                  onChange={(e) => setMihirScore(e.target.value)}
                  maxLength={4}
                />
                <span className="score-out-of">/ 10</span>
              </div>
            </div>

            <button type="submit" className="save-review-btn">
              {savedStatus ? (
                <>
                  <Check size={14} />
                  <span>SAVED</span>
                </>
              ) : (
                <span>SAVE REVIEW</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
