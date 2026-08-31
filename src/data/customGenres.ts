import type { MediaItem } from '../types/movie';

/**
 * Custom genre / classification badges assigned to catalog entries.
 * Rules: Custom assigned labels take priority over generic labels.
 */
export const CUSTOM_GENRE_BY_ID: Record<string | number, string> = {
  // ── Explicit Custom Assigned Labels ────────────────────────────────────────
  // Don / Don 2
  17501: 'DON DON DON...',                 // Don (2006)
  41109: 'DON DON DON...',                 // Don 2 (2011)

  // Parody
  4247: 'PARODY',                          // Scary Movie
  11918: 'PARODY',                         // Superhero Movie

  // Animated
  537921: 'ANIMATED',                      // Fixed (2025)

  // The Hangover
  18785: 'COMEDY',                         // The Hangover
  45243: 'COMEDY',                         // The Hangover Part II
  109439: 'COMEDY',                        // The Hangover Part III

  // Her
  152601: 'SCI-FI HORROR',                 // Her (2013)

  // The Fall Guy / Crazy, Stupid, Love. / Game Over, Man!
  746036: 'COMEDY',                        // The Fall Guy
  50646: 'COMEDY',                         // Crazy, Stupid, Love.
  456750: 'COMEDY',                        // Game Over, Man!

  // A Clockwork Orange
  185: 'DARK GRITTY CRIME THRILLER',       // A Clockwork Orange

  // The Wolf of Wall Street
  106646: 'GET THE FUCK OFF MY BOAT',      // The Wolf of Wall Street

  // The Truman Show
  37165: 'INSPIRED BY REALITY',            // The Truman Show

  // Jim Carrey Movies
  3049: 'FOR JIM CARREY',                  // Ace Ventura: Pet Detective
  854: 'FOR JIM CARREY',                   // The Mask
  8467: 'FOR JIM CARREY',                  // Dumb and Dumber
  10201: 'FOR JIM CARREY',                 // Yes Man

  // Borat / The Dictator
  496: 'COMEDY',                           // Borat
  76493: 'COMEDY',                         // The Dictator

  // Jumanji
  8844: 'ADVENTURE',                       // Jumanji (1995)
  353486: 'ADVENTURE',                     // Jumanji: Welcome to the Jungle
  512200: 'ADVENTURE',                     // Jumanji: The Next Level

  // Central Intelligence
  302699: 'ACTION ADVENTURE',              // Central Intelligence

  // Allu Arjun Movies
  443635: 'ALLU ARJUN PRIME',              // Duvvada Jagannadham (DJ)
  374954: 'ALLU ARJUN PRIME',              // Sarrainodu
  262227: 'ALLU ARJUN PRIME',              // Race Gurram
  34763: 'ALLU ARJUN PRIME',               // Arya 2

  // Rajinikanth Movies
  24049: 'RAJNIKANTH SUPER',               // Sivaji: The Boss
  148284: 'RAJNIKANTH SUPER',              // Robot / Enthiran (2010)

  // Comedy Gold
  8363: 'COMEDY GOLD',                     // Superbad
  228967: 'COMEDY GOLD',                   // The Interview (2014)
  109414: 'COMEDY GOLD',                   // This Is the End

  // Scott Pilgrim vs. the World
  22538: 'FEVER DREAM',                    // Scott Pilgrim vs. the World

  // Catch Me If You Can
  640: 'CRIME THRILLER',                   // Catch Me If You Can

  // Superman (2025)
  1061474: 'DC IS SO BACK',                // Superman (2025)

  // ── Existing Custom Labels (Where Appropriate) ────────────────────────────

  // CRIME THRILLER
  11324: 'CRIME THRILLER',                 // Shutter Island
  1949: 'CRIME THRILLER',                  // Zodiac
  210577: 'CRIME THRILLER',                // Gone Girl
  550: 'CRIME THRILLER',                   // Fight Club
  65754: 'CRIME THRILLER',                 // The Girl with the Dragon Tattoo
  807: 'CRIME THRILLER',                   // Se7en
  2649: 'CRIME THRILLER',                  // The Game
  11423: 'CRIME THRILLER',                 // Memories of Murder
  629: 'CRIME THRILLER',                   // The Usual Suspects
  273481: 'CRIME THRILLER',                // Sicario
  146233: 'CRIME THRILLER',                // Prisoners
  242582: 'CRIME THRILLER',                // Nightcrawler
  1538: 'CRIME THRILLER',                  // Collateral
  1422: 'CRIME THRILLER',                  // The Departed
  64690: 'CRIME THRILLER',                 // Drive
  75780: 'CRIME THRILLER',                 // Jack Reacher
  343611: 'CRIME THRILLER',                // Jack Reacher: Never Go Back

  // WHODUNIT
  'col-knives-out': 'WHODUNIT',            // Knives Out Collection
  5236: 'WHODUNIT',                        // Kiss Kiss Bang Bang
  322: 'WHODUNIT',                         // Mystic River
  19885: 'WHODUNIT',                       // Sherlock (2010)

  // DC ANIMATED
  'col-crisis-on-infinite-earths': 'DC ANIMATED', // Justice League: Crisis on Infinite Earths
  408220: 'DC ANIMATED',                   // Justice League Dark
  485942: 'DC ANIMATED',                   // Batman Ninja
  30061: 'DC ANIMATED',                    // Justice League: Crisis on Two Earths

  // ITS BATMAN JUST WATCH IT
  324849: 'ITS BATMAN JUST WATCH IT',      // The LEGO Batman Movie
  1560520: 'ITS BATMAN JUST WATCH IT',     // Batman: Knightfall (2026)

  // FAST PACED ACTION
  'col-fast-furious-1-7': 'FAST PACED ACTION', // Fast & Furious Collection — 1–7
  'col-john-wick': 'FAST PACED ACTION',        // John Wick
  'col-bourne-saga': 'FAST PACED ACTION',      // Jason Bourne Collection
  'col-mission-impossible': 'FAST PACED ACTION', // Mission: Impossible Collection
  'col-james-bond-daniel-craig': 'FAST PACED ACTION', // James Bond — Daniel Craig Collection
  4141: 'FAST PACED ACTION',               // Shoot 'Em Up
  8850: 'FAST PACED ACTION',               // Crank
  27578: 'FAST PACED ACTION',              // The Expendables
  76163: 'FAST PACED ACTION',              // The Expendables 2
  509967: 'FAST PACED ACTION',             // 6 Underground
  718930: 'FAST PACED ACTION',             // Bullet Train
  76341: 'FAST PACED ACTION',              // Mad Max: Fury Road
  9654: 'FAST PACED ACTION',               // The Italian Job
  384018: 'FAST PACED ACTION',             // Hobbs & Shaw
  512195: 'FAST PACED ACTION',             // Red Notice

  // BOLLYWOOD
  41517: 'BOLLYWOOD',                      // Ra.One
  79464: 'BOLLYWOOD',                      // Rockstar (2011)
  127501: 'BOLLYWOOD',                     // Barfi!
  21297: 'BOLLYWOOD',                      // Wake Up Sid
  24827: 'BOLLYWOOD',                      // Ajab Prem Ki Ghazab Kahani
  15864: 'BOLLYWOOD',                      // Bachna Ae Haseeno
  34764: 'BOLLYWOOD',                      // Karthik Calling Karthik
  61202: 'BOLLYWOOD',                      // Zindagi Na Milegi Dobara
  15974: 'BOLLYWOOD',                      // Bhootnath
  496527: 'BOLLYWOOD',                     // October
  215248: 'BOLLYWOOD',                     // Yevadu
  368006: 'BOLLYWOOD',                     // 24 (2016)

  // SCI-FI SHENNANIGANS
  300681: 'SCI-FI SHENNANIGANS',           // Replicas
  62: 'SCI-FI SHENNANIGANS',               // 2001: A Space Odyssey
  38: 'SCI-FI SHENNANIGANS',               // Eternal Sunshine of the Spotless Mind
  141: 'SCI-FI SHENNANIGANS',              // Donnie Darko
  1903: 'SCI-FI SHENNANIGANS',             // Vanilla Sky
  180: 'SCI-FI SHENNANIGANS',              // Minority Report
  75612: 'SCI-FI SHENNANIGANS',            // Oblivion
  137113: 'SCI-FI SHENNANIGANS',           // Edge of Tomorrow
  59967: 'SCI-FI SHENNANIGANS',            // Looper
  'col-matrix-trilogy': 'SCI-FI SHENNANIGANS', // The Matrix Collection
  188927: 'SCI-FI SHENNANIGANS',           // Star Trek Beyond
  87421: 'SCI-FI SHENNANIGANS',            // Riddick
  60625: 'SCI-FI SHENNANIGANS',            // Rick and Morty
  42509: 'SCI-FI SHENNANIGANS',            // Steins;Gate
  335984: 'SCI-FI SHENNANIGANS',           // Blade Runner 2049
  27205: 'SCI-FI SHENNANIGANS',            // Inception
  157336: 'SCI-FI SHENNANIGANS',           // Interstellar
  286217: 'SCI-FI SHENNANIGANS',           // The Martian
  687163: 'SCI-FI SHENNANIGANS',           // Project Hail Mary
  71469: 'SCI-FI SHENNANIGANS',            // The Darkest Hour
  72190: 'SCI-FI SHENNANIGANS',            // World War Z

  // MARVELOUS
  299536: 'MARVELOUS',                     // Avengers: Infinity War
  299534: 'MARVELOUS',                     // Avengers: Endgame
  76338: 'MARVELOUS',                      // Thor: The Dark World
  969681: 'MARVELOUS',                     // Spider-Man: Brand New Day
  1930: 'MARVELOUS',                       // The Amazing Spider-Man
  263115: 'MARVELOUS',                     // Logan
  284054: 'MARVELOUS',                     // Black Panther
  'col-spider-verse': 'MARVELOUS',         // Spider-Man: Spider-Verse
  'col-guardians-of-the-galaxy': 'MARVELOUS', // Guardians of the Galaxy Collection
  'col-deadpool-trilogy': 'MARVELOUS',     // Deadpool Collection
  'col-x-men-through-2015': 'MARVELOUS',   // X-Men Collection — Through 2015
  92749: 'MARVELOUS',                      // Moon Knight
  61889: 'MARVELOUS',                      // Daredevil
  67178: 'MARVELOUS',                      // The Punisher
};

/**
 * Returns the custom genre badge text for a given media item.
 */
export function getCustomGenre(item: MediaItem): string | undefined {
  if (item.kind === 'collection') {
    return CUSTOM_GENRE_BY_ID[item.id] || (item.tmdbCollectionId ? CUSTOM_GENRE_BY_ID[item.tmdbCollectionId] : undefined);
  }
  return CUSTOM_GENRE_BY_ID[item.tmdbId];
}
