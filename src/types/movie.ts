export type MediaKind = 'movie' | 'tv' | 'collection';
export type CollectionTag = 'SAGA' | 'TRILOGY' | 'COLLECTION';

export interface WatchLink {
  id: string;
  name: string;
  url: string;
  type?: 'primary' | 'secondary' | string;
  badgeText?: string;
  isVerified?: boolean;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath?: string | null;
  photoUrl?: string;
  order: number;
}

export interface MediaScores {
  mihirScore?: number | string | null;
  imdbScore?: string | null;
  imdbVotes?: string | null;
  imdbId?: string;
  rottenTomatoes?: string | null;
}

export type MovieScores = MediaScores;

export interface Movie {
  kind: 'movie';
  tmdbId: number;
  title: string;
  year: number;
  releaseDate?: string;
  formattedReleaseDate?: string;
  overview?: string;
  posterPath?: string | null;
  poster: string;
  largePoster?: string;
  backdrop?: string;
  director?: string;
  certification?: string;
  cast: CastMember[];
  runtime?: string;
  tagline?: string;
  scores: MediaScores;
  watchLinks: WatchLink[];
  personalNotes?: string;
  isFavorite?: boolean;
}

export interface TVSeries {
  kind: 'tv';
  tmdbId: number;
  title: string;
  year: number;
  firstAirDate?: string;
  formattedFirstAirDate?: string;
  lastAirDate?: string;
  seasonsCount?: number;
  episodesCount?: number;
  creator?: string;
  overview?: string;
  posterPath?: string | null;
  poster: string;
  largePoster?: string;
  backdrop?: string;
  status?: string;
  cast: CastMember[];
  scores: MediaScores;
  watchLinks: WatchLink[];
  personalNotes?: string;
}

export interface MovieCollection {
  kind: 'collection';
  id: string;
  tmdbCollectionId?: number;
  title: string;
  tag: CollectionTag;
  poster: string;
  largePoster?: string;
  backdrop?: string;
  overview?: string;
  movieCount: number;
  yearsCovered?: string;
  movieIds: number[];
  movies?: Movie[];
  scores?: MediaScores;
  watchLinks?: WatchLink[];
  personalNotes?: string;
  favoriteMovieIds?: number[];
}

export type MediaItem = Movie | TVSeries | MovieCollection;

export interface PersonalEntryConfig {
  kind: 'movie' | 'tv' | 'collection';
  tmdbId?: number;
  id?: string;
  title?: string;
  tag?: CollectionTag;
  tmdbCollectionId?: number;
  movieIds?: number[];
  customPosterPath?: string;
  personalNotes?: string;
  favoriteMovieIds?: number[];
}

export interface UserMovieReview {
  tmdbId: number;
  reviewText?: string;
  mihirScore?: number | string | null;
  updatedAt?: string;
}
