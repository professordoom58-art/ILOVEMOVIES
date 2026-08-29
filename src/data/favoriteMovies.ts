import type { PersonalEntryConfig } from '../types/movie';

export const FAVORITE_MEDIA: PersonalEntryConfig[] = [
  // 1. Initial Movies
  { kind: 'movie', tmdbId: 299536 }, // Avengers: Infinity War
  { kind: 'movie', tmdbId: 299534 }, // Avengers: Endgame
  { kind: 'movie', tmdbId: 18785 },  // The Hangover
  { kind: 'movie', tmdbId: 45243 },  // The Hangover Part II
  { kind: 'movie', tmdbId: 109439 }, // The Hangover Part III

  // 2. Individual Movies
  { kind: 'movie', tmdbId: 537921 }, // Fixed (2025)
  { kind: 'movie', tmdbId: 152601 }, // Her (2013)
  { kind: 'movie', tmdbId: 324849 }, // The LEGO Batman Movie
  { kind: 'movie', tmdbId: 76338 },  // Thor: The Dark World
  { kind: 'movie', tmdbId: 71469 },  // The Darkest Hour (2011)
  { kind: 'movie', tmdbId: 91314 },  // Transformers: Age of Extinction (Transformers 4)
  { kind: 'movie', tmdbId: 1422 },   // The Departed (2006)
  { kind: 'movie', tmdbId: 369972 }, // First Man (2018)
  { kind: 'movie', tmdbId: 64690 },  // Drive (2011)
  { kind: 'movie', tmdbId: 687163 }, // Project Hail Mary
  { kind: 'movie', tmdbId: 27581 },  // The Other Guys
  { kind: 'movie', tmdbId: 290250 }, // The Nice Guys
  { kind: 'movie', tmdbId: 335984 }, // Blade Runner 2049
  { kind: 'movie', tmdbId: 746036 }, // The Fall Guy
  { kind: 'movie', tmdbId: 50646 },  // Crazy, Stupid, Love.
  { kind: 'movie', tmdbId: 43347 },  // Love & Other Drugs
  { kind: 'movie', tmdbId: 185 },    // A Clockwork Orange
  { kind: 'movie', tmdbId: 106646 }, // The Wolf of Wall Street
  { kind: 'movie', tmdbId: 27205 },  // Inception
  { kind: 'movie', tmdbId: 157336 }, // Interstellar
  { kind: 'movie', tmdbId: 1368337 }, // The Odyssey (Christopher Nolan)
  { kind: 'movie', tmdbId: 969681 }, // Spider-Man: Brand New Day
  { kind: 'movie', tmdbId: 1930 },   // The Amazing Spider-Man (2012)
  { kind: 'movie', tmdbId: 322 },    // Mystic River
  { kind: 'movie', tmdbId: 286217 }, // The Martian (Single entry)
  { kind: 'movie', tmdbId: 713704 }, // Evil Dead Rise
  { kind: 'movie', tmdbId: 263115 }, // Logan
  { kind: 'movie', tmdbId: 509967 }, // 6 Underground
  { kind: 'movie', tmdbId: 696806 }, // The Adam Project
  { kind: 'movie', tmdbId: 64688 },  // 21 Jump Street
  { kind: 'movie', tmdbId: 187017 }, // 22 Jump Street
  { kind: 'movie', tmdbId: 877817 }, // Wolfs (2024)
  { kind: 'movie', tmdbId: 718930 }, // Bullet Train
  { kind: 'movie', tmdbId: 72190 },  // World War Z
  { kind: 'movie', tmdbId: 273481 }, // Sicario
  { kind: 'movie', tmdbId: 146233 }, // Prisoners
  { kind: 'movie', tmdbId: 300681 }, // Replicas
  { kind: 'movie', tmdbId: 1813 },   // The Devil's Advocate
  { kind: 'movie', tmdbId: 949 },    // Heat (1995)
  { kind: 'movie', tmdbId: 62 },     // 2001: A Space Odyssey
  { kind: 'movie', tmdbId: 38 },     // Eternal Sunshine of the Spotless Mind
  { kind: 'movie', tmdbId: 37165 },  // The Truman Show
  { kind: 'movie', tmdbId: 3049 },   // Ace Ventura: Pet Detective
  { kind: 'movie', tmdbId: 854 },    // The Mask
  { kind: 'movie', tmdbId: 8467 },   // Dumb and Dumber
  { kind: 'movie', tmdbId: 10201 },  // Yes Man
  { kind: 'movie', tmdbId: 456750 }, // Game Over, Man!

  // 3. Collection / Saga Cards (1 Card each)
  {
    kind: 'collection',
    id: 'col-transformers-1-3',
    title: 'TRANSFORMERS SAGA — 1–3',
    tag: 'SAGA',
    tmdbCollectionId: 8650,
    movieIds: [1858, 8373, 38356]
  },
  {
    kind: 'collection',
    id: 'col-fast-furious-1-7',
    title: 'FAST & FURIOUS SAGA — 1–7',
    tag: 'SAGA',
    tmdbCollectionId: 9485,
    movieIds: [9799, 584, 9615, 13804, 51497, 82992, 168259],
    favoriteMovieIds: [9615]
  },
  {
    kind: 'collection',
    id: 'col-kill-bill',
    title: 'KILL BILL',
    tag: 'COLLECTION',
    tmdbCollectionId: 2883,
    movieIds: [24, 393]
  },
  {
    kind: 'collection',
    id: 'col-bourne-saga',
    title: 'JASON BOURNE SAGA',
    tag: 'SAGA',
    tmdbCollectionId: 31562,
    movieIds: [2501, 2502, 2503, 49040, 324668]
  },
  {
    kind: 'collection',
    id: 'col-oceans-trilogy',
    title: "OCEAN'S TRILOGY",
    tag: 'TRILOGY',
    tmdbCollectionId: 304,
    movieIds: [161, 163, 298]
  },
  {
    kind: 'collection',
    id: 'col-x-men-through-2015',
    title: 'X-MEN SAGA — THROUGH 2015',
    tag: 'SAGA',
    tmdbCollectionId: 748,
    movieIds: [36657, 36658, 36668, 49538, 127585] // Filtered <= 2015
  },
  {
    kind: 'collection',
    id: 'col-deadpool-trilogy',
    title: 'DEADPOOL TRILOGY',
    tag: 'TRILOGY',
    tmdbCollectionId: 448150,
    movieIds: [293660, 383498, 533535]
  },
  {
    kind: 'collection',
    id: 'col-matrix-trilogy',
    title: 'THE MATRIX TRILOGY',
    tag: 'TRILOGY',
    tmdbCollectionId: 2344,
    movieIds: [603, 604, 605]
  },
  {
    kind: 'collection',
    id: 'col-john-wick',
    title: 'JOHN WICK',
    tag: 'COLLECTION',
    tmdbCollectionId: 404609,
    movieIds: [245891, 324552, 458156, 603692]
  },
  {
    kind: 'collection',
    id: 'col-harry-potter',
    title: 'HARRY POTTER SAGA',
    tag: 'SAGA',
    tmdbCollectionId: 1241,
    movieIds: [671, 672, 673, 674, 675, 767, 12444, 12445]
  },
  {
    kind: 'collection',
    id: 'col-spider-verse',
    title: 'SPIDER-MAN: SPIDER-VERSE',
    tag: 'COLLECTION',
    tmdbCollectionId: 573436,
    movieIds: [324857, 569094]
  },
  {
    kind: 'collection',
    id: 'col-crisis-on-infinite-earths',
    title: 'JUSTICE LEAGUE: CRISIS ON INFINITE EARTHS',
    tag: 'TRILOGY',
    movieIds: [1155089, 1209288, 1209290],
    customPosterPath: '/mcRVsjMbhFstRK9z2oGRHiIvulr.jpg'
  },

  // 4. TV Series Cards
  { kind: 'tv', tmdbId: 40008 }, // Hannibal
  { kind: 'tv', tmdbId: 78191 }, // You
  { kind: 'tv', tmdbId: 46648 }, // True Detective
  { kind: 'tv', tmdbId: 1429 },  // Attack on Titan
  { kind: 'tv', tmdbId: 31911 }, // Fullmetal Alchemist: Brotherhood
  { kind: 'tv', tmdbId: 61223 }  // Akame ga Kill!
];

// Retain backward compatibility export
export const FAVORITE_MOVIES = FAVORITE_MEDIA;
