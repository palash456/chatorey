'use client';
import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Icon } from '../ui/Icon';
import { CategoryChips } from './CategoryChips';
import { StoryBar } from './StoryBar';
import { StallCardWide } from './StallCardWide';
import { StallCardCompact } from './StallCardCompact';
import { Button } from '../ui/Button';
import { DesktopCanvas, DesktopSection, StallRail } from '../layout/DesktopLayout';
import { score, dist, allStalls } from '../../lib/helpers';

function rightNowLabel(hour: number) {
  if (hour < 11) return { label: 'Morning picks', foods: ['kachori', 'jalebi', 'chai'] };
  if (hour < 16) return { label: 'Afternoon picks', foods: ['lassi', 'dal baati', 'chaat', 'ghewar'] };
  if (hour < 20) return { label: 'Evening picks', foods: ['golgappe', 'chaat', 'momos', 'mirchi bada', 'samosa'] };
  return { label: 'Late-night picks', foods: ['kulfi', 'momos', 'jalebi'] };
}

function SectionHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mobile-gutter-x pb-2 pt-4 lg:px-0 lg:pt-0">
      <div>
        <h2 className="section-title font-display">{title}</h2>
        {subtitle ? <p className="section-sub">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function HomeScreen() {
  const { state, dispatch } = useApp();
  const [hour, setHour] = useState(12);
  useEffect(() => setHour(new Date().getHours()), []);
  const catalog = allStalls(state.extraStalls);
  const top = [...catalog].sort((a, b) => score(b) - score(a)).slice(0, 6);
  const rn = rightNowLabel(hour);
  const near = catalog.filter(s => s.open && s.foods.some(f => rn.foods.includes(f))).sort((a, b) => score(b) - score(a)).slice(0, 6);
  const gems = catalog.filter(s => s.tags.includes('Hidden gem')).slice(0, 6);
  const cafes = catalog.filter(s => s.tags.includes('Cafe')).sort((a, b) => score(b) - score(a)).slice(0, 6);
  const openNearby = [...catalog].filter(s => s.open).sort((a, b) => dist(state.area, a) - dist(state.area, b)).slice(0, 6);

  const cycleTheme = () => {
    const next = state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'auto' : 'light';
    dispatch({ type: 'SET_THEME', theme: next });
  };

  return (
    <DesktopCanvas className="lg:pt-4">
      <h1 className="sr-only">Chatorey home — food near {state.area}</h1>

      <header className="border-b border-line bg-card pb-3 lg:rounded-none lg:border-0 lg:bg-transparent lg:pb-0">
        <div className="page-container flex items-center justify-between pb-2.5 pt-3 lg:hidden">
          <button onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'area' } })} className="flex min-w-0 items-center gap-2 text-left">
            <span className="text-brand"><Icon name="pin" size={22} /></span>
            <span className="min-w-0">
              <b className="flex items-center gap-1 text-[15px] font-semibold">{state.area} <Icon name="down" size={14} /></b>
            </span>
          </button>
          <div className="flex flex-none items-center gap-1.5">
            <button onClick={cycleTheme} aria-label={`Theme: ${state.theme}`} className="grid h-9 w-9 place-items-center rounded-full bg-soft text-ink">
              <Icon name={state.theme === 'dark' ? 'sun' : 'moon'} size={18} />
            </button>
            <button onClick={() => dispatch({ type: 'SET_TAB', tab: 'profile' })} className="grid h-9 w-9 place-items-center rounded-full bg-brand-soft text-[13px] font-bold text-brand">A</button>
          </div>
        </div>

        <div className="page-container lg:hidden">
          <button
            type="button"
            onClick={() => dispatch({ type: 'OPEN_EXPLORE_SEARCH' })}
            className="flex w-full items-center gap-2 rounded-xl bg-soft px-3 py-2.5 text-left text-[14px] font-medium text-muted"
          >
            <Icon name="search" size={18} /> Search dishes & stalls
          </button>
        </div>

        <div className="lg:mt-6 lg:desktop-panel lg:overflow-hidden lg:p-5">
          <StoryBar />
        </div>
      </header>

      <div className="mt-4 lg:mt-6">
        <DesktopSection title="Cravings" subtitle="Tap a category to search stalls">
          <CategoryChips size={56} />
        </DesktopSection>
      </div>

      <div className="mt-3 hidden gap-3 lg:mt-6 lg:grid lg:grid-cols-3">
        <div className="relative flex min-h-[118px] flex-col justify-center gap-1 overflow-hidden rounded-2xl p-4 text-white lg:min-h-[140px]" style={{ background: 'linear-gradient(120deg,#C2185B,#E8590C)' }}>
          <b className="text-[18px] leading-tight">Find what&apos;s actually worth eating</b>
          <span className="text-[12.5px] opacity-90">Picks from locals who live here, not paid rankings.</span>
        </div>
        <button type="button" onClick={() => dispatch({ type: 'SET_TAB', tab: 'add' })} className="relative flex min-h-[118px] flex-col justify-center gap-1 overflow-hidden rounded-2xl p-4 text-left text-white lg:min-h-[140px]" style={{ background: 'linear-gradient(120deg,#1B5E20,#00897B)' }}>
          <b className="text-[18px] leading-tight">Know a hidden stall?</b>
          <span className="text-[12.5px] opacity-90">Add it in 2 minutes and become a Local Guide.</span>
        </button>
      </div>

      <div className="mt-4 lg:mt-8">
        <SectionHeading title="Top picks" />
        <StallRail>{top.map(s => <StallCardCompact key={s.id} stall={s} />)}</StallRail>
      </div>

      <div className="mt-1 lg:mt-6">
        <SectionHeading title={rn.label} />
        <StallRail>{near.map(s => <StallCardCompact key={s.id} stall={s} />)}</StallRail>
      </div>

      {cafes.length > 0 && (
        <div className="mt-1 hidden lg:mt-6 lg:block">
          <SectionHeading
            title="Cafés & chai"
            subtitle="MI Road, C-Scheme, bazaar rooftops"
            action={<button type="button" onClick={() => { dispatch({ type: 'SET_TAB', tab: 'explore' }); dispatch({ type: 'SET_QUERY', query: 'chai' }); }} className="text-[12px] font-semibold text-brand">See all</button>}
          />
          <StallRail>{cafes.map(s => <StallCardCompact key={s.id} stall={s} />)}</StallRail>
        </div>
      )}

      <div className="mt-1 hidden lg:mt-6 lg:block">
        <SectionHeading title="Hidden gems" subtitle="Few reviews, all of them raving" />
        <StallRail>{gems.map(s => <StallCardCompact key={s.id} stall={s} />)}</StallRail>
      </div>

      <div className="mt-1 lg:mt-6">
        <SectionHeading title="Open near you" />
        <div className="stall-grid mobile-gutter-x lg:!px-0">
          {openNearby.map(s => <StallCardWide key={s.id} stall={s} compact />)}
        </div>
      </div>

      <div className="mobile-gutter-x mt-6 pb-2 text-center lg:hidden">
        <button type="button" onClick={() => dispatch({ type: 'SET_TAB', tab: 'add' })} className="text-[13px] font-semibold text-brand">
          Know a stall we missed? Add it →
        </button>
      </div>

      <div className="mx-auto mt-8 hidden max-w-xl rounded-2xl bg-accent p-[18px] text-accent-ink lg:block">
        <b className="text-[17px]">Spot something we&apos;ve missed?</b>
        <p className="mt-1 text-[13px] font-medium opacity-85">Every hidden stall on Chatorey was added by someone who ate there.</p>
        <Button variant="default" block className="mt-3 border-0 bg-card text-ink" onClick={() => dispatch({ type: 'SET_TAB', tab: 'add' })}>Add a food spot</Button>
      </div>
    </DesktopCanvas>
  );
}
