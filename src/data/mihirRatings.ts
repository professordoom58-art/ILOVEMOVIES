/**
 * Mihir's personal ratings for every movie, TV series, and saga/collection.
 * Movies & TV: keyed by TMDB numeric ID.
 * Collections: keyed by the `id` string from favoriteMovies.ts.
 */
export const MIHIR_RATINGS_BY_TMDB_ID: Record<number, number | string> = {
  // ── Movies ──────────────────────────────────────────────────────────────
  299536: 10,    // Avengers: Infinity War
  299534: 9.5,   // Avengers: Endgame
  18785:  10,    // The Hangover
  45243:  9,     // The Hangover Part II
  109439: 6,     // The Hangover Part III
  537921: 8,     // Fixed (2025)
  152601: 10,    // Her
  324849: 10,    // The LEGO Batman Movie
  76338:  8,     // Thor: The Dark World
  71469:  10,    // The Darkest Hour
  91314:  10,    // Transformers: Age of Extinction
  1422:   10,    // The Departed
  369972: 8.5,   // First Man
  64690:  9,     // Drive
  687163: 10,    // Project Hail Mary
  27581:  9,     // The Other Guys
  290250: 9,     // The Nice Guys
  335984: 9,     // Blade Runner 2049
  746036: 7.5,   // The Fall Guy
  50646:  8.5,   // Crazy, Stupid, Love.
  43347:  9,     // Love & Other Drugs
  185:    8.5,   // A Clockwork Orange
  106646: 10,    // The Wolf of Wall Street
  27205:  10,    // Inception
  157336: 8.5,   // Interstellar
  1368337: 9,   // The Odyssey (Christopher Nolan)
  969681: 10,    // Spider-Man: Brand New Day
  1930:   10,    // The Amazing Spider-Man
  322:    10,    // Mystic River
  286217: 8.5,   // The Martian
  713704: 8,     // Evil Dead Rise
  263115: 10,    // Logan
  509967: 7.5,   // 6 Underground
  696806: 7,     // The Adam Project
  64688:  10,    // 21 Jump Street
  187017: 7,     // 22 Jump Street
  877817: 8,     // Wolfs
  718930: 10,    // Bullet Train
  72190:  9,     // World War Z
  273481: 7.5,   // Sicario
  146233: 8.5,   // Prisoners
  300681: 7,     // Replicas
  1813:   10,    // The Devil's Advocate
  949:    7.5,   // Heat
  62:     10,    // 2001: A Space Odyssey
  38:     10,    // Eternal Sunshine of the Spotless Mind
  37165:  9,     // The Truman Show
  3049:   9,     // Ace Ventura: Pet Detective
  854:    9,     // The Mask
  8467:   8.5,   // Dumb and Dumber
  10201:  10,    // Yes Man
  456750: 8,     // Game Over, Man!

  // ── TV Series ────────────────────────────────────────────────────────────
  40008:  10,    // Hannibal
  78191:  10,    // You
  46648:  10,    // True Detective
  1429:   10,    // Attack on Titan
  31911:  10,    // Fullmetal Alchemist: Brotherhood
  61223:  11,    // Akame ga Kill!
};

/**
 * Collection ratings keyed by collection `id` string (from favoriteMovies.ts).
 */
export const MIHIR_RATINGS_BY_COLLECTION_ID: Record<string, number | string> = {
  'col-transformers-1-3':            9,
  'col-fast-furious-1-7':            9,
  'col-kill-bill':                   8.5,
  'col-bourne-saga':                 9,
  'col-oceans-trilogy':              10,
  'col-x-men-through-2015':         10,
  'col-deadpool-trilogy':            9.5,
  'col-matrix-trilogy':              10,
  'col-john-wick':                   9,
  'col-harry-potter':                10,
  'col-spider-verse':                9,
  'col-crisis-on-infinite-earths':  10,
};
