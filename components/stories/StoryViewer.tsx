'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { STORIES, USERS } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { Icon } from '../ui/Icon';
import { Avatar } from '../ui/Avatar';
import { useDialogA11y } from '../ui/useDialogA11y';
import { MediaFoodHero } from '../ui/MediaFoodHero';
import { ST } from '../../lib/helpers';

export function StoryViewer() {
  const { state, dispatch } = useApp();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const onClose = useCallback(() => dispatch({ type: 'STORY_CLOSE' }), [dispatch]);
  const panelRef = useDialogA11y(state.storyOpen, onClose);

  const g = STORIES[state.storyIdx];
  const sl = g?.slides[state.storySlide];

  useEffect(() => {
    if (!state.storyOpen) return;
    if (!g || !sl) dispatch({ type: 'STORY_CLOSE' });
  }, [state.storyOpen, g, sl, dispatch]);

  useEffect(() => {
    if (!state.storyOpen || !g || !sl) return;
    dispatch({ type: 'HEARD_STORY', uid: g.uid });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (state.storySlide < g.slides.length - 1) dispatch({ type: 'STORY_NEXT' });
      else if (state.storyIdx < STORIES.length - 1) dispatch({ type: 'STORY_OPEN', i: state.storyIdx + 1 });
      else dispatch({ type: 'STORY_CLOSE' });
    }, 4300);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.storyOpen, state.storyIdx, state.storySlide]);

  if (!state.storyOpen || !g || !sl) return null;
  const u = USERS[g.uid];
  const stall = sl.sid ? ST(sl.sid, state.extraStalls, state.stallEdits) : null;
  const fallbackFood = stall?.foods[0] || 'snacks';

  const prev = () => {
    if (state.storySlide > 0) dispatch({ type: 'STORY_PREV' });
    else if (state.storyIdx > 0) dispatch({ type: 'STORY_OPEN', i: state.storyIdx - 1 });
  };
  const next = () => {
    if (state.storySlide < g.slides.length - 1) dispatch({ type: 'STORY_NEXT' });
    else if (state.storyIdx < STORIES.length - 1) dispatch({ type: 'STORY_OPEN', i: state.storyIdx + 1 });
    else dispatch({ type: 'STORY_CLOSE' });
  };

  return (
    <div ref={panelRef} role="dialog" aria-modal="true" aria-label={`Story from ${u.n}`} tabIndex={-1} className="absolute inset-0 z-[55] flex flex-col overflow-hidden bg-black lg:inset-y-4 lg:left-1/2 lg:w-full lg:max-w-md lg:-translate-x-1/2 lg:rounded-2xl lg:border lg:border-white/15 lg:shadow-2xl">
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onClose(); }}
        aria-label="Close stories"
        className="absolute right-3 top-3 z-[10] touch-target grid place-items-center rounded-full bg-white/20 text-white"
      >
        <Icon name="close" />
      </button>
      <div className="relative z-[2] flex shrink-0 gap-1 px-2.5 pt-2.5" aria-hidden="true">
        {g.slides.map((_, i) => (
          <i key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
            <b className={`block h-full bg-white transition-[width] motion-reduce:transition-none ${i < state.storySlide ? 'w-full' : i === state.storySlide ? 'w-full duration-[4200ms] ease-linear' : 'w-0'}`} />
          </i>
        ))}
      </div>
      <div className="relative z-[2] flex shrink-0 items-center gap-2.5 px-3.5 py-2.5 pr-14 text-white">
        <Avatar uid={g.uid} size={32} decorative />
        <div><b>{u.n}</b><div className="text-[12px] opacity-75">{sl.when} ago</div></div>
      </div>
      <div className="relative z-[1] min-h-0 flex-1 overflow-hidden bg-black">
        <MediaFoodHero stallId={sl.sid} extraStalls={state.extraStalls} stallEdits={state.stallEdits} fallbackFood={fallbackFood} colors={sl.c} variant="story" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" aria-hidden="true" />
        <div className="absolute inset-0 z-[1] flex">
          <button type="button" aria-label="Previous story" onClick={prev} className="h-full flex-1 cursor-default bg-transparent" />
          <button type="button" aria-label="Next story" onClick={next} className="h-full flex-1 cursor-default bg-transparent" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-4 bottom-[22px] z-[3] text-white [text-shadow:0_1px_6px_rgba(0,0,0,.5)]">
        <p>{sl.cap}</p>
        {sl.sid && (
          <button
            type="button"
            onClick={() => { dispatch({ type: 'STORY_CLOSE' }); dispatch({ type: 'SET_STALL', id: sl.sid! }); }}
            className="pointer-events-auto mt-2 min-h-[44px] rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] font-extrabold text-black"
          >See stall →</button>
        )}
      </div>
    </div>
  );
}
