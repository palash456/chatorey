'use client';
import React from 'react';
import { THREADS, USERS } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { ST } from '../../lib/helpers';
import { Icon } from '../ui/Icon';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { timeAgo } from '../../lib/helpers';
import type { Comment } from '../../lib/types';
import { Calendar, MapPin, ThumbsUp } from 'lucide-react';

function CommentRow({ c, tid, depth = 0 }: { c: Comment; tid: string; depth?: number }) {
  const { state, dispatch } = useApp();
  return (
    <div className={`flex gap-2.5 ${depth ? 'ml-[42px] mt-2.5' : 'mt-3'}`}>
      <Avatar uid={c.u} size={32} decorative />
      <div className="min-w-0 flex-1">
        <div className="flex justify-between"><b className="text-[13px]">{USERS[c.u]?.n || c.u}</b><span className="text-[12px] text-muted">{timeAgo(c.age)} ago</span></div>
        <p className="mt-0.5 text-[13px]">{c.t}</p>
        <div className="mt-1 flex gap-3.5 text-[12px] font-bold text-muted">
          <button type="button" onClick={() => dispatch({ type: 'COMMENT_LIKE', tid, cid: c.id })} className="inline-flex items-center gap-1"><ThumbsUp size={12} aria-hidden /> {c.likes}</button>
          <button onClick={() => dispatch({ type: 'REPLY_TO', cid: c.id })}>Reply</button>
        </div>
        {c.replies.map(r => <CommentRow key={r.id} c={r} tid={tid} depth={depth + 1} />)}
      </div>
    </div>
  );
}

export function ThreadDetail({ id }: { id: string }) {
  const { state, dispatch } = useApp();
  const t = [...state.userThreads, ...THREADS].find(x => x.id === id);
  if (!t) return null;
  const u = USERS[t.uid];
  const sid = t.sid ? ST(t.sid, state.extraStalls, state.stallEdits) : undefined;
  const commentCount = t.comments.reduce((a, c) => a + 1 + c.replies.length, 0);

  return (
    <div className="page-container page-narrow flex flex-col pb-24">
      <div className="flex items-center gap-2.5 pt-2">
        <button onClick={() => dispatch({ type: 'THREAD_OPEN', id: null })} aria-label="Back" className="grid h-[38px] w-[38px] place-items-center rounded-full bg-soft"><Icon name="back" /></button>
        <b className="text-[15px]">{t.cat}</b>
      </div>
      <div className="pb-4 pt-2">
        <div className="mt-1 flex items-center gap-2"><Avatar uid={t.uid} size={32} decorative /><div><b className="text-[13px]">{u.n}</b><div className="text-[12px] text-muted">{u.bd} · {timeAgo(t.age)} ago</div></div></div>
        <h2 className="mt-3 text-[22px] font-extrabold leading-tight">{t.title}</h2>
        {t.img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.img} alt="" className="mt-2.5 w-full rounded-2xl" />
        )}
        <p className="mt-1.5 leading-relaxed">{t.body}</p>

        {sid && (
          <button onClick={() => dispatch({ type: 'SET_STALL', id: sid.id })} className="my-3 block w-full overflow-hidden rounded-2xl bg-card text-left shadow-card">
            <div style={{ background: `linear-gradient(135deg, ${sid.c[0]}, ${sid.c[1]})`, height: 110 }} />
            <div className="p-2.5"><b className="text-[13px]">{sid.name}</b><div className="text-[12px] text-muted">{sid.area}</div></div>
          </button>
        )}

        {t.event && (
          <div className="mt-2.5 rounded-xl bg-soft p-3">
            <b>{t.event.title}</b>
            <div className="mt-1 space-y-1 text-[13.5px] text-muted">
              <div className="flex items-center gap-1.5"><Calendar size={14} aria-hidden /> {t.event.when}</div>
              <div className="flex items-center gap-1.5"><MapPin size={14} aria-hidden /> {t.event.where}</div>
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[13.5px] text-muted">{t.event.going}/{t.event.cap} going</span>
              <Button variant="primary" size="sm" onClick={() => dispatch({ type: 'RSVP', id: t.id })}>{t.rsvp ? '✓ Going' : "I'm in"}</Button>
            </div>
          </div>
        )}

        {t.poll && (
          <div className="mt-2.5">
            {t.poll.opts.map((o, i) => {
              const tot = t.poll!.opts.reduce((a, x) => a + x[1], 0);
              const pct = Math.round(o[1] / tot * 100);
              const mine = state.pollPick[t.id] === i;
              const voted = state.pollPick[t.id] !== undefined;
              return (
                <div key={i} onClick={() => dispatch({ type: 'POLL_VOTE', id: t.id, i })} className={`relative mb-1.5 cursor-pointer overflow-hidden rounded-[10px] border p-2.5 ${mine ? 'border-brand' : 'border-line'}`}>
                  {voted && <div className="absolute inset-0 z-0 bg-brand-soft" style={{ width: pct + '%' }} />}
                  <div className="relative z-10 flex justify-between text-[13.5px] font-semibold"><span>{mine ? '✓ ' : ''}{o[0]}</span><span>{voted ? pct + '%' : ''}</span></div>
                </div>
              );
            })}
            <div className="text-[12px] text-muted">{t.poll.opts.reduce((a, x) => a + x[1], 0)} votes</div>
          </div>
        )}

        <div className="mt-3.5 flex items-center gap-2.5">
          <button onClick={() => dispatch({ type: 'VOTE', id: t.id, v: 'up' })} className="rounded-lg bg-soft px-2.5 py-1.5 font-bold">▲ {t.up}</button>
          <button onClick={() => dispatch({ type: 'VOTE', id: t.id, v: 'down' })} className="rounded-[10px] border border-line px-2.5 py-1.5 text-[13px] font-bold">▼ {t.down}</button>
        </div>

        <h2 className="mb-2 mt-5 text-[16px] font-extrabold">Comments ({commentCount})</h2>
        {t.comments.length ? t.comments.map(c => <CommentRow key={c.id} c={c} tid={t.id} />) : <p className="text-[13px] text-muted">Be the first to comment.</p>}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 border-t border-line bg-card px-4 py-2.5">
        <Avatar uid="aarav" size={32} />
        <input
          id="cdraft" defaultValue=""
          placeholder={state.replyTo ? 'Replying…' : 'Add a comment'}
          className="flex-1 rounded-full bg-soft px-3.5 py-2.5 text-ink outline-none placeholder:text-muted"
        />
        <Button variant="primary" size="sm" onClick={() => {
          const el = document.getElementById('cdraft') as HTMLInputElement | null;
          const v = el?.value || '';
          dispatch({ type: 'POST_COMMENT', tid: t.id, text: v });
          if (el) el.value = '';
        }}>Post</Button>
      </div>
    </div>
  );
}
