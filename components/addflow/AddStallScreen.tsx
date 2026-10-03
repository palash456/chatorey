'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { ST, allStalls } from '../../lib/helpers';
import { shareInviteVendor } from '../../lib/share';
import { Button } from '../ui/Button';
import { StallCardWide } from '../home/StallCardWide';
import { AddFlowWizard } from './AddFlowWizard';
import { Camera, MapPin, PartyPopper, Star } from 'lucide-react';
import { DesktopPageShell } from '../layout/DesktopPageShell';

function lvl(points: number) { return Math.floor(points / 150) + 1; }

function AddAside({ points }: { points: number }) {
  return (
    <div className="desktop-panel sticky top-2 space-y-4 p-5">
      <div>
        <b className="text-[15px]">Local Guide</b>
        <p className="mt-1 text-[13px] text-muted">Level {lvl(points)} · {points} points</p>
      </div>
      <ul className="space-y-2 text-[13px] text-muted">
        <li>· Add a stall with menu + photos</li>
        <li>· Earn up to +60 points per listing</li>
        <li>· Help neighbours find real food</li>
      </ul>
    </div>
  );
}

export function AddStallScreen() {
  const { state, dispatch } = useApp();

  if (state.addStage === 'done' && state.done) {
    const s = ST(state.done, state.extraStalls, state.stallEdits)!;
    const p = state.points % 150;
    return (
      <DesktopPageShell>
        <div className="mt-6 text-center lg:mt-2">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-soft text-brand"><PartyPopper size={36} strokeWidth={1.5} aria-hidden /></div>
          <h1 className="mt-3 text-[24px] font-extrabold">{s.name} is on the map</h1>
          <p className="text-muted">Thanks for helping neighbours eat well.</p>
        </div>
        <div className="mt-4 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-center justify-between"><b>+{state.lastPts} Local Guide points</b><span className="rounded-md bg-brand-soft px-2 py-0.5 text-[11.5px] font-bold text-brand">Level {lvl(state.points)}</span></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-soft"><div className="h-full rounded-full bg-brand" style={{ width: (p / 150 * 100) + '%' }} /></div>
          <div className="mt-1 text-[12px] text-muted">{150 - p} points to Level {lvl(state.points) + 1}</div>
        </div>
        <div className="mt-3 rounded-2xl bg-card p-4 shadow-card">
          <b>Bring the vendor onto Chatorey</b>
          <p className="mb-2.5 mt-1 text-[13px] text-muted">So people can order from {s.name} and get it delivered.</p>
          <Button variant="primary" block onClick={async () => {
            const r = await shareInviteVendor(s.name, s.id);
            dispatch({ type: 'TOAST', msg: r === 'shared' ? 'Invite sent' : r === 'copied' ? 'Invite message copied' : 'Could not copy invite' });
          }}>Share invite with vendor</Button>
        </div>
        <div className="mt-4 flex gap-2.5">
          <Button className="flex-1" onClick={() => dispatch({ type: 'SET_STALL', id: s.id })}>View listing</Button>
          <Button className="flex-1" onClick={() => dispatch({ type: 'FLOW_ANOTHER' })}>Add another</Button>
        </div>
      </DesktopPageShell>
    );
  }

  if (state.addStage === 'flow' && state.draft) return <AddFlowWizard />;

  const hasDraft = state.draft && (state.draft.name || state.draft.items.length || state.draft.photos.length);
  const recent = allStalls(state.extraStalls).filter(s => s.addedBy).slice(-3).reverse();
  return (
    <DesktopPageShell aside={<AddAside points={state.points} />}>
      <div className="pt-4 lg:hidden"><h1 className="text-[22px] font-extrabold" id="add-heading">Add a food spot</h1></div>
      <div className="mt-3 rounded-[20px] p-[22px] text-white lg:mt-0" style={{ background: 'linear-gradient(120deg,#C2185B,#E8590C)' }}>
        <MapPin size={36} className="opacity-95" strokeWidth={1.5} aria-hidden />
        <h2 className="mt-1.5 text-[22px] font-extrabold leading-tight">Put a hidden stall on the map</h2>
        <p className="mt-1 opacity-90">The best food in Jaipur is in lanes nobody has written about. Add one and earn Local Guide points.</p>
      </div>
      {hasDraft && (
        <div className="mt-3 rounded-2xl bg-card p-3.5 shadow-card">
          <div className="flex items-center justify-between">
            <div><b>Draft in progress</b><div className="text-[13px] text-muted">{state.draft!.name || 'Untitled stall'} · step {state.step + 1} of 7</div></div>
            <Button variant="primary" size="sm" onClick={() => dispatch({ type: 'RESUME_FLOW' })}>Resume</Button>
          </div>
        </div>
      )}
      <div className="pb-2.5 pt-[22px] lg:pt-6"><h2 className="text-[18px] font-extrabold">How it works</h2></div>
      <div className="rounded-2xl bg-card px-4 shadow-card">
        {([
          [Camera, 'Snap the menu', 'Take a photo of the price board, or add items by hand.'],
          [MapPin, 'Drop a pin', 'Show exactly where it is, with a landmark so others can find it.'],
          [Star, 'Share your take', 'Tell people what to order and whether it’s worth it.'],
        ] as const).map(([Ico, title, desc], i) => (
          <div key={title} className={`flex gap-3.5 py-3.5 ${i ? 'border-t border-line' : ''}`}>
            <div className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] bg-brand-soft text-brand"><Ico size={20} strokeWidth={1.75} aria-hidden /></div>
            <div><b>{title}</b><div className="text-[13px] text-muted">{desc}</div></div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-2xl bg-card p-3.5 shadow-card lg:hidden">
        <div><b>Earn up to +60 points</b><div className="text-[13px] text-muted">You're Level {lvl(state.points)} with {state.points} points</div></div>
        <span className="rounded-md bg-brand-soft px-2 py-0.5 text-[11.5px] font-bold text-brand">Local Guide</span>
      </div>
      <div className="pt-4 lg:max-w-md">
        <Button variant="primary" size="big" block onClick={() => {
          if (hasDraft) dispatch({ type: 'EXIT_FLOW_DISCARD' });
          dispatch({ type: 'START_FLOW' });
        }}>{hasDraft ? 'Start a new spot instead' : 'Add a food spot'}</Button>
      </div>
      {recent.length > 0 && (
        <>
          <div className="pb-2.5 pt-8"><h2 className="text-[18px] font-extrabold">Recently added by neighbours</h2></div>
          <div className="stall-grid !px-0 !max-w-none lg:grid-cols-1 xl:grid-cols-2">{recent.map(s => <StallCardWide key={s.id} stall={s} />)}</div>
        </>
      )}
    </DesktopPageShell>
  );
}
