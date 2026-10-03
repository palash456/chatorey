'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Icon } from '../ui/Icon';

type Props = {
  variant: 'mobile' | 'desktop';
  searchRef?: React.RefObject<HTMLInputElement | null>;
  canCompare?: boolean;
  term?: string | null;
};

export function ExploreStallFilters({ variant, searchRef, canCompare, term }: Props) {
  const { state, dispatch } = useApp();
  const isDesktop = variant === 'desktop';

  const filterButtons = [
    ['open', 'Open now', state.filters.open, () => dispatch({ type: 'SET_FILTERS', filters: { open: !state.filters.open } })],
    ['min', 'Rating 4.5+', !!state.filters.min, () => dispatch({ type: 'SET_FILTERS', filters: { min: state.filters.min ? 0 : 4.5 } })],
    ['veg', 'Pure veg', state.filters.veg, () => dispatch({ type: 'SET_FILTERS', filters: { veg: !state.filters.veg } })],
    ['gem', 'Hidden gems', state.filters.gem, () => dispatch({ type: 'SET_FILTERS', filters: { gem: !state.filters.gem } })]
  ] as const;

  return (
    <div className={isDesktop ? 'space-y-4' : ''}>
      {!isDesktop && (
        <div className="flex items-center gap-2.5 rounded-2xl bg-soft px-3.5 text-muted">
          <Icon name="search" size={20} />
          <input
            ref={searchRef}
            value={state.query}
            onChange={e => dispatch({ type: 'SET_QUERY', query: e.target.value })}
            type="search"
            placeholder="Search dishes, stalls, areas"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-3.5 outline-none"
          />
        </div>
      )}

      <div className={isDesktop ? 'space-y-2' : ''}>
        {isDesktop && <p className="text-[12px] font-bold uppercase tracking-wide text-muted">Sort</p>}
        <label htmlFor={isDesktop ? 'explore-sort-desktop' : 'explore-sort'} className="sr-only">Sort stalls</label>
        <select
          id={isDesktop ? 'explore-sort-desktop' : 'explore-sort'}
          value={state.filters.sort}
          onChange={e => dispatch({ type: 'SET_FILTERS', filters: { sort: e.target.value as typeof state.filters.sort } })}
          className={`w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-[13px] font-semibold ${isDesktop ? '' : 'min-h-[44px] flex-none rounded-full'}`}
        >
          <option value="recommended">Most recommended</option>
          <option value="nearest">Nearest</option>
          <option value="cheapest">Cheapest</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className={isDesktop ? 'space-y-2' : ''}>
        {isDesktop && <p className="text-[12px] font-bold uppercase tracking-wide text-muted">Filters</p>}
        <div className={isDesktop ? 'flex flex-col gap-2' : 'flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none]'}>
          {filterButtons.map(([k, label, on, fn]) => (
            <button
              type="button"
              key={k}
              onClick={fn}
              aria-pressed={on}
              className={
                isDesktop
                  ? `flex min-h-[44px] w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-[13px] font-semibold ${on ? 'border-brand bg-brand-soft text-brand' : 'border-line bg-card'}`
                  : `min-h-[44px] flex-none rounded-full border px-3.5 py-2 text-[13px] font-semibold ${on ? 'border-brand bg-brand-soft text-brand' : 'border-line bg-card'}`
              }
            >
              {label}
              {isDesktop && on ? <span className="text-[11px] font-bold">On</span> : null}
            </button>
          ))}
        </div>
      </div>

      {canCompare && term && (
        <div className={isDesktop ? 'space-y-2' : 'mb-2.5 flex gap-1 rounded-[14px] bg-soft p-1'}>
          {isDesktop && <p className="text-[12px] font-bold uppercase tracking-wide text-muted">View</p>}
          <div className={isDesktop ? 'flex flex-col gap-1.5' : 'flex flex-1 gap-1'}>
            {(['list', 'compare'] as const).map(v => (
              <button
                key={v}
                type="button"
                onClick={() => dispatch({ type: 'SET_FILTERS', filters: { view: v } })}
                className={
                  isDesktop
                    ? `rounded-xl px-3 py-2.5 text-left text-[13px] font-bold ${state.filters.view === v ? 'bg-brand-soft text-brand' : 'bg-soft text-muted'}`
                    : `flex-1 rounded-[11px] px-2 py-2 text-[12.5px] font-bold ${state.filters.view === v ? 'bg-card text-ink shadow-card' : 'text-muted'}`
                }
              >
                {v === 'list' ? 'List' : `Compare ${term}`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
