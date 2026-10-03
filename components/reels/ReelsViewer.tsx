'use client';
import React, { useState } from 'react';
import { Bookmark, Heart, MessageCircle, Music2, Play, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { REELS, USERS } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { ST } from '../../lib/helpers';
import { Icon } from '../ui/Icon';
import { Avatar } from '../ui/Avatar';
import { useDialogA11y } from '../ui/useDialogA11y';
import { MediaFoodHero } from '../ui/MediaFoodHero';

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
  return desktop;
}

export function ReelsViewer() {
  const { state, dispatch } = useApp();
  const [showComments, setShowComments] = useState(false);
  const isDesktop = useIsDesktop();
  const closeReel = () => dispatch({ type: 'REEL_CLOSE' });
  const panelRef = useDialogA11y(state.reelOpen, closeReel);
  const commentsRef = useDialogA11y(showComments, () => setShowComments(false));

  if (!state.reelOpen) return null;
  const r = REELS[state.reelIdx];
  const stall = ST(r.sid, state.extraStalls, state.stallEdits);
  const comments = [...(state.reelComments[r.id] ?? []), ...r.cm];
  const fallbackFood = stall?.foods[0] || 'snacks';
  const liked = state.rxn[r.id] === 'like';
  const disliked = state.rxn[r.id] === 'dislike';
  const saved = state.rsave.has(r.id);

  const commentsPanel = showComments && (
    <div className="absolute inset-0 z-[5] flex items-end bg-black/40">
      <button type="button" aria-label="Close comments" className="absolute inset-0" onClick={() => setShowComments(false)} />
      <div ref={commentsRef} role="dialog" aria-modal="true" aria-label="Reel comments" tabIndex={-1} onClick={e => e.stopPropagation()} className="relative flex max-h-[70%] w-full flex-col rounded-t-[20px] bg-card lg:max-h-[85%] lg:rounded-2xl">
        <div className="mx-auto mb-2.5 mt-2.5 h-1 w-10 rounded-full bg-line lg:hidden" aria-hidden="true" />
        <div className="flex items-center justify-between px-4"><b>{comments.length} comments</b><button type="button" onClick={() => setShowComments(false)} aria-label="Close" className="touch-target grid place-items-center rounded-full bg-soft"><Icon name="close" /></button></div>
        <div className="overflow-y-auto px-4">
          {comments.length ? comments.map((c, i) => (
            <div key={i} className="mt-3 flex gap-2.5">
              <Avatar uid={c.u} size={32} decorative />
              <div>
                <b className="text-[13px]">{USERS[c.u]?.n}</b> <span className="text-[12px] text-muted">{c.when}</span>
                <p className="text-[13px]">{c.t}</p>
                <div className="flex items-center gap-1 text-[12px] font-bold text-muted"><ThumbsUp size={12} /> {c.likes}</div>
              </div>
            </div>
          )) : <p className="px-0 py-4 text-[13px] text-muted">No comments yet.</p>}
        </div>
        <div className="flex items-center gap-2.5 border-t border-line px-4 py-2.5">
          <Avatar uid="aarav" size={32} decorative />
          <label htmlFor="rcdraft" className="sr-only">Add a comment</label>
          <input id="rcdraft" defaultValue="" placeholder="Add a comment" className="min-h-[44px] flex-1 rounded-full bg-soft px-3.5 py-2.5 text-ink outline-none placeholder:text-muted" />
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('rcdraft') as HTMLInputElement | null;
              dispatch({ type: 'REEL_COMMENT', id: r.id, text: el?.value || '' });
              if (el) el.value = '';
            }}
            className="min-h-[44px] rounded-[10px] bg-brand px-3.5 py-2 text-[13px] font-bold text-white"
          >Post</button>
        </div>
      </div>
    </div>
  );

  const player = (
    <>
      <button type="button" onClick={e => { e.stopPropagation(); closeReel(); }} aria-label="Close reels" className="pointer-events-auto absolute right-3 top-3 z-[10] touch-target grid place-items-center rounded-full bg-white/20 text-white">
        <Icon name="close" />
      </button>
      <span className="absolute right-3.5 top-3.5 z-[4] flex items-center gap-1 rounded-full bg-black/35 px-2.5 py-1.5 text-[13px] font-extrabold text-white lg:right-14" aria-hidden="true">
        <Play size={14} fill="currentColor" /> {r.dur}
      </span>

      <div className="absolute inset-0">
        <MediaFoodHero stallId={r.sid} extraStalls={state.extraStalls} stallEdits={state.stallEdits} fallbackFood={fallbackFood} colors={r.c} variant="reel" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35" aria-hidden="true" />
        <div className="absolute inset-0 z-[1] flex">
          <button type="button" aria-label="Previous reel" onClick={() => dispatch({ type: 'REEL_PREV' })} className="h-full flex-1 bg-transparent" />
          <button type="button" aria-label="Next reel" onClick={() => dispatch({ type: 'REEL_NEXT' })} className="h-full flex-1 bg-transparent" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-[2] px-4 pb-[26px] pr-[70px] pt-[18px] text-white">
        <div className="flex items-center gap-2 font-extrabold">
          <Avatar uid={r.u} size={28} decorative /> {USERS[r.u]?.n}
          <button type="button" onClick={() => dispatch({ type: 'SET_STALL', id: r.sid })} className="ml-1.5 min-h-[36px] rounded-full bg-white/20 px-2.5 py-1 text-[12px]">View stall</button>
        </div>
        <p className="mt-2 text-[14px] leading-snug">{r.cap.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim()}</p>
        <div className="mt-2 flex items-center gap-1.5 text-[12.5px] opacity-85">
          <Music2 size={14} aria-hidden /> {r.music}
        </div>
      </div>

      <div className="absolute bottom-[100px] right-2.5 z-[3] flex flex-col items-center gap-[18px] text-white">
        <button type="button" aria-label={liked ? 'Unlike reel' : 'Like reel'} aria-pressed={liked} onClick={() => dispatch({ type: 'REEL_LIKE', id: r.id })} className="flex flex-col items-center gap-[3px] text-[11px] font-bold">
          <span className={`grid h-11 w-11 place-items-center rounded-full ${liked ? 'bg-brand' : 'bg-white/20'}`}><Heart size={22} className={liked ? 'fill-white' : ''} /></span>
          {r.likes + (liked ? 1 : 0)}
        </button>
        <button type="button" aria-label="Dislike reel" aria-pressed={disliked} onClick={() => dispatch({ type: 'REEL_DISLIKE', id: r.id })} className="flex flex-col items-center gap-[3px] text-[11px] font-bold">
          <span className={`grid h-11 w-11 place-items-center rounded-full ${disliked ? 'bg-ink/60' : 'bg-white/20'}`}><ThumbsDown size={22} /></span>
          {r.dislikes + (disliked ? 1 : 0)}
        </button>
        <button type="button" aria-label="View comments" onClick={() => setShowComments(true)} className="flex flex-col items-center gap-[3px] text-[11px] font-bold">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20"><MessageCircle size={22} /></span>
          {comments.length}
        </button>
        <button type="button" aria-label={saved ? 'Unsave reel' : 'Save reel'} aria-pressed={saved} onClick={() => dispatch({ type: 'REEL_SAVE', id: r.id })} className="flex flex-col items-center gap-[3px] text-[11px] font-bold">
          <span className={`grid h-11 w-11 place-items-center rounded-full ${saved ? 'bg-amber text-ink' : 'bg-white/20'}`}><Bookmark size={22} className={saved ? 'fill-current' : ''} /></span>
          {saved ? 'Saved' : 'Save'}
        </button>
        <button type="button" aria-label="Share reel" onClick={() => dispatch({ type: 'TOAST', msg: 'Link copied' })} className="flex flex-col items-center gap-[3px] text-[11px] font-bold">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20"><Share2 size={22} /></span>
          Share
        </button>
      </div>
      {commentsPanel}
    </>
  );

  if (isDesktop) {
    return (
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Food reels" tabIndex={-1} className="absolute inset-0 z-[55] flex items-center justify-center bg-black/88 p-4">
        <button type="button" aria-label="Close reels" className="absolute inset-0" onClick={closeReel} />
        <div className="relative z-[1] flex h-full max-h-[min(92vh,820px)] w-full max-w-5xl gap-5" onClick={e => e.stopPropagation()}>
          <aside className="hidden w-[200px] flex-none flex-col overflow-hidden rounded-2xl bg-white/10 p-3 sm:flex">
            <b className="mb-2 px-1 text-[13px] font-bold text-white">More shorts</b>
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
              {REELS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => dispatch({ type: 'REEL_OPEN', idx })}
                  className={`flex shrink-0 items-center gap-2 rounded-xl p-1.5 text-left ${idx === state.reelIdx ? 'bg-white/20 ring-1 ring-brand' : 'hover:bg-white/10'}`}
                >
                  <span
                    className="grid h-14 w-10 flex-none place-items-center rounded-md text-lg"
                    style={{ background: `linear-gradient(160deg, ${item.c[0]}, ${item.c[1]})` }}
                  >{item.e}</span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 text-[11px] font-semibold leading-tight text-white">{item.cap.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim()}</span>
                    <span className="text-[10px] text-white/70">{item.dur}</span>
                  </span>
                </button>
              ))}
            </div>
          </aside>
          <div className="relative mx-auto h-full w-full max-w-[min(100%,380px)] overflow-hidden rounded-2xl bg-black shadow-2xl">
            {player}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Food reels" tabIndex={-1} className="absolute inset-0 z-[55] overflow-hidden bg-black">
      {player}
    </div>
  );
}
