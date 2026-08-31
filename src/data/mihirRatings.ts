/**
 * Mihir's personal ratings for every movie, TV series, and saga/collection.
 * Movies & TV: keyed by TMDB numeric ID.
 * Collections: keyed by the `id` string from favoriteMovies.ts.
 */
export const MIHIR_RATINGS_BY_TMDB_ID: Record<number, number | string> = {
  // ── Existing Movies (1–52) ────────────────────────────────────────────────
  299536: 10,    // 1. Avengers: Infinity War
  299534: 9.5,   // 2. Avengers: Endgame
  18785:  10,    // 3. The Hangover
  45243:  9,     // 4. The Hangover Part II
  109439: 6,     // 5. The Hangover Part III
  537921: 8,     // 6. Fixed (2025)
  152601: 10,    // 7. Her (2013)
  324849: 10,    // 8. The LEGO Batman Movie
  76338:  8,     // 9. Thor: The Dark World
  71469:  10,    // 10. The Darkest Hour (2011)
  91314:  10,    // 11. Transformers: Age of Extinction
  1422:   10,    // 12. The Departed
  369972: 8.5,   // 13. First Man
  64690:  9,     // 14. Drive
  687163: 10,    // 15. Project Hail Mary
  27581:  9,     // 16. The Other Guys
  290250: 9,     // 17. The Nice Guys
  335984: 9,     // 18. Blade Runner 2049
  746036: 7.5,   // 19. The Fall Guy
  50646:  8.5,   // 20. Crazy, Stupid, Love.
  43347:  9,     // 21. Love & Other Drugs
  185:    8.5,   // 22. A Clockwork Orange
  106646: 10,    // 23. The Wolf of Wall Street
  27205:  10,    // 24. Inception
  157336: 8.5,   // 25. Interstellar
  1368337: 9,    // 26. The Odyssey
  969681: 10,    // 27. Spider-Man: Brand New Day
  1930:   10,    // 28. The Amazing Spider-Man
  322:    10,    // 29. Mystic River
  286217: 8.5,   // 30. The Martian
  713704: 8,     // 31. Evil Dead Rise
  263115: 10,    // 32. Logan
  509967: 7.5,   // 33. 6 Underground
  696806: 7,     // 34. The Adam Project
  64688:  10,    // 35. 21 Jump Street
  187017: 7,     // 36. 22 Jump Street
  877817: 8,     // 37. Wolfs
  718930: 10,    // 38. Bullet Train
  72190:  9,     // 39. World War Z
  273481: 7.5,   // 40. Sicario
  146233: 8.5,   // 41. Prisoners
  300681: 7,     // 42. Replicas
  1813:   10,    // 43. The Devil's Advocate
  949:    7.5,   // 44. Heat
  62:     10,    // 45. 2001: A Space Odyssey
  38:     10,    // 46. Eternal Sunshine of the Spotless Mind
  37165:  9,     // 47. The Truman Show
  3049:   9,     // 48. Ace Ventura: Pet Detective
  854:    9,     // 49. The Mask
  8467:   8.5,   // 50. Dumb and Dumber
  10201:  10,    // 51. Yes Man
  456750: 8,     // 52. Game Over, Man!

  // ── New Movies (53–123) ───────────────────────────────────────────────────
  11324:  10,    // 53. Shutter Island
  1949:   10,    // 54. Zodiac
  210577: 9,     // 55. Gone Girl
  550:    9,     // 56. Fight Club
  65754:  10,    // 57. The Girl with the Dragon Tattoo
  807:    9,     // 58. Se7en
  2649:   9,     // 59. The Game
  76493:  10,    // 60. The Dictator
  496:    8,     // 61. Borat
  8844:   8.5,   // 62. Jumanji (1995)
  353486: 10,    // 63. Jumanji: Welcome to the Jungle
  512200: 8.5,   // 64. Jumanji: The Next Level
  512195: 9,     // 65. Red Notice
  302699: 9.5,   // 66. Central Intelligence
  72545:  8,     // 67. Journey 2: The Mysterious Island
  436270: 8.5,   // 68. Black Adam
  9654:   9,     // 69. The Italian Job (2003)
  384018: 9,     // 70. Hobbs & Shaw
  8850:   9,     // 71. Crank
  27578:  8,     // 72. The Expendables
  76163:  8,     // 73. The Expendables 2
  443635: 10,    // 74. Duvvada Jagannadham (DJ)
  374954: 9.5,   // 75. Sarrainodu
  215248: 8.5,   // 76. Yevadu
  24049:  10,    // 77. Sivaji: The Boss
  148284: 10,    // 78. Robot / Enthiran (2010)
  41517:  11,    // 79. Ra.One
  262227: 10,    // 80. Race Gurram
  34763:  11,    // 81. Arya 2
  11423:  10,    // 82. Memories of Murder
  629:    9,     // 83. The Usual Suspects
  5236:   9,     // 84. Kiss Kiss Bang Bang
  8363:   10,    // 85. Superbad
  228967: 10,    // 86. The Interview (2014)
  109414: 10,    // 87. This Is the End
  141:    9,     // 88. Donnie Darko
  242582: 8.5,   // 89. Nightcrawler
  22538:  10,    // 90. Scott Pilgrim vs. the World
  1903:   10,    // 91. Vanilla Sky
  1538:   8.5,   // 92. Collateral
  180:    10,    // 93. Minority Report
  75612:  9,     // 94. Oblivion
  75780:  9.5,   // 95. Jack Reacher
  343611: 9,     // 96. Jack Reacher: Never Go Back
  137113: 10,    // 97. Edge of Tomorrow
  640:    10,    // 98. Catch Me If You Can
  59967:  8.5,   // 99. Looper
  79464:  10,    // 100. Rockstar (2011)
  127501: 9,     // 101. Barfi!
  21297:  8.5,   // 102. Wake Up Sid
  24827:  10,    // 103. Ajab Prem Ki Ghazab Kahani
  15864:  10,    // 104. Bachna Ae Haseeno
  34764:  10,    // 105. Karthik Calling Karthik
  61202:  10,    // 106. Zindagi Na Milegi Dobara
  17501:  11,    // 107. Don (2006)
  41109:  11,    // 108. Don 2
  15974:  10,    // 109. Bhootnath
  496527: 10,    // 110. October
  13183:  8.5,   // 111. Watchmen (2009)
  284054: 9,     // 112. Black Panther (2018)
  11918:  8,     // 113. Superhero Movie
  4247:   7.5,   // 114. Scary Movie
  1061474: 9,    // 115. Superman (2025)
  1560520: 10,   // 116. Batman: Knightfall (2026)
  408220: 8.5,   // 117. Justice League Dark
  485942: 8,     // 118. Batman Ninja
  76341:  9,     // 119. Mad Max: Fury Road
  30061:  9,     // 120. Justice League: Crisis on Two Earths
  188927: 10,    // 121. Star Trek Beyond
  4141:   10,    // 122. Shoot 'Em Up
  87421:  9,     // 123. Riddick

  // ── Individual Movie in Collections list (143) ────────────────────────────
  2109:   10,    // 143. Rush Hour (1998)

  // ── TV Series (149–176) ───────────────────────────────────────────────────
  40008:  10,    // 149. Hannibal
  78191:  10,    // 150. You
  46648:  10,    // 151. True Detective (Season 1 only)
  1429:   10,    // 152. Attack on Titan
  31911:  10,    // 153. Fullmetal Alchemist: Brotherhood
  61223:  11,    // 154. Akame ga Kill!
  110492: 10,    // 155. Peacemaker
  127532: 9,     // 156. SPY × FAMILY
  114410: 10,    // 157. Chainsaw Man
  13916:  10,    // 158. Death Note
  85937:  9,     // 159. Demon Slayer
  62104:  8.5,   // 160. The Seven Deadly Sins
  95479:  9,     // 161. Jujutsu Kaisen
  30991:  10,    // 162. Cowboy Bebop
  42509:  8.5,   // 163. Steins;Gate
  368006: 8,     // 164. 24 (2016) — South Indian/Tamil film
  19885:  9,     // 165. Sherlock (2010)
  92749:  9,     // 166. Moon Knight
  61889:  9,     // 167. Daredevil
  67178:  10,    // 168. The Punisher
  76479:  10,    // 169. The Boys
  1421:   9,     // 170. Modern Family
  1668:   10,    // 171. Friends
  61222:  9,     // 172. BoJack Horseman
  60625:  9,     // 173. Rick and Morty
  59186:  10,    // 174. Impractical Jokers
  2316:   9.5,   // 175. The Office (US)
  1399:   8.5,   // 176. Game of Thrones

  // ── Comedy Specials (177–179) ─────────────────────────────────────────────
  1215439: 9,    // 177. Dave Chappelle: The Dreamer
  701687: 10,    // 178. Mark Normand: Out to Lunch
  // 624932: UNRATED (179. Dave Chappelle: Sticks & Stones)
};

/**
 * Collection ratings keyed by collection `id` string (from favoriteMovies.ts).
 */
export const MIHIR_RATINGS_BY_COLLECTION_ID: Record<string, number | string> = {
  'col-transformers-1-3':          9,    // 124. Transformers Saga — Films 1–3
  'col-fast-furious-1-7':          9,    // 125. Fast & Furious Saga — Films 1–7
  'col-kill-bill':                 8.5,  // 126. Kill Bill — Vol. 1 & 2
  'col-bourne-saga':               9,    // 127. Jason Bourne Saga
  'col-oceans-trilogy':            10,   // 128. Ocean's Trilogy
  'col-x-men-through-2015':       10,   // 129. X-Men Saga — Through 2015
  'col-deadpool-trilogy':          9.5,  // 130. Deadpool Trilogy
  'col-matrix-trilogy':            10,   // 131. The Matrix Trilogy
  'col-john-wick':                 9,    // 132. John Wick Collection — Films 1–4
  'col-harry-potter':              10,   // 133. Harry Potter Saga — Films 1–8
  'col-spider-verse':              9,    // 134. Spider-Man: Spider-Verse
  'col-crisis-on-infinite-earths': 10,   // 135. Justice League: Crisis on Infinite Earths
  'col-guardians-of-the-galaxy':   10,   // 136. Guardians of the Galaxy Trilogy
  'col-knives-out':                10,   // 137. Knives Out Trilogy
  'col-mission-impossible':        9,    // 138. Mission: Impossible Collection
  'col-james-bond-daniel-craig':   9,    // 139. James Bond — Daniel Craig Collection
  'col-the-incredibles':           9,    // 140. The Incredibles Collection
  'col-adam-sandler':              9,    // 141. Adam Sandler Collection
  'col-kung-fu-panda':             9,    // 142. Kung Fu Panda Collection
  'col-rush-hour-2-3':             9,    // 144. Rush Hour 2 + Rush Hour 3
  'col-ghost-rider':               10,   // 145. Ghost Rider Collection
  'col-pirates-of-the-caribbean':  10,   // 146. Pirates of the Caribbean Collection
  'col-star-wars-original-trilogy': 10,  // 147. Star Wars Episodes IV–VI
  'col-star-wars-prequel-trilogy':  8.5  // 148. Star Wars Episodes I–III
};
