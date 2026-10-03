'use client';
import React from 'react';
import type { Stall } from '../../lib/types';
import { useApp } from '../../context/AppContext';
import { Cover } from '../ui/Cover';
import { Pill } from '../ui/Pill';
import { Icon } from '../ui/Icon';
import { dist, fd, minP, eta, rs, shortName, cut } from '../../lib/helpers';

export function StallCardWide({ stall, compact = false }: { stall: Stall; compact?: boolean }) {
  const { state, dispatch } = useApp();
  const saved = state.saved.has(stall.id);
  const r = stall.reviews[0];
  const coverH = compact ? undefined : 164;
  const coverClass = compact ? 'h-[128px] lg:h-[164px]' : '';
  return (
    <div className="relative mb-0 w-full">
      <button
        type="button"
        onClick={() => dispatch({ type: 'SET_STALL', id: stall.id })}
        aria-label={`View ${stall.name}, ${stall.rating.toFixed(1)} stars, ${stall.area}`}
        className="block w-full overflow-hidden rounded-xl bg-card text-left surface-card lg:rounded-2xl"
      >
        <Cover
          stall={stall} height={coverH} className={coverClass} embedHeart={false}
          tag={stall.tags[0]} foot={<>From {rs(minP(stall))}</>}
        />
        <div className="flex flex-col gap-0.5 px-3 pb-3 pt-2 lg:px-3.5 lg:pb-3.5 lg:pt-2.5">
          <div className="flex items-start justify-between gap-2">
            <b className="text-[14px] font-semibold leading-tight lg:text-[15.5px]">{stall.name}</b>
            <span className="flex-none rounded-md bg-green px-1.5 py-px text-[11px] font-bold text-white lg:rounded-lg lg:px-2 lg:text-[13px]">{stall.rating.toFixed(1)}</span>
          </div>
          <div className={`mt-0.5 text-[13px] text-muted ${compact ? 'hidden lg:block' : ''}`}>{stall.items.slice(0, 3).map(i => shortName(i.n)).join(' · ')}</div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] text-muted lg:text-[13px]">
            <span>{fd(dist(state.area, stall))}</span>
            <span>· {stall.area}</span>
            <span className={compact ? 'hidden lg:inline' : ''}>· {eta(state.area, state.partner, stall)} min</span>
            {!stall.open && <Pill tone="amber">Closed</Pill>}
          </div>
          <div className={`mt-1 items-center gap-1.5 text-[13px] ${compact ? 'hidden lg:flex' : 'flex'}`}>
            <Pill tone="green">{stall.pct}% would reorder</Pill>
            <span className="text-muted">{stall.n} reviews</span>
          </div>
          {r && (
            <div className={`mt-2.5 gap-2 border-t border-dashed border-line pt-2.5 text-[13px] ${compact ? 'hidden lg:flex' : 'flex'}`}>
              <span className="grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-brand-soft text-[11px] font-extrabold text-brand">{r.who[0]}</span>
              <span className="text-muted">“{cut(r.text, 78)}”</span>
            </div>
          )}
        </div>
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_SAVE', id: stall.id })}
        aria-label={saved ? 'Remove from saved' : 'Save stall'}
        aria-pressed={saved}
        className={`absolute right-2 top-2 z-[2] grid h-9 w-9 place-items-center rounded-full bg-card/95 shadow-card sm:right-3 lg:h-11 lg:w-11 lg:right-2.5 lg:top-2.5 ${saved ? 'text-brand' : 'text-ink'}`}
      >
        <Icon name="heart" size={16} className={saved ? 'fill-brand' : ''} />
      </button>
    </div>
  );
}
