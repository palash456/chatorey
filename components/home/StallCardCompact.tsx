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
    <div className="relative w-[210px] flex-none snap-start lg:w-full lg:flex-auto lg:snap-align-none">
      <button
        type="button"
        onClick={() => dispatch({ type: 'SET_STALL', id: stall.id })}
        aria-label={`View ${stall.name}`}
        className="block w-full overflow-hidden rounded-xl bg-card text-left surface-card lg:rounded-2xl"
      >
        <Cover stall={stall} height={120} embedHeart={false} tag={stall.tags[0]} foot={<>From {rs(minP(stall))}</>} />
        <div className="px-2.5 pb-2.5 pt-2">
          <div className="flex items-center justify-between gap-2">
            <b className="truncate text-[14px] font-semibold leading-tight">{stall.name}</b>
            <span className="flex-none rounded-md bg-green px-1.5 py-px text-[11px] font-bold text-white">{stall.rating.toFixed(1)}</span>
          </div>
          <div className="mt-0.5 truncate text-[11px] text-muted">{stall.area} · {fd(dist(state.area, stall))}</div>
        </div>
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'TOGGLE_SAVE', id: stall.id })}
        aria-label={saved ? 'Remove from saved' : 'Save stall'}
        aria-pressed={saved}
        className={`absolute right-2 top-2 z-[2] grid h-9 w-9 place-items-center rounded-full bg-card/95 shadow-card lg:right-2.5 lg:top-2.5 lg:h-11 lg:w-11 ${saved ? 'text-brand' : 'text-ink'}`}
      >
        <Icon name="heart" size={16} className={saved ? 'fill-brand' : ''} />
      </button>
    </div>
  );
}
