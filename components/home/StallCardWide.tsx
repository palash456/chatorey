'use client';
import React from 'react';
import type { Stall } from '../../lib/types';
import { useApp } from '../../context/AppContext';
import { Cover } from '../ui/Cover';
import { Pill } from '../ui/Pill';
import { Icon } from '../ui/Icon';
import { dist, fd, minP, eta, rs, shortName, cut } from '../../lib/helpers';

export function StallCardWide({ stall }: { stall: Stall }) {
  const { state, dispatch } = useApp();
  const saved = state.saved.has(stall.id);
  const r = stall.reviews[0];
  return (
    <div className="relative mb-0 w-full">
      <button
        type="button"
        onClick={() => dispatch({ type: 'SET_STALL', id: stall.id })}
        aria-label={`View ${stall.name}, ${stall.rating.toFixed(1)} stars, ${stall.area}`}
        className="block w-full overflow-hidden rounded-2xl bg-card text-left shadow-card"
      >
        <Cover
          stall={stall} height={164} embedHeart={false}
          tag={stall.tags[0]} foot={<>Items from {rs(minP(stall))}</>}
        />
        <div className="flex flex-col gap-0.5 px-3.5 pb-3.5 pt-2.5">
          <div className="flex items-start justify-between">
            <b className="text-[15.5px] leading-tight">{stall.name}</b>
            <span className="flex-none rounded-lg bg-green px-2 py-[1px] text-[13px] font-extrabold text-white">{stall.rating.toFixed(1)} ★</span>
          </div>
          <div className="mt-0.5 text-[13px] text-muted">{stall.items.slice(0, 3).map(i => shortName(i.n)).join(' · ')}</div>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
            <span>{fd(dist(state.area, stall))}</span>
            <span>· {stall.area}</span>
            <span>· {eta(state.area, state.partner, stall)} min</span>
            {!stall.open && <Pill tone="amber">Closed now</Pill>}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[13px]">
            <Pill tone="green">{stall.pct}% would reorder</Pill>
            <span className="text-muted">{stall.n} reviews</span>
          </div>
          {r && (
            <div className="mt-2.5 flex gap-2 border-t border-dashed border-line pt-2.5 text-[13px]">
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
        className={`absolute right-2.5 top-2.5 z-[2] grid h-11 w-11 place-items-center rounded-full bg-card/95 shadow-card sm:right-3 ${saved ? 'text-brand' : 'text-ink'}`}
      >
        <Icon name="heart" size={18} className={saved ? 'fill-brand' : ''} />
      </button>
    </div>
  );
}
