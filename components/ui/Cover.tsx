import React from 'react';
import type { Stall } from '../../lib/types';
import { FoodArt } from './FoodArt';
import { Icon } from './Icon';

export function Cover({
  stall, height, heart, onHeart, saved, tag, foot, embedHeart = true, className = ''
}: {
  stall: Stall; height?: number; heart?: boolean; onHeart?: () => void; saved?: boolean; tag?: string; foot?: React.ReactNode; embedHeart?: boolean; className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`.trim()} style={{ background: `linear-gradient(135deg, ${stall.c[0]}, ${stall.c[1]})`, height }}>
      {stall.photos[0] ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={stall.photos[0]} alt={stall.name} className="absolute inset-0 h-full w-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-[70%] w-[70%]"><FoodArt stall={stall} /></div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent to-55%" />
      {heart && embedHeart && (
        <button
          onClick={e => { e.stopPropagation(); onHeart?.(); }}
          aria-label="Save stall" aria-pressed={saved}
          className={`absolute right-2.5 top-2.5 z-[2] grid h-[34px] w-[34px] place-items-center rounded-full bg-card/95 shadow-card ${saved ? 'text-brand' : 'text-ink'}`}
        >
          <Icon name="heart" size={18} className={saved ? 'fill-brand' : ''} />
        </button>
      )}
      {tag && <span className="absolute left-0 top-3 z-[2] rounded-r-md bg-brand px-2.5 py-1 text-[11px] font-extrabold text-white">{tag}</span>}
      {foot && <span className="absolute bottom-2.5 left-3 z-[2] text-[15px] font-extrabold text-white [text-shadow:0_1px_4px_rgba(0,0,0,.4)]">{foot}</span>}
    </div>
  );
}
