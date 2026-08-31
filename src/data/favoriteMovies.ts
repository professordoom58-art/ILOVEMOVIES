import type { PersonalEntryConfig } from '../types/movie';

export const FAVORITE_MEDIA: PersonalEntryConfig[] = [
  // ── Movies (1–123) ────────────────────────────────────────────────────────
  { kind: 'movie', tmdbId: 299536 }, // 1. Avengers: Infinity War (10)
  { kind: 'movie', tmdbId: 299534 }, // 2. Avengers: Endgame (9.5)
  { kind: 'movie', tmdbId: 18785 },  // 3. The Hangover (10)
  { kind: 'movie', tmdbId: 45243 },  // 4. The Hangover Part II (9)
  { kind: 'movie', tmdbId: 109439 }, // 5. The Hangover Part III (6)
  { kind: 'movie', tmdbId: 537921 }, // 6. Fixed (2025) (8)
  { kind: 'movie', tmdbId: 152601 }, // 7. Her (2013) (10)
  { kind: 'movie', tmdbId: 324849 }, // 8. The LEGO Batman Movie (10)
  { kind: 'movie', tmdbId: 76338 },  // 9. Thor: The Dark World (8)
  { kind: 'movie', tmdbId: 71469 },  // 10. The Darkest Hour (2011) (10)
  { kind: 'movie', tmdbId: 91314 },  // 11. Transformers: Age of Extinction (10)
  { kind: 'movie', tmdbId: 1422 },   // 12. The Departed (10)
  { kind: 'movie', tmdbId: 369972 }, // 13. First Man (8.5)
  { kind: 'movie', tmdbId: 64690 },  // 14. Drive (9)
  { kind: 'movie', tmdbId: 687163 }, // 15. Project Hail Mary (10)
  { kind: 'movie', tmdbId: 27581 },  // 16. The Other Guys (9)
  { kind: 'movie', tmdbId: 290250 }, // 17. The Nice Guys (9)
  { kind: 'movie', tmdbId: 335984 }, // 18. Blade Runner 2049 (9)
  { kind: 'movie', tmdbId: 746036 }, // 19. The Fall Guy (7.5)
  { kind: 'movie', tmdbId: 50646 },  // 20. Crazy, Stupid, Love. (8.5)
  { kind: 'movie', tmdbId: 43347 },  // 21. Love & Other Drugs (9)
  { kind: 'movie', tmdbId: 185 },    // 22. A Clockwork Orange (8.5)
  { kind: 'movie', tmdbId: 106646 }, // 23. The Wolf of Wall Street (10)
  { kind: 'movie', tmdbId: 27205 },  // 24. Inception (10)
  { kind: 'movie', tmdbId: 157336 }, // 25. Interstellar (8.5)
  { kind: 'movie', tmdbId: 1368337 }, // 26. The Odyssey (9)
  { kind: 'movie', tmdbId: 969681 }, // 27. Spider-Man: Brand New Day (10)
  { kind: 'movie', tmdbId: 1930 },   // 28. The Amazing Spider-Man (10)
  { kind: 'movie', tmdbId: 322 },    // 29. Mystic River (10)
  { kind: 'movie', tmdbId: 286217 }, // 30. The Martian (8.5)
  { kind: 'movie', tmdbId: 713704 }, // 31. Evil Dead Rise (8)
  { kind: 'movie', tmdbId: 263115 }, // 32. Logan (10)
  { kind: 'movie', tmdbId: 509967 }, // 33. 6 Underground (7.5)
  { kind: 'movie', tmdbId: 696806 }, // 34. The Adam Project (7)
  { kind: 'movie', tmdbId: 64688 },  // 35. 21 Jump Street (10)
  { kind: 'movie', tmdbId: 187017 }, // 36. 22 Jump Street (7)
  { kind: 'movie', tmdbId: 877817 }, // 37. Wolfs (8)
  { kind: 'movie', tmdbId: 718930 }, // 38. Bullet Train (10)
  { kind: 'movie', tmdbId: 72190 },  // 39. World War Z (9)
  { kind: 'movie', tmdbId: 273481 }, // 40. Sicario (7.5)
  { kind: 'movie', tmdbId: 146233 }, // 41. Prisoners (8.5)
  { kind: 'movie', tmdbId: 300681 }, // 42. Replicas (7)
  { kind: 'movie', tmdbId: 1813 },   // 43. The Devil's Advocate (10)
  { kind: 'movie', tmdbId: 949 },    // 44. Heat (7.5)
  { kind: 'movie', tmdbId: 62 },     // 45. 2001: A Space Odyssey (10)
  { kind: 'movie', tmdbId: 38 },     // 46. Eternal Sunshine of the Spotless Mind (10)
  { kind: 'movie', tmdbId: 37165 },  // 47. The Truman Show (9)
  { kind: 'movie', tmdbId: 3049 },   // 48. Ace Ventura: Pet Detective (9)
  { kind: 'movie', tmdbId: 854 },    // 49. The Mask (9)
  { kind: 'movie', tmdbId: 8467 },   // 50. Dumb and Dumber (8.5)
  { kind: 'movie', tmdbId: 10201 },  // 51. Yes Man (10)
  { kind: 'movie', tmdbId: 456750 }, // 52. Game Over, Man! (8)
  { kind: 'movie', tmdbId: 11324 },  // 53. Shutter Island (10)
  { kind: 'movie', tmdbId: 1949 },   // 54. Zodiac (10)
  { kind: 'movie', tmdbId: 210577 }, // 55. Gone Girl (9)
  { kind: 'movie', tmdbId: 550 },    // 56. Fight Club (9)
  { kind: 'movie', tmdbId: 65754 },  // 57. The Girl with the Dragon Tattoo (10)
  { kind: 'movie', tmdbId: 807 },    // 58. Se7en (9)
  { kind: 'movie', tmdbId: 2649 },   // 59. The Game (9)
  { kind: 'movie', tmdbId: 76493 },  // 60. The Dictator (10)
  { kind: 'movie', tmdbId: 496 },    // 61. Borat (8)
  { kind: 'movie', tmdbId: 8844 },   // 62. Jumanji (1995) (8.5)
  { kind: 'movie', tmdbId: 353486 }, // 63. Jumanji: Welcome to the Jungle (10)
  { kind: 'movie', tmdbId: 512200 }, // 64. Jumanji: The Next Level (8.5)
  { kind: 'movie', tmdbId: 512195 }, // 65. Red Notice (9)
  { kind: 'movie', tmdbId: 302699 }, // 66. Central Intelligence (9.5)
  { kind: 'movie', tmdbId: 72545 },  // 67. Journey 2: The Mysterious Island (8)
  { kind: 'movie', tmdbId: 436270 }, // 68. Black Adam (8.5)
  { kind: 'movie', tmdbId: 9654 },   // 69. The Italian Job (2003) (9)
  { kind: 'movie', tmdbId: 384018 }, // 70. Hobbs & Shaw (9)
  { kind: 'movie', tmdbId: 8850 },   // 71. Crank (9)
  { kind: 'movie', tmdbId: 27578 },  // 72. The Expendables (8)
  { kind: 'movie', tmdbId: 76163 },  // 73. The Expendables 2 (8)
  { kind: 'movie', tmdbId: 443635 }, // 74. Duvvada Jagannadham (DJ) (10)
  { kind: 'movie', tmdbId: 374954 }, // 75. Sarrainodu (9.5)
  { kind: 'movie', tmdbId: 215248 }, // 76. Yevadu (8.5)
  { kind: 'movie', tmdbId: 24049 },  // 77. Sivaji: The Boss (10)
  { kind: 'movie', tmdbId: 148284 }, // 78. Robot / Enthiran (2010) (10)
  { kind: 'movie', tmdbId: 41517 },  // 79. Ra.One (11)
  { kind: 'movie', tmdbId: 262227 }, // 80. Race Gurram (10)
  { kind: 'movie', tmdbId: 34763 },  // 81. Arya 2 (11)
  { kind: 'movie', tmdbId: 11423 },  // 82. Memories of Murder (10)
  { kind: 'movie', tmdbId: 629 },    // 83. The Usual Suspects (9)
  { kind: 'movie', tmdbId: 5236 },   // 84. Kiss Kiss Bang Bang (9)
  { kind: 'movie', tmdbId: 8363 },   // 85. Superbad (10)
  { kind: 'movie', tmdbId: 228967 }, // 86. The Interview (2014) (10)
  { kind: 'movie', tmdbId: 109414 }, // 87. This Is the End (10)
  { kind: 'movie', tmdbId: 141 },    // 88. Donnie Darko (9)
  { kind: 'movie', tmdbId: 242582 }, // 89. Nightcrawler (8.5)
  { kind: 'movie', tmdbId: 22538 },  // 90. Scott Pilgrim vs. the World (10)
  { kind: 'movie', tmdbId: 1903 },   // 91. Vanilla Sky (10)
  { kind: 'movie', tmdbId: 1538 },   // 92. Collateral (8.5)
  { kind: 'movie', tmdbId: 180 },    // 93. Minority Report (10)
  { kind: 'movie', tmdbId: 75612 },  // 94. Oblivion (9)
  { kind: 'movie', tmdbId: 75780 },  // 95. Jack Reacher (9.5)
  { kind: 'movie', tmdbId: 343611 }, // 96. Jack Reacher: Never Go Back (9)
  { kind: 'movie', tmdbId: 137113 }, // 97. Edge of Tomorrow (10)
  { kind: 'movie', tmdbId: 640 },    // 98. Catch Me If You Can (10)
  { kind: 'movie', tmdbId: 59967 },  // 99. Looper (8.5)
  { kind: 'movie', tmdbId: 79464 },  // 100. Rockstar (2011) (10)
  { kind: 'movie', tmdbId: 127501 }, // 101. Barfi! (9)
  { kind: 'movie', tmdbId: 21297 },  // 102. Wake Up Sid (8.5)
  { kind: 'movie', tmdbId: 24827 },  // 103. Ajab Prem Ki Ghazab Kahani (10)
  { kind: 'movie', tmdbId: 15864 },  // 104. Bachna Ae Haseeno (10)
  { kind: 'movie', tmdbId: 34764 },  // 105. Karthik Calling Karthik (10)
  { kind: 'movie', tmdbId: 61202 },  // 106. Zindagi Na Milegi Dobara (10)
  { kind: 'movie', tmdbId: 17501 },  // 107. Don (2006) (11)
  { kind: 'movie', tmdbId: 41109 },  // 108. Don 2 (11)
  { kind: 'movie', tmdbId: 15974 },  // 109. Bhootnath (10)
  { kind: 'movie', tmdbId: 496527 }, // 110. October (10)
  { kind: 'movie', tmdbId: 13183 },  // 111. Watchmen (2009) (8.5)
  { kind: 'movie', tmdbId: 284054 }, // 112. Black Panther (2018) (9)
  { kind: 'movie', tmdbId: 11918 },  // 113. Superhero Movie (8)
  { kind: 'movie', tmdbId: 4247 },   // 114. Scary Movie (7.5)
  { kind: 'movie', tmdbId: 1061474 }, // 115. Superman (2025) (9)
  { kind: 'movie', tmdbId: 1560520 }, // 116. Batman: Knightfall (2026) (10)
  { kind: 'movie', tmdbId: 408220 }, // 117. Justice League Dark (8.5)
  { kind: 'movie', tmdbId: 485942 }, // 118. Batman Ninja (8)
  { kind: 'movie', tmdbId: 76341 },  // 119. Mad Max: Fury Road (9)
  { kind: 'movie', tmdbId: 30061 },  // 120. Justice League: Crisis on Two Earths (9)
  { kind: 'movie', tmdbId: 188927 }, // 121. Star Trek Beyond (10)
  { kind: 'movie', tmdbId: 4141 },   // 122. Shoot 'Em Up (10)
  { kind: 'movie', tmdbId: 87421 },  // 123. Riddick (9)

  // ── Collections & Sagas (124–148) ─────────────────────────────────────────
  {
    kind: 'collection',
    id: 'col-transformers-1-3',
    title: 'TRANSFORMERS SAGA — 1–3',
    tag: 'SAGA',
    tmdbCollectionId: 8650,
    movieIds: [1858, 8373, 38356]
  }, // 124. Transformers Saga — Films 1–3 (9)
  {
    kind: 'collection',
    id: 'col-fast-furious-1-7',
    title: 'FAST & FURIOUS SAGA — 1–7',
    tag: 'SAGA',
    tmdbCollectionId: 9485,
    movieIds: [9799, 584, 9615, 13804, 51497, 82992, 168259],
    favoriteMovieIds: [9615]
  }, // 125. Fast & Furious Saga — Films 1–7 (9)
  {
    kind: 'collection',
    id: 'col-kill-bill',
    title: 'KILL BILL',
    tag: 'COLLECTION',
    tmdbCollectionId: 2883,
    movieIds: [24, 393]
  }, // 126. Kill Bill — Vol. 1 & 2 (8.5)
  {
    kind: 'collection',
    id: 'col-bourne-saga',
    title: 'JASON BOURNE SAGA',
    tag: 'SAGA',
    tmdbCollectionId: 31562,
    movieIds: [2501, 2502, 2503, 49040, 324668]
  }, // 127. Jason Bourne Saga (9)
  {
    kind: 'collection',
    id: 'col-oceans-trilogy',
    title: "OCEAN'S TRILOGY",
    tag: 'TRILOGY',
    tmdbCollectionId: 304,
    movieIds: [161, 163, 298]
  }, // 128. Ocean's Trilogy (10)
  {
    kind: 'collection',
    id: 'col-x-men-through-2015',
    title: 'X-MEN SAGA — THROUGH 2015',
    tag: 'SAGA',
    tmdbCollectionId: 748,
    movieIds: [36657, 36658, 36668, 49538, 127585]
  }, // 129. X-Men Saga — Through 2015 (10)
  {
    kind: 'collection',
    id: 'col-deadpool-trilogy',
    title: 'DEADPOOL TRILOGY',
    tag: 'TRILOGY',
    tmdbCollectionId: 448150,
    movieIds: [293660, 383498, 533535]
  }, // 130. Deadpool Trilogy (9.5)
  {
    kind: 'collection',
    id: 'col-matrix-trilogy',
    title: 'THE MATRIX TRILOGY',
    tag: 'TRILOGY',
    tmdbCollectionId: 2344,
    movieIds: [603, 604, 605]
  }, // 131. The Matrix Trilogy (10)
  {
    kind: 'collection',
    id: 'col-john-wick',
    title: 'JOHN WICK',
    tag: 'COLLECTION',
    tmdbCollectionId: 404609,
    movieIds: [245891, 324552, 458156, 603692]
  }, // 132. John Wick Collection — Films 1–4 (9)
  {
    kind: 'collection',
    id: 'col-harry-potter',
    title: 'HARRY POTTER SAGA',
    tag: 'SAGA',
    tmdbCollectionId: 1241,
    movieIds: [671, 672, 673, 674, 675, 767, 12444, 12445]
  }, // 133. Harry Potter Saga — Films 1–8 (10)
  {
    kind: 'collection',
    id: 'col-spider-verse',
    title: 'SPIDER-MAN: SPIDER-VERSE',
    tag: 'COLLECTION',
    tmdbCollectionId: 573436,
    movieIds: [324857, 569094]
  }, // 134. Spider-Man: Spider-Verse (9)
  {
    kind: 'collection',
    id: 'col-crisis-on-infinite-earths',
    title: 'JUSTICE LEAGUE: CRISIS ON INFINITE EARTHS',
    tag: 'TRILOGY',
    movieIds: [1155089, 1209288, 1209290],
    customPosterPath: '/mcRVsjMbhFstRK9z2oGRHiIvulr.jpg'
  }, // 135. Justice League: Crisis on Infinite Earths (10)
  {
    kind: 'collection',
    id: 'col-guardians-of-the-galaxy',
    title: 'GUARDIANS OF THE GALAXY TRILOGY',
    tag: 'TRILOGY',
    tmdbCollectionId: 284433,
    movieIds: [118340, 283995, 447365]
  }, // 136. Guardians of the Galaxy Trilogy (10)
  {
    kind: 'collection',
    id: 'col-knives-out',
    title: 'KNIVES OUT TRILOGY',
    tag: 'TRILOGY',
    tmdbCollectionId: 722971,
    movieIds: [546554, 661374, 1127110]
  }, // 137. Knives Out Trilogy (10)
  {
    kind: 'collection',
    id: 'col-mission-impossible',
    title: 'MISSION: IMPOSSIBLE COLLECTION',
    tag: 'COLLECTION',
    tmdbCollectionId: 87359,
    movieIds: [954, 955, 956, 57201, 177677, 353081, 575264]
  }, // 138. Mission: Impossible Collection (9)
  {
    kind: 'collection',
    id: 'col-james-bond-daniel-craig',
    title: 'JAMES BOND — DANIEL CRAIG COLLECTION',
    tag: 'COLLECTION',
    movieIds: [36557, 10764, 37724, 206647, 370172]
  }, // 139. James Bond — Daniel Craig Collection (9)
  {
    kind: 'collection',
    id: 'col-the-incredibles',
    title: 'THE INCREDIBLES COLLECTION',
    tag: 'COLLECTION',
    tmdbCollectionId: 468222,
    movieIds: [9806, 260513]
  }, // 140. The Incredibles Collection (9)
  {
    kind: 'collection',
    id: 'col-adam-sandler',
    title: 'ADAM SANDLER COLLECTION',
    tag: 'COLLECTION',
    movieIds: [11017, 9614, 9032, 11110, 9339, 38365, 522688]
  }, // 141. Adam Sandler Collection (9)
  {
    kind: 'collection',
    id: 'col-kung-fu-panda',
    title: 'KUNG FU PANDA COLLECTION',
    tag: 'COLLECTION',
    tmdbCollectionId: 77816,
    movieIds: [9502, 49444, 140300, 1011985]
  }, // 142. Kung Fu Panda Collection (9)
  { kind: 'movie', tmdbId: 2109 }, // 143. Rush Hour (1998) (10)
  {
    kind: 'collection',
    id: 'col-rush-hour-2-3',
    title: 'RUSH HOUR 2 & 3',
    tag: 'COLLECTION',
    movieIds: [5175, 5174]
  }, // 144. Rush Hour 2 + Rush Hour 3 (9)
  {
    kind: 'collection',
    id: 'col-ghost-rider',
    title: 'GHOST RIDER COLLECTION',
    tag: 'COLLECTION',
    tmdbCollectionId: 90306,
    movieIds: [1250, 71676]
  }, // 145. Ghost Rider Collection (10)
  {
    kind: 'collection',
    id: 'col-pirates-of-the-caribbean',
    title: 'PIRATES OF THE CARIBBEAN COLLECTION',
    tag: 'COLLECTION',
    tmdbCollectionId: 295,
    movieIds: [22, 58, 285, 1865, 166426]
  }, // 146. Pirates of the Caribbean Collection (10)
  {
    kind: 'collection',
    id: 'col-star-wars-original-trilogy',
    title: 'STAR WARS: EPISODES IV–VI',
    tag: 'TRILOGY',
    movieIds: [11, 1891, 1892]
  }, // 147. Star Wars Episodes IV–VI (10)
  {
    kind: 'collection',
    id: 'col-star-wars-prequel-trilogy',
    title: 'STAR WARS: EPISODES I–III',
    tag: 'TRILOGY',
    movieIds: [1893, 1894, 1895]
  }, // 148. Star Wars Episodes I–III (8.5)

  // ── TV Series (149–176) ───────────────────────────────────────────────────
  { kind: 'tv', tmdbId: 40008 }, // 149. Hannibal (10)
  { kind: 'tv', tmdbId: 78191 }, // 150. You (10)
  { kind: 'tv', tmdbId: 46648 }, // 151. True Detective (Season 1 only) (10)
  { kind: 'tv', tmdbId: 1429 },  // 152. Attack on Titan (10)
  { kind: 'tv', tmdbId: 31911 }, // 153. Fullmetal Alchemist: Brotherhood (10)
  { kind: 'tv', tmdbId: 61223 }, // 154. Akame ga Kill! (11)
  { kind: 'tv', tmdbId: 110492 }, // 155. Peacemaker (10)
  { kind: 'tv', tmdbId: 127532 }, // 156. SPY × FAMILY (9)
  { kind: 'tv', tmdbId: 114410 }, // 157. Chainsaw Man (10)
  { kind: 'tv', tmdbId: 13916 },  // 158. Death Note (10)
  { kind: 'tv', tmdbId: 85937 },  // 159. Demon Slayer (9)
  { kind: 'tv', tmdbId: 62104 },  // 160. The Seven Deadly Sins (8.5)
  { kind: 'tv', tmdbId: 95479 },  // 161. Jujutsu Kaisen (9)
  { kind: 'tv', tmdbId: 30991 },  // 162. Cowboy Bebop (10)
  { kind: 'tv', tmdbId: 42509 },  // 163. Steins;Gate (8.5)
  { kind: 'movie', tmdbId: 368006 }, // 164. 24 (2016) — South Indian/Tamil film (8)
  { kind: 'tv', tmdbId: 19885 },  // 165. Sherlock (2010) (9)
  { kind: 'tv', tmdbId: 92749 },  // 166. Moon Knight (9)
  { kind: 'tv', tmdbId: 61889 },  // 167. Daredevil (3 seasons) (9)
  { kind: 'tv', tmdbId: 67178 },  // 168. The Punisher (10)
  { kind: 'tv', tmdbId: 76479 },  // 169. The Boys (10)
  { kind: 'tv', tmdbId: 1421 },   // 170. Modern Family (9)
  { kind: 'tv', tmdbId: 1668 },   // 171. Friends (10)
  { kind: 'tv', tmdbId: 61222 },  // 172. BoJack Horseman (9)
  { kind: 'tv', tmdbId: 60625 },  // 173. Rick and Morty (9)
  { kind: 'tv', tmdbId: 59186 },  // 174. Impractical Jokers (10)
  { kind: 'tv', tmdbId: 2316 },   // 175. The Office (US) (9.5)
  { kind: 'tv', tmdbId: 1399 },   // 176. Game of Thrones (8.5)

  // ── Comedy Specials (177–179) ─────────────────────────────────────────────
  { kind: 'movie', tmdbId: 1215439 }, // 177. Dave Chappelle: The Dreamer (9)
  { kind: 'movie', tmdbId: 701687 },  // 178. Mark Normand: Out to Lunch (10)
  { kind: 'movie', tmdbId: 624932 }   // 179. Dave Chappelle: Sticks & Stones (UNRATED)
];

// Backward compatibility export
export const FAVORITE_MOVIES = FAVORITE_MEDIA;
