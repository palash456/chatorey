'use client';
import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_BANNER_KEY, DEMO_WELCOME_KEY, isPrototypeBuild, loadDemoFlag, saveDemoFlag } from '../../lib/demo';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

export function DemoBanner() {
  const { dispatch } = useApp();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(loadDemoFlag(DEMO_BANNER_KEY));
  }, []);

  if (!isPrototypeBuild() || hidden) return null;

  return (
    <div className="relative z-[7] border-b border-amber/30 bg-amber-bg py-2.5 text-[12.5px] leading-snug text-ink">
      <div className="relative px-5 lg:desktop-layout-width lg:px-8">
      <button
        type="button"
        aria-label="Dismiss prototype notice"
        onClick={() => { saveDemoFlag(DEMO_BANNER_KEY, true); setHidden(true); }}
        className="absolute right-5 top-0 grid h-8 w-8 place-items-center rounded-full bg-card/80 text-muted lg:right-8"
      >
        <X size={16} aria-hidden />
      </button>
      <b className="block pr-10">Jaipur prototype</b>
      <span className="text-muted">Sample stalls &amp; orders only — no real payments or delivery. </span>
      <button type="button" className="font-bold text-brand" onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'howitworks' } })}>How it works</button>
      {' · '}
      <button type="button" className="font-bold text-brand" onClick={() => dispatch({ type: 'START_DEMO_PATH' })}>3‑min tour</button>
      </div>
    </div>
  );
}

export function DemoWelcomeEffect() {
  const { state, dispatch } = useApp();
  useEffect(() => {
    if (!isPrototypeBuild()) return;
    if (loadDemoFlag(DEMO_WELCOME_KEY)) return;
    if (state.sheet) return;
    saveDemoFlag(DEMO_WELCOME_KEY, true);
    dispatch({ type: 'SET_SHEET', sheet: { t: 'welcome' } });
  }, [dispatch, state.sheet]);
  return null;
}
