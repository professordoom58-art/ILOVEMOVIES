import type { TMDBMovieDetailsRaw } from '../types/tmdb';
import type {
  Movie,
  TVSeries,
  MovieCollection,
  MediaItem,
  PersonalEntryConfig,
  CastMember
} from '../types/movie';
import { getWatchLinksForMovie } from '../data/watchLinks';
import { getSavedReview } from './reviews';
import { MIHIR_RATINGS_BY_TMDB_ID, MIHIR_RATINGS_BY_COLLECTION_ID } from '../data/mihirRatings';

const TMDB_API_BASES = ['/api/tmdb', 'https://api.tmdb.org/3', 'https://api.themoviedb.org/3'];
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
const CACHE_PREFIX = 'mfm_media_cache_v18_';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN || import.meta.env.TMDB_ACCESS_TOKEN || '';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || import.meta.env.TMDB_API_KEY || '4e44d9029b1270a757cddc766a1bcb63';

/**
 * Central function to construct official TMDB image URLs.
 * Returns null if path is null/empty.
 */
export function buildTmdbImageUrl(
  path: string | null | undefined,
  size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'
): string | null {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return null;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${TMDB_IMAGE_BASE}/${size}${cleanPath}`;
}

function formatRuntime(minutes: number | null): string | undefined {
  if (!minutes || minutes <= 0) return undefined;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

function formatDate(dateStr?: string): string | undefined {
  if (!dateStr) return undefined;
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

function extractDirector(raw: TMDBMovieDetailsRaw): string | undefined {
  const crew = raw.credits?.crew;
  if (!crew || crew.length === 0) return undefined;

  const directors = crew
    .filter((c) => c.department === 'Directing' && c.job === 'Director')
    .map((d) => d.name);

  return directors.length > 0 ? Array.from(new Set(directors)).join(', ') : undefined;
}

function extractCast(credits: any, limit = 6): CastMember[] {
  const cast = credits?.cast;
  if (!cast || cast.length === 0) return [];

  const sorted = [...cast].sort((a, b) => a.order - b.order);
  return sorted.slice(0, limit).map((c: any) => ({
    id: c.id,
    name: c.name,
    character: c.character || 'Self',
    profilePath: c.profile_path || null,
    photoUrl: buildTmdbImageUrl(c.profile_path, 'w342') || undefined,
    order: c.order
  }));
}

// Known verified external rating reference mappings
const KNOWN_EXTERNAL_SCORES: Record<number, { imdbScore?: string; imdbVotes?: string; rottenTomatoes?: string; certification?: string }> = {
  18785: { imdbScore: '7.7 / 10', imdbVotes: '1.0M votes', rottenTomatoes: '79%', certification: 'R' },
  299536: { imdbScore: '8.4 / 10', imdbVotes: '1.2M votes', rottenTomatoes: '85%', certification: 'PG-13' },
  299534: { imdbScore: '8.4 / 10', imdbVotes: '1.3M votes', rottenTomatoes: '94%', certification: 'PG-13' },
  45243: { imdbScore: '6.5 / 10', imdbVotes: '550K votes', rottenTomatoes: '34%', certification: 'R' },
  109439: { imdbScore: '5.8 / 10', imdbVotes: '380K votes', rottenTomatoes: '20%', certification: 'R' },
  152601: { imdbScore: '8.0 / 10', imdbVotes: '650K votes', rottenTomatoes: '94%', certification: 'R' },
  27205: { imdbScore: '8.8 / 10', imdbVotes: '2.5M votes', rottenTomatoes: '87%', certification: 'PG-13' },
  157336: { imdbScore: '8.7 / 10', imdbVotes: '2.0M votes', rottenTomatoes: '73%', certification: 'PG-13' },
  1422: { imdbScore: '8.5 / 10', imdbVotes: '1.4M votes', rottenTomatoes: '91%', certification: 'R' },
  64690: { imdbScore: '7.8 / 10', imdbVotes: '680K votes', rottenTomatoes: '93%', certification: 'R' },
  335984: { imdbScore: '8.0 / 10', imdbVotes: '620K votes', rottenTomatoes: '88%', certification: 'R' },
  106646: { imdbScore: '8.2 / 10', imdbVotes: '1.5M votes', rottenTomatoes: '80%', certification: 'R' },
  263115: { imdbScore: '8.1 / 10', imdbVotes: '820K votes', rottenTomatoes: '94%', certification: 'R' },
  286217: { imdbScore: '8.0 / 10', imdbVotes: '910K votes', rottenTomatoes: '91%', certification: 'PG-13' },
  146233: { imdbScore: '8.1 / 10', imdbVotes: '780K votes', rottenTomatoes: '81%', certification: 'R' },
  949: { imdbScore: '8.3 / 10', imdbVotes: '710K votes', rottenTomatoes: '88%', certification: 'R' },
  62: { imdbScore: '8.3 / 10', imdbVotes: '730K votes', rottenTomatoes: '92%', certification: 'G' },
  38: { imdbScore: '8.3 / 10', imdbVotes: '1.1M votes', rottenTomatoes: '92%', certification: 'R' },
  37165: { imdbScore: '8.2 / 10', imdbVotes: '1.1M votes', rottenTomatoes: '95%', certification: 'PG' }
};

/**
 * Normalizes raw TMDB API response into application Movie structure.
 */
function normalizeTMDBMovie(raw: TMDBMovieDetailsRaw, personalNotes?: string): Movie {
  const releaseYear = raw.release_date
    ? new Date(raw.release_date).getFullYear()
    : 0;

  const savedReview = getSavedReview(raw.id);
  const ext = KNOWN_EXTERNAL_SCORES[raw.id] || {};

  const posterW500 = buildTmdbImageUrl(raw.poster_path, 'w500') || '';
  const posterW780 = buildTmdbImageUrl(raw.poster_path, 'w780') || '';
  const backdropW1280 = buildTmdbImageUrl(raw.backdrop_path, 'original') || undefined;

  return {
    kind: 'movie',
    tmdbId: raw.id,
    title: raw.title,
    year: releaseYear,
    releaseDate: raw.release_date || undefined,
    formattedReleaseDate: formatDate(raw.release_date),
    overview: raw.overview?.trim() || undefined,
    posterPath: raw.poster_path || null,
    poster: posterW500,
    largePoster: posterW780 || posterW500,
    backdrop: backdropW1280,
    director: extractDirector(raw),
    certification: ext.certification || (raw.status === 'Released' ? 'Feature' : undefined),
    cast: extractCast(raw.credits, 6),
    runtime: formatRuntime(raw.runtime),
    tagline: raw.tagline?.trim() || undefined,
    scores: {
      mihirScore: savedReview?.mihirScore ?? MIHIR_RATINGS_BY_TMDB_ID[raw.id] ?? null,
      imdbScore: ext.imdbScore || (raw.vote_average ? `${Math.round(raw.vote_average * 10) / 10} / 10` : null),
      imdbVotes: ext.imdbVotes || (raw.vote_count ? `${raw.vote_count.toLocaleString()} votes` : null),
      imdbId: raw.external_ids?.imdb_id || undefined,
      rottenTomatoes: ext.rottenTomatoes || null
    },
    watchLinks: getWatchLinksForMovie(raw.id),
    personalNotes
  };
}

const TRUE_DETECTIVE_S1_CAST_SPEC = [
  { name: 'Matthew McConaughey', character: 'Rust Cohle' },
  { name: 'Woody Harrelson', character: 'Marty Hart' },
  { name: 'Michelle Monaghan', character: 'Maggie Hart' },
  { name: 'Michael Potts', character: 'Detective Maynard Gilbough' },
  { name: 'Tory Kittles', character: 'Detective Thomas Papania' }
];

function extractTrueDetectiveS1Cast(credits: any): CastMember[] {
  const castList = credits?.cast || [];
  return TRUE_DETECTIVE_S1_CAST_SPEC.map((spec, index) => {
    const found = castList.find((c: any) =>
      c.name?.toLowerCase().includes(spec.name.toLowerCase()) ||
      spec.name.toLowerCase().includes(c.name?.toLowerCase())
    );

    const profilePath = found?.profile_path || null;
    return {
      id: found?.id || 1000 + index,
      name: spec.name,
      character: spec.character,
      profilePath,
      photoUrl: buildTmdbImageUrl(profilePath, 'w342') || undefined,
      order: index
    };
  });
}

function extractYouCast(
  credits: any,
  victoriaFromApi?: any,
  elizabethFromApi?: any,
  shayFromApi?: any,
  jamesFromApi?: any
): CastMember[] {
  const castList = credits?.cast || [];

  const findPath = (apiData: any, nameSubstring: string): string | null => {
    if (apiData?.profile_path || apiData?.profilePath) {
      return apiData.profile_path || apiData.profilePath;
    }
    const found = castList.find((c: any) => c.name?.toLowerCase().includes(nameSubstring));
    return found?.profile_path || null;
  };

  // 1. Victoria Pedretti — Love Quinn
  const victoriaPath = findPath(victoriaFromApi, 'victoria pedretti');
  const victoriaMember: CastMember = {
    id: 2117434,
    name: 'Victoria Pedretti',
    character: 'Love Quinn',
    profilePath: victoriaPath,
    photoUrl: victoriaPath ? (buildTmdbImageUrl(victoriaPath, 'w342') || undefined) : undefined,
    order: 0
  };

  // 2. Elizabeth Lail — Guinevere Beck (Beck)
  const elizabethPath = findPath(elizabethFromApi, 'elizabeth lail');
  const elizabethMember: CastMember = {
    id: 1450259,
    name: 'Elizabeth Lail',
    character: 'Guinevere Beck',
    profilePath: elizabethPath,
    photoUrl: elizabethPath ? (buildTmdbImageUrl(elizabethPath, 'w342') || undefined) : undefined,
    order: 1
  };

  // 3. Shay Mitchell — Peach Salinger (TMDB Person ID: 222088)
  const shayPath = findPath(shayFromApi, 'shay mitchell');
  const shayMember: CastMember = {
    id: shayFromApi?.id || 222088,
    name: 'Shay Mitchell',
    character: 'Peach Salinger',
    profilePath: shayPath,
    photoUrl: shayPath ? (buildTmdbImageUrl(shayPath, 'w342') || undefined) : undefined,
    order: 2
  };

  // 4. James Scully — Forty Quinn (Resolved via TMDB people API)
  const jamesPath = findPath(jamesFromApi, 'james scully');
  const jamesMember: CastMember = {
    id: jamesFromApi?.id || 1803738,
    name: 'James Scully',
    character: 'Forty Quinn',
    profilePath: jamesPath,
    photoUrl: jamesPath ? (buildTmdbImageUrl(jamesPath, 'w342') || undefined) : undefined,
    order: 3
  };

  // Excluded actors list per user directive
  const excludedNames = [
    'victoria pedretti',
    'elizabeth lail',
    'shay mitchell',
    'james scully',
    'griffin matthews',
    'anna camp',
    'madeline brewer'
  ];

  // Remaining cast members (e.g. Penn Badgley - Joe Goldberg, etc.)
  const remaining = castList
    .filter((c: any) => {
      const name = c.name?.toLowerCase() || '';
      return !excludedNames.some((ex) => name.includes(ex));
    })
    .slice(0, 3)
    .map((c: any, idx: number) => ({
      id: c.id,
      name: c.name,
      character: c.character || 'Self',
      profilePath: c.profile_path || null,
      photoUrl: buildTmdbImageUrl(c.profile_path, 'w342') || undefined,
      order: idx + 4
    }));

  return [victoriaMember, elizabethMember, shayMember, jamesMember, ...remaining];
}

/**
 * Normalizes raw TMDB TV API response into application TVSeries structure.
 */
function normalizeTMDBTV(raw: any, personalNotes?: string): TVSeries {
  const firstYear = raw.first_air_date
    ? new Date(raw.first_air_date).getFullYear()
    : 0;

  const savedReview = getSavedReview(raw.id);
  const posterW500 = buildTmdbImageUrl(raw.poster_path, 'w500') || '';
  const posterW780 = buildTmdbImageUrl(raw.poster_path, 'w780') || '';
  const backdropW1280 = buildTmdbImageUrl(raw.backdrop_path, 'original') || undefined;

  const creatorNames = raw.created_by?.map((c: any) => c.name).join(', ') || undefined;

  if (raw.id === 46648) {
    return {
      kind: 'tv',
      tmdbId: 46648,
      title: 'True Detective',
      year: 2014,
      firstAirDate: '2014-01-12',
      formattedFirstAirDate: 'January 12, 2014',
      lastAirDate: '2014-03-09',
      seasonsCount: 1,
      episodesCount: 8,
      creator: creatorNames || 'Nic Pizzolatto',
      overview:
        'In 2012, Louisiana State Police Detectives Rust Cohle and Marty Hart are brought in to revisit a homicide case they worked in 1995. As the inquiry unfolds in the present day through separate interrogations, the two former detectives narrate the story of their investigation, reopening unhealed wounds, and drawing into question their supposed solving of a bizarre ritualistic murder in 1995.',
      posterPath: raw.poster_path || null,
      poster: posterW500,
      largePoster: posterW780 || posterW500,
      backdrop: backdropW1280,
      status: 'Ended',
      cast: extractTrueDetectiveS1Cast(raw.credits),
      scores: {
        mihirScore: savedReview?.mihirScore ?? MIHIR_RATINGS_BY_TMDB_ID[46648] ?? 10,
        imdbScore: raw.vote_average ? `${Math.round(raw.vote_average * 10) / 10} / 10` : '8.9 / 10',
        imdbVotes: raw.vote_count ? `${raw.vote_count.toLocaleString()} votes` : '630,000 votes',
        rottenTomatoes: '91%'
      },
      watchLinks: getWatchLinksForMovie(46648),
      personalNotes
    };
  }

  return {
    kind: 'tv',
    tmdbId: raw.id,
    title: raw.name,
    year: firstYear,
    firstAirDate: raw.first_air_date || undefined,
    formattedFirstAirDate: formatDate(raw.first_air_date),
    lastAirDate: raw.last_air_date || undefined,
    seasonsCount: raw.number_of_seasons || undefined,
    episodesCount: raw.number_of_episodes || undefined,
    creator: creatorNames,
    overview: raw.overview?.trim() || undefined,
    posterPath: raw.poster_path || null,
    poster: posterW500,
    largePoster: posterW780 || posterW500,
    backdrop: backdropW1280,
    status: raw.status,
    cast: raw.id === 78191 ? extractYouCast(raw.credits, raw.victoriaPedretti, raw.elizabethLail, raw.shayMitchell, raw.jamesScully) : extractCast(raw.credits, 6),
    scores: {
      mihirScore: savedReview?.mihirScore ?? MIHIR_RATINGS_BY_TMDB_ID[raw.id] ?? null,
      imdbScore: raw.vote_average ? `${Math.round(raw.vote_average * 10) / 10} / 10` : null,
      imdbVotes: raw.vote_count ? `${raw.vote_count.toLocaleString()} votes` : null,
      rottenTomatoes: null
    },
    watchLinks: getWatchLinksForMovie(raw.id),
    personalNotes
  };
}

/**
 * Executes a live TMDB API request.
 */
async function fetchFromTmdbApi(endpoint: string): Promise<any> {
  const headers: HeadersInit = {
    'Accept': 'application/json'
  };

  if (ACCESS_TOKEN) {
    headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
  }

  let lastError: Error | null = null;

  for (const base of TMDB_API_BASES) {
    const separator = endpoint.includes('?') ? '&' : '?';
    const authQuery = !ACCESS_TOKEN && API_KEY ? `${separator}api_key=${API_KEY}` : '';
    const url = `${base}${endpoint}${authQuery}`;

    try {
      const res = await fetch(url, { headers });
      if (res.ok) {
        return await res.json();
      } else {
        const errorText = await res.text();
        throw new Error(`TMDB HTTP ${res.status}: ${errorText}`);
      }
    } catch (e: any) {
      lastError = e;
      console.warn(`TMDB request error on ${base}:`, e.message);
    }
  }

  throw lastError || new Error(`Failed to fetch from TMDB endpoint: ${endpoint}`);
}

export async function getMovie(tmdbId: number, personalNotes?: string): Promise<Movie> {
  const cacheKey = `${CACHE_PREFIX}movie_${tmdbId}`;

  try {
    const cachedItem = localStorage.getItem(cacheKey);
    if (cachedItem) {
      const parsed = JSON.parse(cachedItem);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.data) {
        const savedReview = getSavedReview(tmdbId);
        return {
          ...parsed.data,
          scores: {
            ...parsed.data.scores,
            mihirScore: savedReview?.mihirScore ?? MIHIR_RATINGS_BY_TMDB_ID[tmdbId] ?? parsed.data.scores.mihirScore ?? null
          },
          watchLinks: getWatchLinksForMovie(tmdbId),
          personalNotes
        };
      }
    }
  } catch (e) {
    console.warn('Cache read error:', e);
  }

  const rawData: TMDBMovieDetailsRaw = await fetchFromTmdbApi(
    `/movie/${tmdbId}?append_to_response=credits,external_ids`
  );
  const normalizedMovie = normalizeTMDBMovie(rawData, personalNotes);

  try {
    localStorage.setItem(cacheKey, JSON.stringify({ data: normalizedMovie, timestamp: Date.now() }));
  } catch (e) {
    console.warn('Cache write error:', e);
  }

  return normalizedMovie;
}

export async function getTVSeries(tmdbId: number, personalNotes?: string): Promise<TVSeries> {
  const cacheKey = `${CACHE_PREFIX}tv_${tmdbId}`;

  try {
    const cachedItem = localStorage.getItem(cacheKey);
    if (cachedItem) {
      const parsed = JSON.parse(cachedItem);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.data) {
        const savedReview = getSavedReview(tmdbId);
        return {
          ...parsed.data,
          scores: {
            ...parsed.data.scores,
            mihirScore: savedReview?.mihirScore ?? MIHIR_RATINGS_BY_TMDB_ID[tmdbId] ?? parsed.data.scores.mihirScore ?? null
          },
          watchLinks: getWatchLinksForMovie(tmdbId),
          personalNotes
        };
      }
    }
  } catch (e) {
    console.warn('Cache read error:', e);
  }

  let rawData = await fetchFromTmdbApi(`/tv/${tmdbId}?append_to_response=credits,external_ids`);

  if (tmdbId === 46648) {
    try {
      const s1Credits = await fetchFromTmdbApi(`/tv/46648/season/1/credits`);
      if (s1Credits && s1Credits.cast) {
        rawData = {
          ...rawData,
          credits: s1Credits
        };
      }
    } catch (err) {
      console.warn('Could not fetch True Detective Season 1 credits:', err);
    }
  } else if (tmdbId === 78191) {
    try {
      const [victoriaData, elizabethData, shayData, jamesSearchRes] = await Promise.all([
        fetchFromTmdbApi(`/person/2117434`).catch(() => null),
        fetchFromTmdbApi(`/person/1450259`).catch(() => null),
        fetchFromTmdbApi(`/person/222088`).catch(() => null),
        fetchFromTmdbApi(`/search/person?query=James%20Scully`).catch(() => null)
      ]);

      let jamesData: any = null;
      if (jamesSearchRes && jamesSearchRes.results && jamesSearchRes.results.length > 0) {
        jamesData = jamesSearchRes.results.find((p: any) =>
          p.name?.toLowerCase().includes('james scully')
        ) || jamesSearchRes.results[0];
      }

      rawData = {
        ...rawData,
        victoriaPedretti: victoriaData ? {
          id: 2117434,
          name: 'Victoria Pedretti',
          character: 'Love Quinn',
          profile_path: victoriaData.profile_path || null,
          profilePath: victoriaData.profile_path || null
        } : undefined,
        elizabethLail: elizabethData ? {
          id: 1450259,
          name: 'Elizabeth Lail',
          character: 'Guinevere Beck',
          profile_path: elizabethData.profile_path || null,
          profilePath: elizabethData.profile_path || null
        } : undefined,
        shayMitchell: shayData ? {
          id: 222088,
          name: 'Shay Mitchell',
          character: 'Peach Salinger',
          profile_path: shayData.profile_path || null,
          profilePath: shayData.profile_path || null
        } : undefined,
        jamesScully: jamesData ? {
          id: jamesData.id,
          name: 'James Scully',
          character: 'Forty Quinn',
          profile_path: jamesData.profile_path || null,
          profilePath: jamesData.profile_path || null
        } : undefined
      };
    } catch (err) {
      console.warn('Could not fetch You series cast person data:', err);
    }
  }

  const normalizedTV = normalizeTMDBTV(rawData, personalNotes);

  try {
    localStorage.setItem(cacheKey, JSON.stringify({ data: normalizedTV, timestamp: Date.now() }));
  } catch (e) {
    console.warn('Cache write error:', e);
  }

  return normalizedTV;
}

export async function getCollection(config: PersonalEntryConfig): Promise<MovieCollection> {
  const collectionId = config.id || `col_${config.tmdbCollectionId || config.title}`;
  const cacheKey = `${CACHE_PREFIX}collection_${collectionId}`;

  // Check cache
  try {
    const cachedItem = localStorage.getItem(cacheKey);
    if (cachedItem) {
      const parsed = JSON.parse(cachedItem);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.data) {
        return parsed.data;
      }
    }
  } catch (e) {
    console.warn('Cache read error:', e);
  }

  let collectionPosterPath = config.customPosterPath || null;
  let collectionOverview = '';

  if (config.tmdbCollectionId) {
    try {
      const rawColl = await fetchFromTmdbApi(`/collection/${config.tmdbCollectionId}`);
      if (rawColl.poster_path && !collectionPosterPath) {
        collectionPosterPath = rawColl.poster_path;
      }
      collectionOverview = rawColl.overview || '';
    } catch (e) {
      console.warn(`Could not load TMDB collection ${config.tmdbCollectionId}:`, e);
    }
  }

  // Resolve individual movies in this collection
  const movieIds = config.movieIds || [];
  const movies = await Promise.all(
    movieIds.map((id) => getMovie(id).catch(() => null))
  );
  const favoriteIds = config.favoriteMovieIds || [9615];
  const validMovies = movies
    .filter((m): m is Movie => m !== null)
    .map((m) => {
      if (favoriteIds.includes(m.tmdbId) || m.tmdbId === 9615) {
        return { ...m, isFavorite: true };
      }
      return m;
    });

  // Sort movies chronologically
  validMovies.sort((a, b) => (a.year || 0) - (b.year || 0));

  // Determine years covered
  let yearsCovered: string | undefined;
  if (validMovies.length > 0) {
    const years = validMovies.map((m) => m.year).filter((y) => y > 0);
    if (years.length > 0) {
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);
      yearsCovered = minYear === maxYear ? `${minYear}` : `${minYear}–${maxYear}`;
    }
  }

  // If collection has no poster, use the poster of the first film
  if (!collectionPosterPath && validMovies.length > 0) {
    collectionPosterPath = validMovies[0].posterPath || null;
  }

  const posterW500 = buildTmdbImageUrl(collectionPosterPath, 'w500') || (validMovies[0]?.poster || '');
  const posterW780 = buildTmdbImageUrl(collectionPosterPath, 'w780') || (validMovies[0]?.largePoster || posterW500);

  const collectionItem: MovieCollection = {
    kind: 'collection',
    id: collectionId,
    tmdbCollectionId: config.tmdbCollectionId,
    title: config.title || 'Collection',
    tag: config.tag || 'COLLECTION',
    poster: posterW500,
    largePoster: posterW780,
    overview: collectionOverview || `A curated collection of ${validMovies.length} films.`,
    movieCount: validMovies.length,
    yearsCovered,
    movieIds,
    movies: validMovies,
    scores: {
      mihirScore: MIHIR_RATINGS_BY_COLLECTION_ID[collectionId] ?? null
    },
    watchLinks: getWatchLinksForMovie(config.tmdbCollectionId || 0),
    personalNotes: config.personalNotes
  };

  try {
    localStorage.setItem(cacheKey, JSON.stringify({ data: collectionItem, timestamp: Date.now() }));
  } catch (e) {
    console.warn('Cache write error:', e);
  }

  return collectionItem;
}

export async function fetchCollection(entries: PersonalEntryConfig[]): Promise<MediaItem[]> {
  const promises = entries.map((entry) => {
    if (entry.kind === 'collection') {
      return getCollection(entry).catch((err) => {
        console.error(`Failed to resolve collection ${entry.title}:`, err);
        return null;
      });
    } else if (entry.kind === 'tv') {
      return getTVSeries(entry.tmdbId!, entry.personalNotes).catch((err) => {
        console.error(`Failed to resolve TV series ${entry.tmdbId}:`, err);
        return null;
      });
    } else {
      return getMovie(entry.tmdbId!, entry.personalNotes).catch((err) => {
        console.error(`Failed to resolve movie ${entry.tmdbId}:`, err);
        return null;
      });
    }
  });

  const results = await Promise.all(promises);
  const validItems = results.filter((item): item is MediaItem => item !== null);

  if (validItems.length === 0 && entries.length > 0) {
    throw new Error('Unable to connect to movie data API. Please verify network connectivity.');
  }

  return validItems;
}
