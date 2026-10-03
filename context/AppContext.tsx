'use client';
import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { reducer, initialState, AppState, Action } from './reducer';
import { loadPersisted, savePersisted, sliceForPersist } from '../lib/persist';

type Ctx = { state: AppState; dispatch: React.Dispatch<Action>; isDark: boolean };
export const AppCtx = createContext<Ctx | null>(null);

const STAGE_DELAYS = [5000, 6000, 7000, 4000, 7000, 9000];

function initState(): AppState {
  return initialState();
}

function applyTheme(theme: AppState['theme']) {
  const isDark =
    theme === 'dark' ||
    (theme === 'auto' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const [prefersDark, setPrefersDark] = React.useState(false);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const hydratedUrl = useRef(false);
  const persistReady = useRef(false);

  useEffect(() => {
    const saved = loadPersisted();
    if (saved) dispatch({ type: 'HYDRATE', saved });
    persistReady.current = true;
  }, []);
  const isDark = state.theme === 'dark' || (state.theme === 'auto' && prefersDark);

  useEffect(() => {
    state.orders.forEach(o => {
      if (o.cancelled || o.status >= 6) return;
      const canAuto = o.status >= 3 || o.auto;
      if (!canAuto) return;
      if (timers.current[o.id + ':' + o.status]) return;
      const delay = STAGE_DELAYS[o.status] ?? 6000;
      timers.current[o.id + ':' + o.status] = setTimeout(() => {
        dispatch({ type: 'ADVANCE_ORDER', id: o.id });
      }, delay);
    });
    return () => {
      Object.values(timers.current).forEach(clearTimeout);
      timers.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.orders.map(o => o.id + ':' + o.status + ':' + o.cancelled).join(',')]);

  useEffect(() => {
    if (!state.toast) return;
    const t = setTimeout(() => dispatch({ type: 'TOAST', msg: null }), 2600);
    return () => clearTimeout(t);
  }, [state.toast]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      setPrefersDark(mq.matches);
      applyTheme(state.theme);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [state.theme]);

  useEffect(() => {
    if (!persistReady.current) return;
    const t = setTimeout(() => savePersisted(sliceForPersist(state)), 350);
    return () => clearTimeout(t);
  }, [state]);

  // Deep link: ?stall=s1&tab=explore
  useEffect(() => {
    if (hydratedUrl.current) return;
    hydratedUrl.current = true;
    const params = new URLSearchParams(window.location.search);
    const stall = params.get('stall');
    const tab = params.get('tab');
    if (tab === 'home' || tab === 'explore' || tab === 'add' || tab === 'orders' || tab === 'profile') {
      dispatch({ type: 'SET_TAB', tab });
    }
    if (stall) dispatch({ type: 'SET_STALL', id: stall });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (state.stallId) params.set('stall', state.stallId);
    else params.delete('stall');
    const qs = params.toString();
    const next = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, '', next);
  }, [state.stallId]);

  return <AppCtx.Provider value={{ state, dispatch, isDark }}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
