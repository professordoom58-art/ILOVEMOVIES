import type { WatchLink } from '../types/movie';

export const DEFAULT_WATCH_LINKS: WatchLink[] = [
  {
    id: 'fmhy-default',
    name: 'FMHY.NET',
    url: 'https://fmhy.net/',
    type: 'primary',
    badgeText: 'Freemediahekm',
    isVerified: true
  }
];

/**
 * Custom Watch Links by TMDB ID
 * Add second or custom links for any specific movie here:
 */
export const CUSTOM_WATCH_LINKS: Record<number, WatchLink[]> = {
  299536: [
    {
      id: 'fmhy-299536',
      name: 'FMHY.NET',
      url: 'https://fmhy.net/',
      type: 'primary',
      badgeText: 'Freemediahekm',
      isVerified: true
    }
  ],
  299534: [
    {
      id: 'fmhy-299534',
      name: 'FMHY.NET',
      url: 'https://fmhy.net/',
      type: 'primary',
      badgeText: 'Freemediahekm',
      isVerified: true
    }
  ],
  18785: [
    {
      id: 'fmhy-18785',
      name: 'FMHY.NET',
      url: 'https://fmhy.net/',
      type: 'primary',
      badgeText: 'Freemediahekm',
      isVerified: true
    }
  ],
  45243: [
    {
      id: 'fmhy-45243',
      name: 'FMHY.NET',
      url: 'https://fmhy.net/',
      type: 'primary',
      badgeText: 'Freemediahekm',
      isVerified: true
    }
  ],
  109439: [
    {
      id: 'fmhy-109439',
      name: 'FMHY.NET',
      url: 'https://fmhy.net/',
      type: 'primary',
      badgeText: 'Freemediahekm',
      isVerified: true
    }
  ]
};

export function getWatchLinksForMovie(tmdbId: number): WatchLink[] {
  if (CUSTOM_WATCH_LINKS[tmdbId] && CUSTOM_WATCH_LINKS[tmdbId].length > 0) {
    return CUSTOM_WATCH_LINKS[tmdbId];
  }
  return DEFAULT_WATCH_LINKS;
}
