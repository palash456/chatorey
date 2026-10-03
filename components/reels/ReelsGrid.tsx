'use client';
import React from 'react';
import { Play } from 'lucide-react';
import { REELS, USERS } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { ST } from '../../lib/helpers';

export function ReelsGrid() {
  const { state, dispatch } = useApp();

  return (
    <div className="reels-shorts-grid">
      {REELS.map((r, idx) => {
        const stall = ST(r.sid, state.extraStalls, state.stallEdits);
        const u = USERS[r.u];
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => dispatch({ type: 'REEL_OPEN', idx })}
            className="reels-short-card group text-left"
          >
            <div
              className="reels-short-thumb"
              style={{ background: `linear-gradient(160deg, ${r.c[0]}, ${r.c[1]})` }}
            >
              <span className="text-4xl opacity-90" aria-hidden>{r.e}</span>
              <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 text-[11px] font-bold text-white">
                <Play size={12} fill="currentColor" aria-hidden /> {r.dur}
              </span>
            </div>
            <div className="mt-2 px-0.5">
              <p className="line-clamp-2 text-[13px] font-bold leading-snug text-ink">{r.cap.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim()}</p>
              <p className="mt-1 truncate text-[12px] text-muted">{u?.n} · {stall?.name}</p>
              <p className="mt-0.5 text-[11px] text-muted">{r.likes.toLocaleString()} likes</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
