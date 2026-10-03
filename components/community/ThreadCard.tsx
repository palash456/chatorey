'use client';
import React from 'react';
import type { Thread } from '../../lib/types';
import { USERS } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import { Pill } from '../ui/Pill';
import { BarChart3, Calendar, MapPin, MessageCircle, Pin } from 'lucide-react';
import { timeAgo, cut, ST } from '../../lib/helpers';

export function ThreadCard({ t }: { t: Thread }) {
  const { state, dispatch } = useApp();
  const u = USERS[t.uid];
  const commentCount = t.comments.reduce((a, c) => a + 1 + c.replies.length, 0);
  const sid = t.sid ? ST(t.sid, state.extraStalls, state.stallEdits) : undefined;
  const open = () => dispatch({ type: 'THREAD_OPEN', id: t.id });
  return (
    <article className="w-full rounded-xl bg-card p-3 surface-card lg:rounded-2xl lg:p-3.5">
      {t.pinned && <Pill tone="amber" className="mb-1.5 inline-flex items-center gap-1"><Pin size={12} aria-hidden /> Pinned</Pill>}
      {t.live && <Pill tone="green" className="mb-1.5">Live meetup</Pill>}
      <div className="flex items-start gap-3">
        <div className="flex w-[40px] flex-none flex-col items-center gap-0.5">
          <button type="button" onClick={() => dispatch({ type: 'VOTE', id: t.id, v: 'up' })} aria-label="Upvote thread" className="touch-target grid w-full place-items-center rounded-lg bg-soft font-extrabold text-[13px]">▲</button>
          <b className="text-[13px]" aria-hidden="true">{t.up - t.down}</b>
          <button type="button" onClick={() => dispatch({ type: 'VOTE', id: t.id, v: 'down' })} aria-label="Downvote thread" className="touch-target grid w-full place-items-center rounded-lg bg-soft font-extrabold text-[13px]">▼</button>
        </div>
        <button type="button" onClick={open} className="min-w-0 flex-1 text-left" aria-label={`Open thread: ${t.title}`}>
          <div className="flex justify-between"><span className="text-[11px] font-extrabold uppercase tracking-wide text-brand">{t.cat}</span><span className="text-[12px] text-muted">{timeAgo(t.age)} ago</span></div>
          <h3 className="mt-1 text-[15px] font-semibold leading-snug lg:text-[16px] lg:font-extrabold">{t.title}</h3>
          {t.img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.img} alt="" className="mt-2 max-h-[150px] w-full rounded-xl object-cover" />
          )}
          <div className="mt-1 text-[13px] leading-snug text-muted lg:text-[14px]">{cut(t.body, 100)}</div>
          <div className="mt-2.5 flex items-center gap-1.5">
            <Avatar uid={t.uid} size={22} decorative /><b className="text-[12px]">{u.n}</b>
            <Pill className="text-[10.5px]">{u.bd}</Pill>
          </div>
          {sid && <div className="mt-2"><Pill tone="brand" className="inline-flex items-center gap-1"><MapPin size={12} aria-hidden /> {sid.name}</Pill></div>}
          <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted">
            <span className="inline-flex items-center gap-1"><MessageCircle size={13} aria-hidden /> {commentCount} comments</span>
            {t.poll && <span className="inline-flex items-center gap-1"><BarChart3 size={13} aria-hidden /> Poll</span>}
            {t.event && <span className="inline-flex items-center gap-1"><Calendar size={13} aria-hidden /> {t.event.going}/{t.event.cap} going</span>}
          </div>
        </button>
      </div>
    </article>
  );
}
