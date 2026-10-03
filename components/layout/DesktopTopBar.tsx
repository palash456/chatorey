'use client';
import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Icon } from '../ui/Icon';
import { desktopPageTitle } from '../../lib/desktopPageMeta';

export function DesktopTopBar() {
  const { state, dispatch } = useApp();
  const searchRef = useRef<HTMLInputElement>(null);
  const meta = desktopPageTitle(state);

  useEffect(() => {
    if (!state.exploreSearchFocus || !searchRef.current) return;
    searchRef.current.focus();
    dispatch({ type: 'SET_EXPLORE_FOCUS', on: false });
  }, [state.exploreSearchFocus, dispatch]);

  const cycleTheme = () => {
    const next = state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'auto' : 'light';
    dispatch({ type: 'SET_THEME', theme: next });
  };

  const goExplore = () => {
    if (state.tab !== 'explore') dispatch({ type: 'SET_TAB', tab: 'explore' });
  };

  return (
    <header className="desktop-toolbar">
      <div className="desktop-toolbar-inner">
      <div className="min-w-[200px] max-w-[280px] flex-none">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Jaipur</p>
        <h2 className="truncate text-[18px] font-extrabold leading-tight text-ink">{meta.title}</h2>
        {meta.subtitle ? <p className="truncate text-[12px] text-muted">{meta.subtitle}</p> : null}
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'area' } })}
          className="flex flex-none items-center gap-2 rounded-xl border border-line bg-soft px-3 py-2 text-left hover:bg-line/50"
        >
          <Icon name="pin" size={18} className="text-brand" />
          <span className="max-w-[120px] truncate text-[13px] font-bold">{state.area}</span>
          <Icon name="down" size={14} className="text-muted" />
        </button>

        <label className="sr-only" htmlFor="global-search">Search stalls and dishes</label>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-line bg-bg px-3">
          <Icon name="search" size={18} className="text-muted" />
          <input
            id="global-search"
            ref={searchRef}
            type="search"
            value={state.query}
            autoComplete="off"
            placeholder="Dishes, stalls, neighbourhoods…"
            onFocus={goExplore}
            onChange={e => {
              dispatch({ type: 'SET_QUERY', query: e.target.value });
              goExplore();
            }}
            className="min-w-0 flex-1 bg-transparent py-2 text-[14px] font-semibold text-ink outline-none placeholder:text-muted"
          />
        </div>
      </div>

      <div className="flex flex-none items-center gap-2">
        <button
          type="button"
          onClick={cycleTheme}
          aria-label={`Theme: ${state.theme}`}
          className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-card hover:bg-soft"
        >
          <Icon name={state.theme === 'dark' ? 'sun' : 'moon'} size={18} />
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'profile' })}
          aria-label="Profile"
          className="grid h-10 w-10 place-items-center rounded-xl bg-brand font-extrabold text-white"
        >
          A
        </button>
      </div>
      </div>
    </header>
  );
}
