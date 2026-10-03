'use client';
import React from 'react';
import { THREADS } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { ThreadCard } from './ThreadCard';
import { Button } from '../ui/Button';

const CATS = ['All', 'Recommendations', 'Questions', 'Hidden gems', 'Meetups', 'Vendors'];

export function CommunityScreen() {
  const { state, dispatch } = useApp();
  const list = [...state.userThreads, ...THREADS].filter(t => state.threadFilter === 'All' || t.cat === state.threadFilter).sort((a, b) => (Number(b.pinned) - Number(a.pinned)) || (a.age - b.age));

  const CatChip = ({ c, vertical }: { c: string; vertical?: boolean }) => (
    <button
      key={c}
      type="button"
      onClick={() => dispatch({ type: 'THREAD_FILTER', v: c })}
      className={
        vertical
          ? `w-full rounded-xl px-3 py-2.5 text-left text-[13px] font-bold ${state.threadFilter === c ? 'bg-brand-soft text-brand' : 'text-muted hover:bg-soft'}`
          : `flex-none rounded-full px-3 py-1.5 text-[12.5px] font-bold ${state.threadFilter === c ? 'bg-ink text-card' : 'bg-soft text-ink'}`
      }
    >
      {c}
    </button>
  );

  return (
    <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
      <aside className="desktop-filter-rail hidden lg:block">
        <p className="mb-2 text-[12px] font-bold uppercase tracking-wide text-muted">Topics</p>
        <div className="desktop-panel flex flex-col gap-1 p-2">
          {CATS.map(c => <CatChip key={c} c={c} vertical />)}
        </div>
      </aside>

      <div className="min-w-0">
        <div className="flex gap-1.5 overflow-x-auto pb-2.5 pt-1 [scrollbar-width:none] lg:hidden">
          {CATS.map(c => <CatChip key={c} c={c} />)}
        </div>
        <div className="mx-auto space-y-3 pb-6 lg:max-w-3xl">
          <div className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[14px] text-muted">Ask, share a find, or plan a food walk in Jaipur</span>
            <Button variant="primary" size="sm" className="flex-none" onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'compose' } })}>+ New post</Button>
          </div>
          {list.map(t => <ThreadCard key={t.id} t={t} />)}
        </div>
      </div>
    </div>
  );
}
