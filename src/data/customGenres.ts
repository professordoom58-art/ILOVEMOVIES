import type { MediaItem } from '../types/movie';

/**
 * Custom genre / classification badges assigned to catalog entries.
 * Rules: Custom assigned labels take priority over generic labels.
 */
export const CUSTOM_GENRE_BY_ID: Record<string | number, string> = {
  // ── Explicit Custom Assigned Labels ────────────────────────────────────────
  // Transformers (All entries & Collection)
  91314: 'AUTOBOTS 4EVA',                  // 11. Transformers: Age of Extinction
  'col-transformers-1-3': 'AUTOBOTS 4EVA', // 124. Transformers Collection — 1–3
  8650: 'AUTOBOTS 4EVA',                   // TMDB Collection ID fallback

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

  // The Fall Guy / Crazy, Stupid, Love. / Game Over, Man! / The Nice Guys
  746036: 'COMEDY',                        // The Fall Guy
  50646: 'COMEDY',                         // Crazy, Stupid, Love.
  456750: 'COMEDY',                        // Game Over, Man!
  290250: 'COMEDY',                        // The Nice Guys

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

  // Central Intelligence / Harry Potter / Pirates of the Caribbean
  302699: 'ACTION ADVENTURE',              // Central Intelligence
  'col-harry-potter': 'ACTION ADVENTURE',  // Harry Potter Collection
  1241: 'ACTION ADVENTURE',                // TMDB Collection ID fallback
  'col-pirates-of-the-caribbean': 'ACTION ADVENTURE', // Pirates of the Caribbean Collection
  295: 'ACTION ADVENTURE',                 // TMDB Collection ID fallback

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

  // DC IS SO BACK / DC HICCUP
  1061474: 'DC IS SO BACK',                // Superman (2025)
  436270: 'DC HICCUP',                     // Black Adam

  // SUPE GENRE REIMAGINED
  13183: 'SUPE GENRE REIMAGINED',          // Watchmen (2009)
  76479: 'SUPE GENRE REIMAGINED',          // The Boys

  // ANIME (Every Anime / Animated Japanese Series)
  1429: 'ANIME',                           // Attack on Titan
  31911: 'ANIME',                          // Fullmetal Alchemist: Brotherhood
  61223: 'ANIME',                          // Akame ga Kill!
  127532: 'ANIME',                         // SPY × FAMILY
  114410: 'ANIME',                         // Chainsaw Man
  13916: 'ANIME',                          // Death Note
  85937: 'ANIME',                          // Demon Slayer
  62104: 'ANIME',                          // The Seven Deadly Sins
  95479: 'ANIME',                          // Jujutsu Kaisen
  30991: 'ANIME',                          // Cowboy Bebop
  42509: 'ANIME',                          // Steins;Gate

  // ── Explicit and Assigned Categories Across All Catalog Items ─────────────

  // CRIME THRILLER
  11324: 'CRIME THRILLER',                 // 53. Shutter Island
  1949: 'CRIME THRILLER',                  // 54. Zodiac
  210577: 'CRIME THRILLER',                // 55. Gone Girl
  550: 'CRIME THRILLER',                   // 56. Fight Club
  65754: 'CRIME THRILLER',                 // 57. The Girl with the Dragon Tattoo
  807: 'CRIME THRILLER',                   // 58. Se7en
  2649: 'CRIME THRILLER',                  // 59. The Game
  11423: 'CRIME THRILLER',                 // 82. Memories of Murder
  629: 'CRIME THRILLER',                   // 83. The Usual Suspects
  273481: 'CRIME THRILLER',                // 40. Sicario
  146233: 'CRIME THRILLER',                // 41. Prisoners
  242582: 'CRIME THRILLER',                // 89. Nightcrawler
  1538: 'CRIME THRILLER',                  // 92. Collateral
  1422: 'CRIME THRILLER',                  // 12. The Departed
  64690: 'CRIME THRILLER',                 // 14. Drive
  75780: 'CRIME THRILLER',                 // 95. Jack Reacher
  343611: 'CRIME THRILLER',                // 96. Jack Reacher: Never Go Back
  877817: 'CRIME THRILLER',                // 37. Wolfs
  'col-oceans-trilogy': 'CRIME THRILLER',  // 128. Ocean's Collection
  304: 'CRIME THRILLER',                   // TMDB Collection ID fallback
  78191: 'CRIME THRILLER',                 // 150. You

  // DARK GRITTY CRIME THRILLER
  1813: 'DARK GRITTY CRIME THRILLER',      // 43. The Devil's Advocate
  949: 'DARK GRITTY CRIME THRILLER',       // 44. Heat
  40008: 'DARK GRITTY CRIME THRILLER',     // 149. Hannibal
  46648: 'DARK GRITTY CRIME THRILLER',     // 151. True Detective (Season 1 only)

  // WHODUNIT
  'col-knives-out': 'WHODUNIT',            // 137. Knives Out Collection
  722971: 'WHODUNIT',                      // TMDB Collection ID fallback
  5236: 'WHODUNIT',                        // 84. Kiss Kiss Bang Bang
  322: 'WHODUNIT',                         // 29. Mystic River
  19885: 'WHODUNIT',                       // 165. Sherlock (2010)

  // DC ANIMATED
  'col-crisis-on-infinite-earths': 'DC ANIMATED', // 135. Justice League: Crisis on Infinite Earths
  408220: 'DC ANIMATED',                   // 117. Justice League Dark
  30061: 'DC ANIMATED',                    // 120. Justice League: Crisis on Two Earths

  // ITS BATMAN JUST WATCH IT
  324849: 'ITS BATMAN JUST WATCH IT',      // 8. The LEGO Batman Movie
  485942: 'ITS BATMAN JUST WATCH IT',      // 118. Batman Ninja
  1560520: 'ITS BATMAN JUST WATCH IT',     // 116. Batman: Knightfall (2026)

  // FAST PACED ACTION
  'col-fast-furious-1-7': 'FAST PACED ACTION', // 125. Fast & Furious Collection — 1–7
  9485: 'FAST PACED ACTION',                   // TMDB Collection ID fallback
  'col-john-wick': 'FAST PACED ACTION',        // 132. John Wick Collection
  404609: 'FAST PACED ACTION',                 // TMDB Collection ID fallback
  'col-bourne-saga': 'FAST PACED ACTION',      // 127. Jason Bourne Collection
  31562: 'FAST PACED ACTION',                  // TMDB Collection ID fallback
  'col-mission-impossible': 'FAST PACED ACTION', // 138. Mission: Impossible Collection
  87359: 'FAST PACED ACTION',                  // TMDB Collection ID fallback
  'col-james-bond-daniel-craig': 'FAST PACED ACTION', // 139. James Bond — Daniel Craig Collection
  'col-kill-bill': 'FAST PACED ACTION',        // 126. Kill Bill — Vol. 1 & 2
  2883: 'FAST PACED ACTION',                   // TMDB Collection ID fallback
  2109: 'FAST PACED ACTION',                   // 143. Rush Hour (1998)
  'col-rush-hour-2-3': 'FAST PACED ACTION',    // 144. Rush Hour 2 + Rush Hour 3
  4141: 'FAST PACED ACTION',               // 122. Shoot 'Em Up
  8850: 'FAST PACED ACTION',               // 71. Crank
  27578: 'FAST PACED ACTION',              // 72. The Expendables
  76163: 'FAST PACED ACTION',              // 73. The Expendables 2
  509967: 'FAST PACED ACTION',             // 33. 6 Underground
  718930: 'FAST PACED ACTION',             // 38. Bullet Train
  76341: 'FAST PACED ACTION',              // 119. Mad Max: Fury Road
  9654: 'FAST PACED ACTION',               // 69. The Italian Job
  384018: 'FAST PACED ACTION',             // 70. Hobbs & Shaw
  512195: 'FAST PACED ACTION',             // 65. Red Notice

  // BOLLYWOOD
  41517: 'BOLLYWOOD',                      // 79. Ra.One
  79464: 'BOLLYWOOD',                      // 100. Rockstar (2011)
  127501: 'BOLLYWOOD',                     // 101. Barfi!
  21297: 'BOLLYWOOD',                      // 102. Wake Up Sid
  24827: 'BOLLYWOOD',                      // 103. Ajab Prem Ki Ghazab Kahani
  15864: 'BOLLYWOOD',                      // 104. Bachna Ae Haseeno
  34764: 'BOLLYWOOD',                      // 105. Karthik Calling Karthik
  61202: 'BOLLYWOOD',                      // 106. Zindagi Na Milegi Dobara
  15974: 'BOLLYWOOD',                      // 109. Bhootnath
  496527: 'BOLLYWOOD',                     // 110. October
  215248: 'BOLLYWOOD',                     // 76. Yevadu
  368006: 'BOLLYWOOD',                     // 164. 24 (2016)

  // SCI-FI
  300681: 'SCI-FI',                        // 42. Replicas
  62: 'SCI-FI',                            // 45. 2001: A Space Odyssey
  38: 'SCI-FI',                            // 46. Eternal Sunshine of the Spotless Mind
  141: 'SCI-FI',                           // 88. Donnie Darko
  1903: 'SCI-FI',                          // 91. Vanilla Sky
  180: 'SCI-FI',                           // 93. Minority Report
  75612: 'SCI-FI',                         // 94. Oblivion
  137113: 'SCI-FI',                        // 97. Edge of Tomorrow
  59967: 'SCI-FI',                         // 99. Looper
  'col-matrix-trilogy': 'SCI-FI',          // 131. The Matrix Collection
  2344: 'SCI-FI',                          // TMDB Collection ID fallback
  188927: 'SCI-FI',                        // 121. Star Trek Beyond
  87421: 'SCI-FI',                         // 123. Riddick
  60625: 'SCI-FI',                         // 173. Rick and Morty
  335984: 'SCI-FI',                        // 18. Blade Runner 2049
  27205: 'SCI-FI',                         // 24. Inception
  157336: 'SCI-FI',                        // 25. Interstellar
  286217: 'SCI-FI',                        // 30. The Martian
  687163: 'SCI-FI',                        // 15. Project Hail Mary
  71469: 'SCI-FI',                         // 10. The Darkest Hour
  72190: 'SCI-FI',                         // 39. World War Z
  696806: 'SCI-FI',                        // 34. The Adam Project
  'col-star-wars-original-trilogy': 'SCI-FI', // 147. Star Wars Episodes IV–VI
  'col-star-wars-prequel-trilogy': 'SCI-FI',  // 148. Star Wars Episodes I–III

  // SCI-FI HORROR
  713704: 'SCI-FI HORROR',                 // 31. Evil Dead Rise

  // MARVELOUS
  299536: 'MARVELOUS',                     // 1. Avengers: Infinity War
  299534: 'MARVELOUS',                     // 2. Avengers: Endgame
  76338: 'MARVELOUS',                      // 9. Thor: The Dark World
  969681: 'MARVELOUS',                     // 27. Spider-Man: Brand New Day
  1930: 'MARVELOUS',                       // 28. The Amazing Spider-Man
  263115: 'MARVELOUS',                     // 32. Logan
  284054: 'MARVELOUS',                     // 112. Black Panther
  'col-spider-verse': 'MARVELOUS',         // 134. Spider-Man: Spider-Verse
  573436: 'MARVELOUS',                     // TMDB Collection ID fallback
  'col-guardians-of-the-galaxy': 'MARVELOUS', // 136. Guardians of the Galaxy Collection
  284433: 'MARVELOUS',                     // TMDB Collection ID fallback
  'col-deadpool-trilogy': 'MARVELOUS',     // 130. Deadpool Collection
  448150: 'MARVELOUS',                     // TMDB Collection ID fallback
  'col-x-men-through-2015': 'MARVELOUS',   // 129. X-Men Collection — Through 2015
  748: 'MARVELOUS',                        // TMDB Collection ID fallback
  'col-ghost-rider': 'MARVELOUS',          // 145. Ghost Rider Collection
  90306: 'MARVELOUS',                      // TMDB Collection ID fallback
  92749: 'MARVELOUS',                      // 166. Moon Knight
  61889: 'MARVELOUS',                      // 167. Daredevil
  67178: 'MARVELOUS',                      // 168. The Punisher

  // SUPE GENRE REIMAGINED
  110492: 'SUPE GENRE REIMAGINED',         // 155. Peacemaker

  // INSPIRED BY REALITY
  369972: 'INSPIRED BY REALITY',           // 13. First Man

  // ADVENTURE
  72545: 'ADVENTURE',                      // 67. Journey 2: The Mysterious Island

  // ACTION ADVENTURE
  1368337: 'ACTION ADVENTURE',             // 26. The Odyssey
  1399: 'ACTION ADVENTURE',                // 176. Game of Thrones

  // ANIMATED
  'col-the-incredibles': 'ANIMATED',       // 140. The Incredibles Collection
  468222: 'ANIMATED',                      // TMDB Collection ID fallback
  'col-kung-fu-panda': 'ANIMATED',         // 142. Kung Fu Panda Collection
  77816: 'ANIMATED',                       // TMDB Collection ID fallback
  61222: 'ANIMATED',                       // 172. BoJack Horseman

  // COMEDY
  27581: 'COMEDY',                         // 16. The Other Guys
  43347: 'COMEDY',                         // 21. Love & Other Drugs

  // COMEDY GOLD
  64688: 'COMEDY GOLD',                    // 35. 21 Jump Street
  187017: 'COMEDY GOLD',                   // 36. 22 Jump Street
  'col-adam-sandler': 'COMEDY GOLD',       // 141. Adam Sandler Collection
  1421: 'COMEDY GOLD',                     // 170. Modern Family
  1668: 'COMEDY GOLD',                     // 171. Friends
  59186: 'COMEDY GOLD',                    // 174. Impractical Jokers
  2316: 'COMEDY GOLD',                     // 175. The Office (US)
  1215439: 'COMEDY GOLD',                  // 177. Dave Chappelle: The Dreamer
  701687: 'COMEDY GOLD',                   // 178. Mark Normand: Out to Lunch
  624932: 'COMEDY GOLD',                   // 179. Dave Chappelle: Sticks & Stones
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
