'use client';
import React from 'react';
import type { Stall } from '../../lib/types';
import { ST } from '../../lib/helpers';
import type { StallEditsMap } from '../../lib/stallEdits';
import { FoodArt } from './FoodArt';
import { FoodIcon } from './FoodIcon';

/** Full-bleed story/reel hero: photo, FoodArt, or category icon on gradient */
export function MediaFoodHero({
  stallId,
  extraStalls,
  stallEdits,
  fallbackFood,
  colors,
  variant = 'story',
}: {
  stallId?: string;
  extraStalls: Stall[];
  stallEdits?: StallEditsMap;
  fallbackFood: string;
  colors: [string, string];
  variant?: 'story' | 'reel';
}) {
  const stall = stallId ? ST(stallId, extraStalls, stallEdits) : null;
  const iconSize = variant === 'reel' ? 72 : 64;

  if (stall?.photos[0]) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={stall.photos[0]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
    );
  }

  if (stall) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="aspect-square w-[min(72%,280px)] drop-shadow-[0_12px_28px_rgba(0,0,0,.35)]">
          <FoodArt stall={stall} />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 grid place-items-center" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
      <div className="grid h-28 w-28 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm">
        <FoodIcon food={fallbackFood} size={iconSize} className="text-white" strokeWidth={1.75} />
      </div>
    </div>
  );
}
