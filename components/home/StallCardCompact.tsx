'use client';
import React from 'react';
import type { Stall } from '../../lib/types';
import { useApp } from '../../context/AppContext';
import { Cover } from '../ui/Cover';
import { Icon } from '../ui/Icon';
import { dist, fd, minP, rs } from '../../lib/helpers';

export function StallCardCompact({ stall }: { stall: Stall }) {
  const { state, dispatch } = useApp();
  const saved = state.saved.has(stall.id);
  return (
    <div className="relative w-[250px] flex-none snap-start lg:w-full lg:flex-auto lg:snap-align-none">
      <button
        type="button"
        onClick={() => dispatch({ type: 'SET_STALL', id: stall.id })}
        aria-label={`View ${stall.name}`}
        className="block w-full overflow-hidden rounded-2xl bg-card text-left shadow-card"
      >
        <Cover stall={stall} height={140} embedHeart={false} tag={stall.tags[0]} foot={<>From {rs(minP(stall))}</>} />
        <div className="px-3 pb-3 pt-2.5">
          <div className="flex items-center justify-between">
            <b className="text-[15px] leading-tight">{stall.name}</b>
            <span className="flex-none rounded-lg bg-green px-2 py-[1px] text-[13px] font-extrabold text-white">{stall.rating.toFixed(1)}</span>
          </div>
          <div className="mt-[3px] text-[12px] text-muted">{stall.area} · {fd(dist(state.area, stall))} · {stall.pct}% reorder</div>
        </div>
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_SAVE', id: stall.id })}
        aria-label={saved ? 'Remove from saved' : 'Save stall'}
        aria-pressed={saved}
        className={`absolute right-2.5 top-2.5 z-[2] grid h-11 w-11 place-items-center rounded-full bg-card/95 shadow-card ${saved ? 'text-brand' : 'text-ink'}`}
      >
        <Icon name="heart" size={18} className={saved ? 'fill-brand' : ''} />
      </button>
    </div>
  );
}
