'use client';
import React, { useEffect, useRef } from 'react';
import { FOODS, CATEGORY_IMG } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { Icon } from '../ui/Icon';
import { StallCardWide } from '../home/StallCardWide';
import { Button } from '../ui/Button';
import { dist, minP, score, rs, fd, allStalls } from '../../lib/helpers';
import { CommunityScreen } from '../community/CommunityScreen';
import { ThreadDetail } from '../community/ThreadDetail';
import { FoodIcon } from '../ui/FoodIcon';
import { EmptyState } from '../ui/EmptyState';
import { ExploreStallFilters } from './ExploreStallFilters';
import { ExploreSubNav } from './ExploreSubNav';
import { ReelsGrid } from '../reels/ReelsGrid';
import { DesktopCanvas } from '../layout/DesktopLayout';
import { SearchX } from 'lucide-react';

function foodTerm(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  const f = FOODS.find(f => f[0].startsWith(q) || q.includes(f[0]));
  return f ? f[0] : null;
}

export function ExploreScreen() {
  const { state, dispatch } = useApp();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.tab !== 'explore' || !state.exploreSearchFocus || !searchRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) return;
    searchRef.current.focus();
    dispatch({ type: 'SET_EXPLORE_FOCUS', on: false });
  }, [state.tab, state.exploreSearchFocus, dispatch]);

  const SegMobile = () => (
    <div className="mb-2 flex gap-1 rounded-[14px] bg-soft p-1 lg:hidden">
      {(['stalls', 'community', 'reels'] as const).map(v => (
        <button
          key={v}
          type="button"
          onClick={() => {
            dispatch({ type: 'ESEG', v });
            if (v === 'reels') dispatch({ type: 'REEL_OPEN', idx: 0 });
            else dispatch({ type: 'REEL_CLOSE' });
          }}
          className={`min-w-0 flex-1 rounded-[11px] px-2 py-2.5 text-[12.5px] font-bold leading-tight ${state.estab === v ? 'bg-card text-ink shadow-card' : 'text-muted'}`}
        >
          {v === 'stalls' ? 'Stalls' : v === 'community' ? 'Community' : 'Reels'}
        </button>
      ))}
    </div>
  );

  if (state.estab === 'community') {
    return (
      <DesktopCanvas className="lg:pt-2">
        <h1 className="sr-only">Explore community</h1>
        <ExploreSubNav />
        <div className="sticky top-0 z-[6] bg-bg pb-2 pt-1 lg:hidden"><SegMobile /></div>
        {state.threadOpen ? <ThreadDetail id={state.threadOpen} /> : <CommunityScreen />}
      </DesktopCanvas>
    );
  }

  if (state.estab === 'reels') {
    return (
      <DesktopCanvas className="lg:pt-2">
        <h1 className="sr-only">Explore reels</h1>
        <ExploreSubNav />
        <div className="sticky top-0 z-[6] bg-bg pb-2 pt-1 lg:hidden"><SegMobile /></div>
        <p className="mb-4 hidden text-[14px] text-muted lg:block">Jaipur food clips — pick one to watch.</p>
        <ReelsGrid />
      </DesktopCanvas>
    );
  }

  const catalog = allStalls(state.extraStalls);
  const term = foodTerm(state.query);
  const matches = (s: typeof catalog[number]) => {
    const q = state.query.trim().toLowerCase();
    if (q) {
      const hay = (s.name + ' ' + s.area + ' ' + s.foods.join(' ') + ' ' + s.items.map(i => i.n).join(' ')).toLowerCase();
      if (!q.split(/\s+/).every(w => hay.includes(w))) return false;
    }
    if (state.filters.veg && !s.items.every(i => i.v)) return false;
    if (state.filters.open && !s.open) return false;
    if (state.filters.min && s.rating < state.filters.min) return false;
    if (state.filters.gem && !s.tags.includes('Hidden gem')) return false;
    return true;
  };
  const list = catalog.filter(matches).sort((a, b) => {
    const so = state.filters.sort;
    if (so === 'nearest') return dist(state.area, a) - dist(state.area, b);
    if (so === 'cheapest') return minP(a) - minP(b);
    if (so === 'rating') return b.rating - a.rating;
    return score(b) - score(a);
  });
  const canCompare = Boolean(term && list.length >= 2);
  const qLower = state.query.trim().toLowerCase();

  const foodPicker = (
    <div className="flex gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible">
      {FOODS.map(([name, iconKey, bg]) => {
        const active = qLower === name || qLower.startsWith(name);
        return (
          <button key={name} onClick={() => dispatch({ type: 'SET_QUERY', query: name })} className={`flex flex-none flex-col items-center gap-1.5 text-[12.5px] font-semibold ${active ? 'opacity-100' : ''}`}>
            <span style={{ background: bg, width: 48, height: 48 }} className={`grid place-items-center overflow-hidden rounded-full text-ink/80 lg:h-11 lg:w-11 ${active ? 'ring-2 ring-brand ring-offset-2' : ''}`}>
              {CATEGORY_IMG[name] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={CATEGORY_IMG[name]} alt="" className="h-full w-full object-cover" />
              ) : (
                <FoodIcon food={iconKey} size={22} strokeWidth={1.75} />
              )}
            </span>
            <span className="hidden lg:block">{name[0].toUpperCase() + name.slice(1)}</span>
          </button>
        );
      })}
    </div>
  );

  const stallResults = (compact: boolean) => !list.length ? (
    <EmptyState icon={SearchX} title={`No stall for "${state.query}" yet`} description="If you know one, add it. You'll be the reason someone finds it.">
      <Button variant="primary" onClick={() => dispatch({ type: 'SET_TAB', tab: 'add' })}>Add this food spot</Button>
    </EmptyState>
  ) : state.filters.view === 'compare' && canCompare ? (
    <div className="mb-3 overflow-hidden rounded-2xl bg-card shadow-card">
      <div className="grid grid-cols-[1.6fr_.8fr_.7fr_.7fr] gap-2 px-3.5 py-2.5 text-[12px] font-bold text-muted">
        <span>Stall</span><span>Price</span><span>Away</span><span>Rating</span>
      </div>
      {list.map(s => {
        const item = s.items.find(i => i.n.toLowerCase().includes(term!)) || s.items[0];
        return (
          <button key={s.id} onClick={() => dispatch({ type: 'SET_STALL', id: s.id })} className="grid w-full grid-cols-[1.6fr_.8fr_.7fr_.7fr] gap-2 border-t border-line px-3.5 py-3 text-left">
            <span><b>{s.name}</b><br /><span className="text-[12px] text-muted">{item.n}</span></span>
            <span><b>{rs(item.p)}</b></span>
            <span>{fd(dist(state.area, s))}</span>
            <span className="rounded-lg bg-green px-2 py-[1px] text-[12px] font-extrabold text-white">{s.rating.toFixed(1)}</span>
          </button>
        );
      })}
    </div>
  ) : (
    <>
      <p className="mobile-gutter-x pb-1.5 pt-0.5 text-[12px] text-muted lg:px-0 lg:pt-0">{list.length} {list.length === 1 ? 'stall' : 'stalls'}{term ? ` · ${term}` : ''}</p>
      <div className="stall-grid !px-0">
        {list.map(s => <StallCardWide key={s.id} stall={s} compact={compact} />)}
      </div>
    </>
  );

  const resultsDesktop = stallResults(false);
  const resultsMobile = stallResults(true);

  return (
    <DesktopCanvas className="lg:pt-2">
      <h1 className="sr-only">Explore stalls</h1>
      <ExploreSubNav />

      <div className="sticky top-0 z-[6] bg-bg lg:hidden">
        <div className="mobile-gutter-x bg-bg pb-1 pt-0.5"><SegMobile /></div>
        <div className="border-b border-line bg-card mobile-gutter-x py-2">
          <ExploreStallFilters variant="mobile" searchRef={searchRef} canCompare={canCompare} term={term} />
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto mobile-gutter-x pb-1.5 pt-2 [scrollbar-width:none] lg:hidden">
        {FOODS.map(([name, iconKey, bg]) => {
          const active = qLower === name || qLower.startsWith(name);
          return (
            <button key={name} onClick={() => dispatch({ type: 'SET_QUERY', query: name })} aria-label={name} className={`flex-none rounded-full p-0.5 ${active ? 'ring-2 ring-brand ring-offset-2 ring-offset-bg' : ''}`}>
              <span style={{ background: bg, width: 44, height: 44 }} className="grid place-items-center overflow-hidden rounded-full text-ink/80">
                {CATEGORY_IMG[name] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={CATEGORY_IMG[name]} alt="" className="h-full w-full object-cover" />
                ) : (
                  <FoodIcon food={iconKey} size={20} strokeWidth={1.75} />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hidden lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
        <aside className="desktop-filter-rail space-y-4">
          <div className="desktop-panel p-4">
            <ExploreStallFilters variant="desktop" canCompare={canCompare} term={term} />
          </div>
          <div className="desktop-panel p-4">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-wide text-muted">Craving</p>
            {foodPicker}
          </div>
        </aside>
        <div className="min-w-0">{resultsDesktop}</div>
      </div>

      <div className="lg:hidden">{resultsMobile}</div>
    </DesktopCanvas>
  );
}
