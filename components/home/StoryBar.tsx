'use client';
import React from 'react';
import { STORIES, USERS } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';

export function StoryBar() {
  const { state, dispatch } = useApp();
  return (
    <div className="flex gap-3 overflow-x-auto mobile-gutter-x pb-0.5 pt-3 lg:gap-3.5 lg:px-0 lg:pt-0 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
      {STORIES.map((g, i) => {
        const seen = state.seenStories.has(g.uid);
        const u = USERS[g.uid];
        return (
          <button key={g.uid} type="button" onClick={() => dispatch({ type: 'STORY_OPEN', i })} className="flex flex-none flex-col items-center gap-1.5">
            <span className={`h-[52px] w-[52px] rounded-full p-[2px] lg:h-[58px] lg:w-[58px] lg:p-[2.5px] ${seen ? 'bg-line' : 'bg-[conic-gradient(from_0deg,#D81E5B,#F9A825,#8E24AA,#D81E5B)]'}`}>
              <span className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-card">
                <Avatar uid={g.uid} size={52} />
              </span>
            </span>
            <span className="max-w-[60px] truncate text-[11px] font-semibold text-ink">{u.n.split(' ')[0]}</span>
          </button>
        );
      })}
    </div>
  );
}
