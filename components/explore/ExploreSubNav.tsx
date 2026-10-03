'use client';
import React from 'react';
import { Film } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { switchExploreSeg } from './exploreNav';

const TABS: { id: 'stalls' | 'community' | 'reels'; label: string; icon?: React.ReactNode }[] = [
  { id: 'stalls', label: 'Stalls' },
  { id: 'community', label: 'Community' },
  { id: 'reels', label: 'Reels', icon: <Film size={15} strokeWidth={2} aria-hidden /> }
];

export function ExploreSubNav() {
  const { state, dispatch } = useApp();

  return (
    <nav aria-label="Explore sections" className="explore-subnav">
      {TABS.map(t => {
        const active = state.estab === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => switchExploreSeg(dispatch, t.id)}
            aria-current={active ? 'page' : undefined}
            className={`explore-subnav-item ${active ? 'is-active' : ''}`}
          >
            {t.icon}
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
