'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Icon } from '../ui/Icon';
import { Avatar } from '../ui/Avatar';
import { CategoryChips } from './CategoryChips';
import { StoryBar } from './StoryBar';
import { StallCardWide } from './StallCardWide';
import { StallCardCompact } from './StallCardCompact';
import { Button } from '../ui/Button';
import { DesktopCanvas, DesktopSection, StallRail } from '../layout/DesktopLayout';
import { score, dist, allStalls } from '../../lib/helpers';

const FRIEND_NOTE = { who: 'Meera', where: 'Raja Park', text: 'Skip the fancy places today. Try the malai ghewar in Johari Bazaar, then a kulhad lassi on MI Road. Trust me on this.', sid: 's2' };

function rightNowLabel() {
  const h = new Date().getHours();
  if (h < 11) return { label: 'Morning in Jaipur', foods: ['kachori', 'jalebi', 'chai'] };
  if (h < 16) return { label: 'Afternoon cravings', foods: ['lassi', 'dal baati', 'chaat', 'ghewar'] };
  if (h < 20) return { label: 'Evening snack time', foods: ['golgappe', 'chaat', 'momos', 'mirchi bada', 'samosa'] };
  return { label: 'Late-night bites', foods: ['kulfi', 'momos', 'jalebi'] };
}

function SectionHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between px-4 pb-2.5 pt-[22px] lg:px-0 lg:pt-0">
      <div>
        <h2 className="text-[18px] font-extrabold lg:text-[19px]">{title}</h2>
        {subtitle ? <p className="mt-0.5 text-[13px] text-muted">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function HomeScreen() {
  const { state, dispatch } = useApp();
  const catalog = allStalls(state.extraStalls);
  const top = [...catalog].sort((a, b) => score(b) - score(a)).slice(0, 8);
  const rn = rightNowLabel();
  const near = catalog.filter(s => s.open && s.foods.some(f => rn.foods.includes(f))).sort((a, b) => score(b) - score(a)).slice(0, 8);
  const gems = catalog.filter(s => s.tags.includes('Hidden gem')).slice(0, 8);
  const cafes = catalog.filter(s => s.tags.includes('Cafe')).sort((a, b) => score(b) - score(a)).slice(0, 8);
  const openNearby = [...catalog].filter(s => s.open).sort((a, b) => dist(state.area, a) - dist(state.area, b)).slice(0, 8);

  const cycleTheme = () => {
    const next = state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'auto' : 'light';
    dispatch({ type: 'SET_THEME', theme: next });
  };

  return (
    <DesktopCanvas className="lg:pt-4">
      <h1 className="sr-only">Chatorey home — food near {state.area}</h1>

      <header className="rounded-b-[22px] bg-card pb-4 shadow-card lg:rounded-none lg:bg-transparent lg:pb-0 lg:shadow-none">
        <div className="page-container flex items-center justify-between pb-3 pt-4 lg:hidden">
          <button onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'area' } })} className="flex min-w-0 items-center gap-2 text-left">
            <span className="text-brand"><Icon name="pin" size={26} /></span>
            <span className="min-w-0">
              <b className="flex items-center gap-1 text-[17px] font-extrabold">{state.area} <Icon name="down" size={16} /></b>
              <span className="block text-[12px] text-muted">Jaipur, Rajasthan</span>
            </span>
          </button>
          <div className="flex flex-none items-center gap-2">
            <button onClick={cycleTheme} aria-label={`Theme: ${state.theme}`} className="grid h-[38px] w-[38px] place-items-center rounded-full bg-soft text-ink">
              <Icon name={state.theme === 'dark' ? 'sun' : 'moon'} size={20} />
            </button>
            <button onClick={() => dispatch({ type: 'SET_TAB', tab: 'profile' })} className="grid h-[38px] w-[38px] place-items-center rounded-full bg-brand-soft font-extrabold text-brand">A</button>
          </div>
        </div>

        <div className="page-container lg:hidden">
          <button
            type="button"
            onClick={() => dispatch({ type: 'OPEN_EXPLORE_SEARCH' })}
            className="flex w-full items-center gap-2.5 rounded-2xl bg-soft px-4 py-3.5 text-left text-[15px] font-semibold text-muted"
          >
            <Icon name="search" size={20} /> Search &quot;pyaaz kachori&quot;, &quot;ghewar&quot;…
          </button>
        </div>

        <div className="lg:hidden"><StoryBar /></div>
        <div className="mt-6 hidden lg:block desktop-panel overflow-hidden p-5">
          <StoryBar />
        </div>
      </header>

      <div className="mt-5 lg:mt-6">
        <DesktopSection title="What are you craving?" subtitle="Tap a category to search stalls">
          <CategoryChips />
        </DesktopSection>
      </div>

      <div className="mt-4 grid gap-3 lg:mt-6 lg:grid-cols-3">
        <div className="relative flex min-h-[118px] flex-col justify-center gap-1 overflow-hidden rounded-2xl p-4 text-white lg:min-h-[140px]" style={{ background: 'linear-gradient(120deg,#C2185B,#E8590C)' }}>
          <b className="text-[18px] leading-tight">Find what&apos;s actually worth eating</b>
          <span className="text-[12.5px] opacity-90">Picks from locals who live here, not paid rankings.</span>
        </div>
        <button type="button" onClick={() => dispatch({ type: 'SET_TAB', tab: 'add' })} className="relative flex min-h-[118px] flex-col justify-center gap-1 overflow-hidden rounded-2xl p-4 text-left text-white lg:min-h-[140px]" style={{ background: 'linear-gradient(120deg,#1B5E20,#00897B)' }}>
          <b className="text-[18px] leading-tight">Know a hidden stall?</b>
          <span className="text-[12.5px] opacity-90">Add it in 2 minutes and become a Local Guide.</span>
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_STALL', id: FRIEND_NOTE.sid })}
          className="hidden rounded-2xl border border-line bg-card p-4 text-left lg:block"
        >
          <div className="mb-1.5 flex items-center gap-2 font-bold"><Avatar uid="meera" size={30} />{FRIEND_NOTE.who} · {FRIEND_NOTE.where}</div>
          <p className="text-[15px] leading-snug text-muted">&ldquo;{FRIEND_NOTE.text}&rdquo;</p>
        </button>
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: 'SET_STALL', id: FRIEND_NOTE.sid })}
        className="relative mt-[22px] block rounded-[20px] rounded-bl-sm border border-line bg-card p-4 text-left lg:hidden"
      >
        <div className="mb-1.5 flex items-center gap-2 font-bold"><Avatar uid="meera" size={30} />{FRIEND_NOTE.who} from {FRIEND_NOTE.where} says</div>
        <p className="text-[16px] leading-snug">&ldquo;{FRIEND_NOTE.text}&rdquo;</p>
      </button>

      <div className="mt-6 lg:mt-8">
        <SectionHeading title="Top picks by locals" />
        <StallRail>{top.map(s => <StallCardCompact key={s.id} stall={s} />)}</StallRail>
      </div>

      <div className="mt-2 lg:mt-6">
        <SectionHeading title={rn.label} subtitle="Right now" />
        <StallRail>{near.map(s => <StallCardCompact key={s.id} stall={s} />)}</StallRail>
      </div>

      {cafes.length > 0 && (
        <div className="mt-2 lg:mt-6">
          <SectionHeading
            title="Jaipur cafés & chai stops"
            subtitle="MI Road, C-Scheme, bazaar rooftops"
            action={<button type="button" onClick={() => { dispatch({ type: 'SET_TAB', tab: 'explore' }); dispatch({ type: 'SET_QUERY', query: 'chai' }); }} className="text-[12px] font-bold text-brand">See all</button>}
          />
          <StallRail>{cafes.map(s => <StallCardCompact key={s.id} stall={s} />)}</StallRail>
        </div>
      )}

      <div className="mt-2 lg:mt-6">
        <SectionHeading title="Hidden gems" subtitle="Few reviews, all of them raving" />
        <StallRail>{gems.map(s => <StallCardCompact key={s.id} stall={s} />)}</StallRail>
      </div>

      <div className="mt-2 lg:mt-6">
        <SectionHeading title="Open and close by" />
        <div className="stall-grid !px-4 lg:!px-0">
          {openNearby.map(s => <StallCardWide key={s.id} stall={s} />)}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-accent p-[18px] text-accent-ink">
        <b className="text-[17px]">Spot something we&apos;ve missed?</b>
        <p className="mt-1 text-[13px] font-medium opacity-85">Every hidden stall on Chatorey was added by someone who ate there.</p>
        <Button variant="default" block className="mt-3 border-0 bg-card text-ink" onClick={() => dispatch({ type: 'SET_TAB', tab: 'add' })}>Add a food spot</Button>
      </div>
    </DesktopCanvas>
  );
}
