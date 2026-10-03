'use client';
import { useEffect, useState } from 'react';

/** Matches Tailwind `lg` — stable `false` on server/first paint to avoid hydration drift. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [query]);
  return matches;
}

export function useIsLgUp() {
  return useMediaQuery('(min-width: 1024px)');
}
