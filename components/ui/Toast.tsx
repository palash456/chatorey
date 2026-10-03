'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';

export function Toast() {
  const { state } = useApp();
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`pointer-events-none absolute left-1/2 top-[calc(12px+env(safe-area-inset-top,0px))] z-[60] max-w-[88%] -translate-x-1/2 rounded-xl bg-ink px-4 py-2.5 text-center text-[13.5px] font-semibold text-card shadow-card transition-transform duration-200 motion-reduce:transition-none ${
        state.toast ? 'translate-y-0' : '-translate-y-[90px]'
      }`}
    >
      {state.toast || ''}
    </div>
  );
}
