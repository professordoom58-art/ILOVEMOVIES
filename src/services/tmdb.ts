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

const TMDB_API_BASES = ['/api/tmdb', 'https://api.themoviedb.org/3', 'https://api.tmdb.org/3'];
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
const CACHE_PREFIX = 'mfm_media_cache_v23_';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 Days

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN || import.meta.env.TMDB_ACCESS_TOKEN || '';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || import.meta.env.TMDB_API_KEY || '4e44d9029b1270a757cddc766a1bcb63';

// In-memory runtime cache & in-flight promise deduplication
const memoryCache = new Map<string, any>();
const inFlightPromises = new Map<string, Promise<any>>();

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
    certification: ext.certification || undefined,
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

  const victoriaPath = findPath(victoriaFromApi, 'victoria pedretti');
  const victoriaMember: CastMember = {
    id: 2117434,
    name: 'Victoria Pedretti',
    character: 'Love Quinn',
    profilePath: victoriaPath,
    photoUrl: victoriaPath ? (buildTmdbImageUrl(victoriaPath, 'w342') || undefined) : undefined,
    order: 0
  };

  const elizabethPath = findPath(elizabethFromApi, 'elizabeth lail');
  const elizabethMember: CastMember = {
    id: 1368507,
    name: 'Elizabeth Lail',
    character: 'Guinevere Beck',
    profilePath: elizabethPath,
    photoUrl: elizabethPath ? (buildTmdbImageUrl(elizabethPath, 'w342') || undefined) : undefined,
    order: 1
  };

  const shayPath = findPath(shayFromApi, 'shay mitchell');
  const shayMember: CastMember = {
    id: shayFromApi?.id || 222088,
    name: 'Shay Mitchell',
    character: 'Peach Salinger',
    profilePath: shayPath,
    photoUrl: shayPath ? (buildTmdbImageUrl(shayPath, 'w342') || undefined) : undefined,
    order: 2
  };

  const jamesPath = findPath(jamesFromApi, 'james scully');
  const jamesMember: CastMember = {
    id: jamesFromApi?.id || 1803738,
    name: 'James Scully',
    character: 'Forty Quinn',
    profilePath: jamesPath,
    photoUrl: jamesPath ? (buildTmdbImageUrl(jamesPath, 'w342') || undefined) : undefined,
    order: 3
  };

  const excludedNames = [
    'victoria pedretti',
    'elizabeth lail',
    'shay mitchell',
    'james scully',
    'griffin matthews',
    'anna camp',
    'madeline brewer'
  ];

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
      cast: raw.credits ? extractTrueDetectiveS1Cast(raw.credits) : [],
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
    cast: raw.credits
      ? (raw.id === 78191
          ? extractYouCast(raw.credits, raw.victoriaPedretti, raw.elizabethLail, raw.shayMitchell, raw.jamesScully)
          : extractCast(raw.credits, 6))
      : [],
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
 * Executes a live TMDB API request with deduplication & retry.
 */
async function fetchFromTmdbApi(endpoint: string, retries = 2): Promise<any> {
  const reqKey = `api_${endpoint}`;
  if (inFlightPromises.has(reqKey)) {
    return inFlightPromises.get(reqKey);
  }

  const promise = (async () => {
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
        } else if (res.status === 429 && retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 600));
          return fetchFromTmdbApi(endpoint, retries - 1);
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
  })();

  inFlightPromises.set(reqKey, promise);
  try {
    return await promise;
  } finally {
    inFlightPromises.delete(reqKey);
  }
}

function getFromStorage(key: string): any | null {
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }
  try {
    const item = localStorage.getItem(key);
    if (item) {
      const parsed = JSON.parse(item);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.data) {
        memoryCache.set(key, parsed.data);
        return parsed.data;
      }
    }
  } catch (e) {
    console.warn('Storage read error:', e);
  }
  return null;
}

function setToStorage(key: string, data: any): void {
  memoryCache.set(key, data);
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (e) {
    console.warn('Storage write error:', e);
  }
}

/**
 * Fetch lightweight movie data (sufficient for card/grid rendering).
 */
export async function getMovie(tmdbId: number, personalNotes?: string, full = false): Promise<Movie> {
  const fullCacheKey = `${CACHE_PREFIX}movie_full_${tmdbId}`;
  const basicCacheKey = `${CACHE_PREFIX}movie_${tmdbId}`;

  // If full was requested, check full cache first
  if (full) {
    const cachedFull = getFromStorage(fullCacheKey);
    if (cachedFull) {
      const savedReview = getSavedReview(tmdbId);
      return {
        ...cachedFull,
        scores: {
          ...cachedFull.scores,
          mihirScore: savedReview?.mihirScore ?? MIHIR_RATINGS_BY_TMDB_ID[tmdbId] ?? cachedFull.scores.mihirScore ?? null
        },
        watchLinks: getWatchLinksForMovie(tmdbId),
        personalNotes
      };
    }
  } else {
    // If basic was requested, either full or basic cache is fine
    const cached = getFromStorage(fullCacheKey) || getFromStorage(basicCacheKey);
    if (cached) {
      const savedReview = getSavedReview(tmdbId);
      return {
        ...cached,
        scores: {
          ...cached.scores,
          mihirScore: savedReview?.mihirScore ?? MIHIR_RATINGS_BY_TMDB_ID[tmdbId] ?? cached.scores.mihirScore ?? null
        },
        watchLinks: getWatchLinksForMovie(tmdbId),
        personalNotes
      };
    }
  }

  const endpoint = full
    ? `/movie/${tmdbId}?append_to_response=credits,external_ids`
    : `/movie/${tmdbId}`;

  const rawData: TMDBMovieDetailsRaw = await fetchFromTmdbApi(endpoint);
  const normalizedMovie = normalizeTMDBMovie(rawData, personalNotes);

  if (full) {
    setToStorage(fullCacheKey, normalizedMovie);
  } else {
    setToStorage(basicCacheKey, normalizedMovie);
  }

  return normalizedMovie;
}

/**
 * Explicitly loads full movie details (credits, crew, director, ratings).
 */
export async function getFullMovie(tmdbId: number, personalNotes?: string): Promise<Movie> {
  return getMovie(tmdbId, personalNotes, true);
}

/**
 * Fetch lightweight TV series data.
 */
export async function getTVSeries(tmdbId: number, personalNotes?: string, full = false): Promise<TVSeries> {
  const fullCacheKey = `${CACHE_PREFIX}tv_full_${tmdbId}`;
  const basicCacheKey = `${CACHE_PREFIX}tv_${tmdbId}`;

  if (full) {
    const cachedFull = getFromStorage(fullCacheKey);
    if (cachedFull) {
      const savedReview = getSavedReview(tmdbId);
      return {
        ...cachedFull,
        scores: {
          ...cachedFull.scores,
          mihirScore: savedReview?.mihirScore ?? MIHIR_RATINGS_BY_TMDB_ID[tmdbId] ?? cachedFull.scores.mihirScore ?? null
        },
        watchLinks: getWatchLinksForMovie(tmdbId),
        personalNotes
      };
    }
  } else {
    const cached = getFromStorage(fullCacheKey) || getFromStorage(basicCacheKey);
    if (cached) {
      const savedReview = getSavedReview(tmdbId);
      return {
        ...cached,
        scores: {
          ...cached.scores,
          mihirScore: savedReview?.mihirScore ?? MIHIR_RATINGS_BY_TMDB_ID[tmdbId] ?? cached.scores.mihirScore ?? null
        },
        watchLinks: getWatchLinksForMovie(tmdbId),
        personalNotes
      };
    }
  }

  const endpoint = full
    ? `/tv/${tmdbId}?append_to_response=credits,external_ids`
    : `/tv/${tmdbId}`;

  let rawData = await fetchFromTmdbApi(endpoint);

  if (full) {
    if (tmdbId === 46648) {
      try {
        const s1Credits = await fetchFromTmdbApi(`/tv/46648/season/1/credits`);
        if (s1Credits && s1Credits.cast) {
          rawData = { ...rawData, credits: s1Credits };
        }
      } catch (err) {
        console.warn('Could not fetch True Detective Season 1 credits:', err);
      }
    } else if (tmdbId === 78191) {
      try {
        const [victoriaData, elizabethData, shayData, jamesSearchRes] = await Promise.all([
          fetchFromTmdbApi(`/person/2117434`).catch(() => null),
          fetchFromTmdbApi(`/person/1368507`).catch(() => null),
          fetchFromTmdbApi(`/person/222088`).catch(() => null),
          fetchFromTmdbApi(`/search/person?query=James%20Scully`).catch(() => null)
        ]);

        let jamesData: any = null;
        if (jamesSearchRes && jamesSearchRes.results && jamesSearchRes.results.length > 0) {
          jamesData = jamesSearchRes.results.find((p: any) =>
            p.name?.toLowerCase().includes('james scully')
          ) || jamesSearchRes.results[0];

          if (jamesData && !jamesData.profile_path && jamesData.id) {
            try {
              const jamesDirect = await fetchFromTmdbApi(`/person/${jamesData.id}`);
              if (jamesDirect && jamesDirect.profile_path) {
                jamesData = jamesDirect;
              }
            } catch (e) {
              console.warn('James Scully direct fetch error:', e);
            }
          }
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
            id: 1368507,
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
            id: jamesData?.id || 1803738,
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
  }

  const normalizedTV = normalizeTMDBTV(rawData, personalNotes);

  if (full) {
    setToStorage(fullCacheKey, normalizedTV);
  } else {
    setToStorage(basicCacheKey, normalizedTV);
  }

  return normalizedTV;
}

export async function getFullTVSeries(tmdbId: number, personalNotes?: string): Promise<TVSeries> {
  return getTVSeries(tmdbId, personalNotes, true);
}

/**
 * Fetch collection summary (does not eagerly fetch all internal movies).
 */
export async function getCollection(config: PersonalEntryConfig): Promise<MovieCollection> {
  const collectionId = config.id || `col_${config.tmdbCollectionId || config.title}`;
  const cacheKey = `${CACHE_PREFIX}collection_${collectionId}`;

  const cached = getFromStorage(cacheKey);
  if (cached) {
    return cached;
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

  // Fallback to first movie poster if no collection poster
  if (!collectionPosterPath && config.movieIds && config.movieIds.length > 0) {
    try {
      const firstMovie = await getMovie(config.movieIds[0]);
      collectionPosterPath = firstMovie.posterPath || null;
    } catch {
      // Continue with empty poster
    }
  }

  const posterW500 = buildTmdbImageUrl(collectionPosterPath, 'w500') || '';
  const posterW780 = buildTmdbImageUrl(collectionPosterPath, 'w780') || posterW500;
  const movieCount = config.movieIds?.length || 0;

  const collectionItem: MovieCollection = {
    kind: 'collection',
    id: collectionId,
    tmdbCollectionId: config.tmdbCollectionId,
    title: config.title || 'Collection',
    tag: config.tag || 'COLLECTION',
    poster: posterW500,
    largePoster: posterW780,
    overview: collectionOverview || `A curated collection of ${movieCount} films.`,
    movieCount,
    movieIds: config.movieIds || [],
    movies: [], // Populated on-demand via getCollectionMovies
    scores: {
      mihirScore: MIHIR_RATINGS_BY_COLLECTION_ID[collectionId] ?? null
    },
    watchLinks: getWatchLinksForMovie(config.tmdbCollectionId || 0),
    personalNotes: config.personalNotes,
    favoriteMovieIds: config.favoriteMovieIds
  };

  setToStorage(cacheKey, collectionItem);
  return collectionItem;
}

/**
 * Lazy-load all movies within a collection when viewed.
 */
export async function getCollectionMovies(collection: MovieCollection | PersonalEntryConfig): Promise<Movie[]> {
  const movieIds = collection.movieIds || [];
  if (movieIds.length === 0) return [];

  const movies = await Promise.all(
    movieIds.map((id) =>
      getMovie(id).catch(() => getTVSeries(id) as unknown as Movie).catch(() => null)
    )
  );

  const favoriteIds = collection.favoriteMovieIds || [9615];
  const validMovies = movies
    .filter((m): m is Movie => m !== null)
    .map((m) => {
      if (favoriteIds.includes(m.tmdbId) || m.tmdbId === 9615) {
        return { ...m, isFavorite: true };
      }
      return m;
    });

  validMovies.sort((a, b) => (a.year || 0) - (b.year || 0));
  return validMovies;
}

/**
 * Rapid concurrent catalog loader with concurrency limit.
 */
export async function fetchCollection(entries: PersonalEntryConfig[]): Promise<MediaItem[]> {
  const CONCURRENCY = 20;
  const results: (MediaItem | null)[] = new Array(entries.length).fill(null);

  let activeIndex = 0;
  async function worker() {
    while (activeIndex < entries.length) {
      const idx = activeIndex++;
      const entry = entries[idx];
      try {
        if (entry.kind === 'collection') {
          results[idx] = await getCollection(entry);
        } else if (entry.kind === 'tv') {
          results[idx] = await getTVSeries(entry.tmdbId!, entry.personalNotes);
        } else {
          results[idx] = await getMovie(entry.tmdbId!, entry.personalNotes);
        }
      } catch (err) {
        console.error(`Failed to resolve entry ${entry.tmdbId || entry.title}:`, err);
        results[idx] = null;
      }
    }
  }

  const workers = Array.from({ length: Math.min(CONCURRENCY, entries.length) }, () => worker());
  await Promise.all(workers);

  const validItems = results.filter((item): item is MediaItem => item !== null);

  if (validItems.length === 0 && entries.length > 0) {
    throw new Error('Unable to connect to movie data API. Please verify network connectivity.');
  }

  return validItems;
}
