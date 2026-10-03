import { AREAS, PARTNERS, STALLS } from './data';
import type { Stall } from './types';
import { applyStallEdits, type StallEditsMap } from './stallEdits';

export const rs = (n: number) => '₹' + n;
export const esc = (s: string) => s; // React escapes text automatically; kept for parity/readability at call sites

export function dist(area: string, s: Stall) {
  const a = AREAS[area] || [0, 0];
  const b = AREAS[s.area] || [0, 0];
  return Math.max(.2, Math.round(Math.hypot(a[0] - b[0], a[1] - b[1]) * 125) / 100);
}
export const fd = (d: number) => (d < 1 ? Math.round(d * 1000 / 50) * 50 + ' m' : d.toFixed(1) + ' km');
export const minP = (s: Stall) => Math.min(...s.items.map(i => i.p));
export const score = (s: Stall) => (s.pct / 100) * Math.log10(s.n + 10) * s.rating;
export const partnerById = (id: string) => PARTNERS.find(p => p.id === id)!;
export function eta(area: string, partnerId: string, s: Stall) {
  const p = partnerById(partnerId);
  return s.prep + p.quote(dist(area, s)).eta;
}
export function ago(t: number) {
  const m = Math.round((Date.now() - t) / 6e4);
  if (m < 1) return 'just now';
  if (m < 60) return m + ' min ago';
  if (m < 1440) return Math.round(m / 60) + ' hr ago';
  return Math.round(m / 1440) + ' day ago';
}
export const clock = (t: number) => new Date(t).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
export const cut = (t: string, n: number) => (t.length > n ? t.slice(0, n).trim() + '…' : t);
export const shortName = (n: string) => n.replace(/\s*\(.*\)/, '');
export const timeAgo = (min: number) => (min < 60 ? min + 'm' : min < 1440 ? Math.round(min / 60) + 'h' : Math.round(min / 1440) + 'd');
export const money = (n: number) => '₹' + n.toLocaleString('en-IN');

export function findStall(extra: Stall[], id: string) {
  return extra.find(s => s.id === id) || STALLS.find(s => s.id === id);
}

export function allStalls(extra: Stall[] = []) {
  return [...STALLS, ...extra];
}

export function ST(id: string | null | undefined, extra: Stall[] = [], edits?: StallEditsMap) {
  if (!id) return undefined;
  const base = findStall(extra, id);
  if (!base) return undefined;
  return applyStallEdits(base, edits?.[id]);
}

export function deliveryFee(s: Stall, sub: number, area: string, partnerId: string) {
  const p = partnerById(partnerId);
  let fee = p.quote(dist(area, s)).fee;
  if (s.freeDeliveryPromo && sub >= 150) fee = 0;
  return fee;
}

export function mapsSearchUrl(stall: Stall) {
  const q = encodeURIComponent(`${stall.name}, ${stall.area}, Jaipur`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function telUrl(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '');
  return digits ? `tel:${digits}` : '';
}

// hash + seeded rng used for deterministic "analytics" demo numbers
export function hs(s: Stall) {
  let a = 7;
  for (const c of s.id) a = (a * 31 + c.charCodeAt(0)) % 9973;
  return a;
}
export function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

// Jaipur city center + rough area offsets, for Google Maps link parsing/building
const CITY: [number, number] = [26.9124, 75.7873];
export function llOf(s: Stall): [number, number] {
  const a = AREAS[s.area] || [0, 0];
  const j = (hs(s) % 40 - 20) / 4000;
  return [+(CITY[0] + a[1] / 111 + j).toFixed(5), +(CITY[1] + a[0] / 99.3 - j).toFixed(5)];
}
export function nearestArea(lat: number, lng: number) {
  const y = (lat - CITY[0]) * 111, x = (lng - CITY[1]) * 99.3;
  let best: string | null = null, bd = 1e9;
  for (const k in AREAS) {
    const d = Math.hypot(AREAS[k][0] - x, AREAS[k][1] - y);
    if (d < bd) { bd = d; best = k; }
  }
  return { area: best, km: bd };
}
export const mapsView = (s: Stall) => 'https://www.google.com/maps/search/?api=1&query=' + llOf(s).join(',');
export const mapsDir = (s: Stall) => 'https://www.google.com/maps/dir/?api=1&destination=' + llOf(s).join(',');
export function parseMaps(t: string): [number, number] | null {
  let s = t || '';
  try { s = decodeURIComponent(s); } catch {}
  const m =
    s.match(/@(-?\d{1,2}\.\d+),(-?\d{1,3}\.\d+)/) ||
    s.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) ||
    s.match(/[?&](?:q|query|ll|destination|center)=(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)/) ||
    s.match(/^\s*(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)\s*$/);
  return m ? [+m[1], +m[2]] : null;
}
