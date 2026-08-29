import type { UserMovieReview } from '../types/movie';

const REVIEW_KEY_PREFIX = 'mfm_review_';

export function getSavedReview(tmdbId: number): UserMovieReview | null {
  try {
    const raw = localStorage.getItem(`${REVIEW_KEY_PREFIX}${tmdbId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to load review from localStorage:', e);
  }
  return null;
}

export function saveReview(tmdbId: number, reviewText: string, mihirScore?: number | string | null): UserMovieReview {
  const review: UserMovieReview = {
    tmdbId,
    reviewText,
    mihirScore: mihirScore || null,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(`${REVIEW_KEY_PREFIX}${tmdbId}`, JSON.stringify(review));
    window.dispatchEvent(new CustomEvent('mfm_review_updated', { detail: review }));
  } catch (e) {
    console.warn('Failed to save review to localStorage:', e);
  }

  return review;
}
