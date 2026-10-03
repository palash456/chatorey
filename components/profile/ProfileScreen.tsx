'use client';
import React from 'react';
import { ChevronRight, Clapperboard, HelpCircle, Share2, Trash2 } from 'lucide-react';
import { REELS } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { ST } from '../../lib/helpers';
import { clearPersist } from '../../lib/persist';
import { clearDemoPrefs } from '../../lib/demo';
import Link from 'next/link';
import { shareInviteVendor } from '../../lib/share';
import { StallCardWide } from '../home/StallCardWide';
import { Button } from '../ui/Button';
import { DesktopPageShell } from '../layout/DesktopPageShell';
function lvl(points: number) { return Math.floor(points / 150) + 1; }

export function ProfileScreen() {
  const { state, dispatch } = useApp();
  const saved = [...state.saved].map(id => ST(id, state.extraStalls, state.stallEdits)).filter(Boolean) as NonNullable<ReturnType<typeof ST>>[];
  const mine = state.contrib.map(id => ST(id, state.extraStalls, state.stallEdits)).filter(Boolean) as NonNullable<ReturnType<typeof ST>>[];
  const savedReels = REELS.filter(r => state.rsave.has(r.id));

  return (
    <DesktopPageShell
      aside={(
        <div className="desktop-panel sticky top-2 space-y-4 p-5">
          <div className="rounded-2xl bg-accent p-4 text-accent-ink">
            <b className="text-[16px]">Run a stall?</b>
            <p className="mb-2.5 mt-1 text-[13px] opacity-85">Switch to Vendor mode to see how orders reach you.</p>
            <Button block onClick={() => dispatch({ type: 'VENDOR_ON' })}>Open vendor mode</Button>
          </div>
          <p className="text-[13px] text-muted">Local Guide level {lvl(state.points)} · {state.points} points earned from adding and reviewing spots.</p>
        </div>
      )}
    >
      <div className="flex items-center gap-2 pt-3 lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/icon.jpg" alt="Chatorey" className="h-7 w-7 rounded-lg shadow-card" />
        <h1 className="page-title font-display" id="profile-heading">Profile</h1>
      </div>
      <div className="mt-2.5 flex items-center gap-3 rounded-xl bg-card p-3.5 surface-card lg:mt-3 lg:rounded-2xl lg:p-4">
        <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-accent text-[18px] font-bold text-accent-ink lg:h-14 lg:w-14 lg:text-[22px] lg:font-extrabold">A</span>
        <div><b className="text-[16px] font-semibold lg:text-[18px]">Aarav Sharma</b><div className="text-[12px] text-muted lg:text-[13px]">Level {lvl(state.points)} · {state.points} pts</div></div>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-2 lg:mt-3 lg:gap-2.5">
        <div className="rounded-xl bg-card p-3 text-center surface-card lg:rounded-2xl lg:p-3.5"><b className="text-[18px] lg:text-[22px]">{7 + state.contrib.length}</b><div className="text-[11px] text-muted lg:text-[12px]">Contributions</div></div>
        <div className="rounded-xl bg-card p-3 text-center surface-card lg:rounded-2xl lg:p-3.5"><b className="text-[18px] lg:text-[22px]">{saved.length}</b><div className="text-[11px] text-muted lg:text-[12px]">Saved</div></div>
        <div className="rounded-xl bg-card p-3 text-center surface-card lg:rounded-2xl lg:p-3.5"><b className="text-[18px] lg:text-[22px]">{state.orders.filter(o => o.mine).length}</b><div className="text-[11px] text-muted lg:text-[12px]">Orders</div></div>
      </div>

      {savedReels.length > 0 && (
        <>
          <div className="pb-2 pt-4 lg:pb-2.5 lg:pt-[22px]"><h2 className="section-title font-display">Saved reels</h2></div>
          <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {savedReels.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => { dispatch({ type: 'SET_TAB', tab: 'explore' }); dispatch({ type: 'ESEG', v: 'reels' }); dispatch({ type: 'REEL_OPEN', idx: REELS.findIndex(x => x.id === r.id) }); }}
                className="flex w-[140px] flex-none flex-col overflow-hidden rounded-2xl bg-card text-left shadow-card"
              >
                <div className="grid h-[100px] place-items-center text-white" style={{ background: `linear-gradient(135deg, ${r.c[0]}, ${r.c[1]})` }}>
                  <Clapperboard size={32} strokeWidth={1.5} />
                </div>
                <span className="line-clamp-2 p-2.5 text-[12px] font-semibold">{r.cap}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="pb-2 pt-4 lg:pb-2.5 lg:pt-[22px]"><h2 className="section-title font-display">Saved places</h2></div>
      {saved.length ? <div className="stall-grid !px-0 !max-w-none">{saved.map(s => <StallCardWide key={s.id} stall={s} compact />)}</div> : <p className="text-[13px] text-muted">Tap the heart on a stall to keep it here.</p>}

      <div className="pb-2 pt-4 lg:pb-2.5 lg:pt-[22px]"><h2 className="section-title font-display">Your contributions</h2></div>
      {mine.length ? <div className="stall-grid !px-0 !max-w-none">{mine.map(s => <StallCardWide key={s.id} stall={s} compact />)}</div> : (
        <div className="rounded-2xl bg-card p-3.5 shadow-card">
          <p>You haven't added a stall yet. Know a spot nobody talks about?</p>
          <Button variant="primary" className="mt-2.5" onClick={() => dispatch({ type: 'SET_TAB', tab: 'add' })}>Add a food spot</Button>
        </div>
      )}

      <div className="pb-2 pt-4 lg:pb-2.5 lg:pt-[22px]"><h2 className="section-title font-display">Settings</h2></div>
      <div className="overflow-hidden rounded-xl bg-card surface-card lg:rounded-2xl">
        <div className="flex items-center justify-between px-4 py-3.5">
          <b className="text-[14px]">Appearance</b>
          <div className="flex w-[200px] rounded-xl bg-soft p-[3px]">
            {(['light', 'dark', 'auto'] as const).map(t => (
              <button key={t} onClick={() => dispatch({ type: 'SET_THEME', theme: t })} className={`flex-1 rounded-[9px] py-1.5 text-[12px] font-bold capitalize ${state.theme === t ? 'bg-card text-ink shadow-card' : 'text-muted'}`}>{t}</button>
            ))}
          </div>
        </div>
        {[
          { label: '3‑minute demo tour', icon: HelpCircle, action: () => dispatch({ type: 'START_DEMO_PATH' }) },
          { label: 'How Chatorey works', icon: HelpCircle, action: () => dispatch({ type: 'SET_SHEET', sheet: { t: 'howitworks' } }) },
          { label: 'Invite a friend', icon: Share2, action: async () => {
            const r = await shareInviteVendor('Chatorey', 'home');
            dispatch({ type: 'TOAST', msg: r === 'shared' ? 'Invite shared' : r === 'copied' ? 'Invite link copied' : 'Could not share' });
          }},
          { label: 'Reset demo data', icon: Trash2, action: () => { clearPersist(); clearDemoPrefs(); dispatch({ type: 'RESET_DEMO' }); }, danger: true },
        ].map((row, i) => (
          <button key={row.label} type="button" onClick={row.action} className={`flex w-full min-h-[52px] items-center gap-3 border-t border-line px-4 py-3 text-left ${row.danger ? 'text-red' : ''}`}>
            <row.icon size={20} strokeWidth={1.75} aria-hidden />
            <span className="flex-1 text-[14px] font-semibold">{row.label}</span>
            <ChevronRight size={18} className="text-muted" aria-hidden />
          </button>
        ))}
      </div>

      <div className="mb-2 mt-3 flex gap-3 text-[12.5px] font-semibold text-muted">
        <Link href="/privacy" className="text-brand">Privacy</Link>
        <span aria-hidden>·</span>
        <Link href="/terms" className="text-brand">Terms</Link>
      </div>

      <div className="my-3 rounded-2xl bg-accent p-4 text-accent-ink lg:hidden">
        <b className="text-[16px]">Run a stall?</b>
        <p className="mb-2.5 mt-1 text-[13px] opacity-85">Switch to Vendor mode to see how orders reach you: accept, cook, mark ready.</p>
        <Button block onClick={() => dispatch({ type: 'VENDOR_ON' })}>Open vendor mode</Button>
      </div>
    </DesktopPageShell>
  );
}
