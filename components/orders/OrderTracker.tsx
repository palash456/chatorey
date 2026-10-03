'use client';
import React from 'react';
import type { Order } from '../../lib/types';
import { useApp } from '../../context/AppContext';
import { ST, eta, rs, clock } from '../../lib/helpers';
import { Pill } from '../ui/Pill';
import { Button } from '../ui/Button';
import { Bike, Check } from 'lucide-react';
import { isDemoControlsEnabled } from '../../lib/demo';

const STAGES = [
  { t: 'Order sent', s: 'Waiting for the stall to say yes', w: 'stall' },
  { t: 'Stall accepted', s: 'You’re in the queue', w: 'stall' },
  { t: 'Cooking now', s: 'Made fresh for your order', w: 'stall' },
  { t: 'Ready and packed', s: 'Sealed for the ride', w: 'stall' },
  { t: 'Rider assigned', s: 'Parcel pickup booked', w: 'partner' },
  { t: 'On the way to you', s: 'Picked up from the stall', w: 'partner' },
  { t: 'Delivered', s: 'Enjoy it while it’s hot', w: 'partner' }
];

export function OrderTracker({ o }: { o: Order }) {
  const { state, dispatch } = useApp();
  const s = ST(o.sid, state.extraStalls, state.stallEdits);
  if (!s) return null;
  if (o.cancelled) {
    return <div className="mb-3.5 rounded-2xl bg-card p-4 shadow-card"><b>{s.name}</b><p className="mt-1.5">The stall couldn’t take this order right now. You haven’t been charged.</p></div>;
  }
  const cur = o.status;
  const min = Math.max(4, eta(state.area, state.partner, s) - cur * 4);
  const canCancel = o.mine && cur < 3;

  return (
    <div className="mb-3.5 rounded-2xl bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div><div className="text-[12px] text-muted">{o.id} · {s.name}</div><div className="mt-0.5 text-[18px] font-extrabold leading-tight">{STAGES[cur].t}</div></div>
        {cur < 6 && <div className="rounded-xl bg-green-bg px-3 py-1.5 text-center font-extrabold leading-tight text-green"><b className="block text-[22px]">{min}</b><span className="text-[11px]">min</span></div>}
      </div>
      <div className="my-3.5 flex gap-1">{STAGES.map((_, i) => <i key={i} className={`h-1 flex-1 rounded-full ${i <= cur ? 'bg-green' : 'bg-line'}`} />)}</div>
      <div className="mb-3.5 text-[13px] text-muted">{o.items.map((i, k) => <span key={k}>{i.q} × {i.n}{k < o.items.length - 1 ? ', ' : ''}</span>)} · <b className="text-ink">{rs(o.total)}</b></div>
      {STAGES.map((st, i) => {
        const done = i < cur || cur === 6, now = i === cur;
        return (
          <div key={i} className="relative flex gap-3 pb-3.5 last:pb-0">
            {i < STAGES.length - 1 && <span className={`absolute left-[11px] top-[22px] bottom-[-2px] w-[2px] ${done ? 'bg-green' : 'bg-line'}`} />}
            <div className={`z-10 grid h-[22px] w-[22px] flex-none place-items-center rounded-full border-2 text-[11px] font-extrabold ${done ? 'border-green bg-green text-white' : now ? 'border-brand bg-brand-soft' : 'border-line bg-card'}`}>{done ? <Check size={12} strokeWidth={3} aria-hidden /> : ''}</div>
            <div>
              <div className={`font-bold ${!done && !now ? 'text-muted font-semibold' : ''}`}>{st.t} <Pill tone={st.w === 'stall' ? 'default' : 'green'} className="text-[10.5px]">{st.w === 'stall' ? 'Stall' : o.partner.name}</Pill></div>
              <div className="text-[13px] text-muted">{i === 4 && o.rider && cur >= 4 ? `${o.rider.n} is coming to the stall` : st.s}{o.times[i] ? ' · ' + clock(o.times[i]) : ''}</div>
            </div>
          </div>
        );
      })}
      {o.rider && cur >= 4 && cur < 6 && (
        <div className="mt-3.5 flex items-center justify-between rounded-xl bg-soft p-3">
          <div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-ink"><Bike size={18} aria-hidden /></span><div><b>{o.rider.n}</b><div className="text-[12px] text-muted">{o.partner.name} rider · {o.rider.v} · ★ {o.rider.r}</div></div></div>
          <Pill>OTP {o.otp}</Pill>
        </div>
      )}
      <div className="mt-3.5 rounded-xl bg-soft p-3 text-[13px]"><b>Who does what:</b> The stall cooks and packs your food. {o.partner.name} picks it up and delivers it. Chatorey handles finding and ordering. For anything about the ride, contact {o.partner.name}.</div>
      {canCancel && (
        <Button block variant="default" size="sm" className="mt-3 text-red" onClick={() => dispatch({ type: 'CANCEL_ORDER', id: o.id })}>Cancel order</Button>
      )}
      {isDemoControlsEnabled() && cur < 6 && (
        <Button block variant="default" size="sm" className="mt-3" onClick={() => dispatch({ type: 'ADVANCE_ORDER', id: o.id })}>Demo: jump to next step</Button>
      )}
    </div>
  );
}
