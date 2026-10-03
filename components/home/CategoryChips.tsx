'use client';
import React from 'react';
import { FOODS, CATEGORY_IMG } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { FoodIcon } from '../ui/FoodIcon';

export function CategoryChips({ size = 66, active }: { size?: number; active?: string }) {
  const { dispatch } = useApp();
  return (
    <div className="category-grid page-container lg:px-0 [-webkit-overflow-scrolling:touch]">
      {FOODS.map(([name, iconKey, bg]) => (
        <button
          key={name}
          onClick={() => {
            dispatch({ type: 'SET_QUERY', query: name });
            dispatch({ type: 'OPEN_EXPLORE_SEARCH' });
          }}
          className={`flex flex-none flex-col items-center gap-1.5 text-[12.5px] font-semibold text-ink ${active === name ? 'opacity-100' : 'opacity-80'}`}
        >
          <span
            style={{ background: bg, width: size, height: size }}
            className={`grid place-items-center overflow-hidden rounded-full text-ink/80 ${active === name ? 'ring-2 ring-brand ring-offset-2 ring-offset-bg' : ''}`}
          >
            {CATEGORY_IMG[name] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={CATEGORY_IMG[name]} alt="" className="h-full w-full object-cover" />
            ) : (
              <FoodIcon food={iconKey} size={size * 0.38} strokeWidth={1.75} />
            )}
          </span>
          {name[0].toUpperCase() + name.slice(1)}
        </button>
      ))}
    </div>
  );
}
