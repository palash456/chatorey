import React from 'react';
const PATHS: Record<string, string> = {
  home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  search: '', // special-cased (circle+line)
  plus: 'M12 5v14M5 12h14',
  bag: 'M5 8h14l-1 12H6z M9 8a3 3 0 0 1 6 0',
  user: '', // special-cased (circle+path)
  pin: '', // special-cased
  heart: 'M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z',
  back: 'M15 5l-7 7 7 7',
  fwd: 'M9 5l7 7-7 7',
  close: 'M6 6l12 12M18 6L6 18',
  list: 'M5 6h14M5 12h14M5 18h14',
  down: 'M6 9l6 6 6-6',
  sun: 'M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z',
  share: 'M8.6 10.5l6.8-4M8.6 13.5l6.8 4'
};
export function Icon({ name, size = 22, className = '' }: { name: string; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className, 'aria-hidden': true };
  if (name === 'search') return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>;
  if (name === 'user') return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></svg>;
  if (name === 'pin') return <svg {...common}><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  if (name === 'sun') return <svg {...common}><circle cx="12" cy="12" r="4" /><path d={PATHS.sun} /></svg>;
  return <svg {...common}><path d={PATHS[name] || ''} /></svg>;
}
