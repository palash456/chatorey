/** Prototype / founder-demo helpers (client-only). */

export const DEMO_WELCOME_KEY = 'chatorey:welcome_v1';
export const DEMO_BANNER_KEY = 'chatorey:banner_dismissed';

export function isDemoControlsEnabled() {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_DEMO_CONTROLS === 'false') return false;
  return true;
}

export function isPrototypeBuild() {
  return process.env.NEXT_PUBLIC_PROTOTYPE !== 'false';
}

export function loadDemoFlag(key: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

export function saveDemoFlag(key: string, on = true) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, on ? '1' : '0');
  } catch { /* ignore */ }
}

export function clearDemoPrefs() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(DEMO_WELCOME_KEY);
    localStorage.removeItem(DEMO_BANNER_KEY);
  } catch { /* ignore */ }
}
