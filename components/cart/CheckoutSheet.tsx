'use client';
import React from 'react';
import { PARTNERS } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { ST, dist, partnerById, rs, fd, eta, deliveryFee } from '../../lib/helpers';
import { Sheet } from '../ui/Sheet';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { Pill } from '../ui/Pill';

function addrLabel(a: { label: string; area: string }) {
  return `${a.label} · ${a.area}`;
}

export function CheckoutSheet() {
  const { state, dispatch } = useApp();
  const open = state.sheet?.t === 'checkout';
  const s = state.cart.sid ? ST(state.cart.sid, state.extraStalls, state.stallEdits) : null;
  if (!s) return <Sheet open={open} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })}><div /></Sheet>;
  const p = partnerById(state.partner);
  const sub = Object.entries(state.cart.items).filter(([, v]) => v > 0).reduce((a, [k, v]) => a + s.items[+k].p * v, 0);
  const fee = deliveryFee(s, sub, state.area, state.partner);
  const total = sub + fee + 5;
  const promoNote = s.freeDeliveryPromo && sub >= 150;

  return (
    <Sheet open={open} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="Checkout">
      <div className="flex items-center justify-between"><h2 className="text-[20px] font-extrabold">Checkout</h2><button onClick={() => dispatch({ type: 'SET_SHEET', sheet: null })} aria-label="Close" className="grid h-[38px] w-[38px] place-items-center rounded-full bg-soft"><Icon name="close" /></button></div>

      <fieldset className="mt-4 border-0 p-0">
        <legend className="mb-1.5 block text-[13.5px] font-bold">Deliver to</legend>
        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Delivery address">
        {state.addresses.map(a => {
          const label = addrLabel(a);
          const selected = state.addr === label;
          return (
            <button key={a.id} type="button" role="radio" aria-checked={selected} onClick={() => dispatch({ type: 'SET_ADDR', addr: label })} className={`min-h-[44px] rounded-xl border px-3.5 py-3 text-left ${selected ? 'border-brand bg-brand-soft' : 'border-line'}`}>
              <b className="text-[14px]">{label}</b>
              <div className="text-[13px] text-muted">{a.text}</div>
            </button>
          );
        })}
        <button type="button" onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'addaddr' } })} className="min-h-[44px] rounded-xl border border-dashed border-line px-3.5 py-2.5 text-[13px] font-semibold text-muted">+ Add new address</button>
        </div>
      </fieldset>

      <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">Delivery partner</label>
      {PARTNERS.map(x => (
        <button key={x.id} disabled={x.soon} onClick={() => dispatch({ type: 'SET_PARTNER', partner: x.id })}
          className={`mb-2 flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left ${x.id === state.partner ? 'border-brand' : 'border-line'} ${x.soon ? 'opacity-55' : ''}`}>
          <span><b>{x.name}</b><br /><span className="text-[13px] text-muted">{x.soon ? 'Coming soon' : `Parcel pickup from the stall · ~${x.quote(dist(state.area, s)).eta} min ride`}</span></span>
          {x.id === state.partner && <Pill tone="green">Selected</Pill>}
        </button>
      ))}
      <button type="button" onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'partners' } })} className="mb-2 text-[13px] font-bold text-brand">How delivery partners work</button>
      <div className="rounded-xl bg-soft p-3 text-[13px]">The stall cooks your food. {p.name} picks up the parcel and delivers it. The delivery fee goes to them.</div>

      <fieldset className="mt-4 border-0 p-0">
        <legend className="mb-1.5 block text-[13.5px] font-bold">Pay with</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Payment method">
          {['GPay', 'PhonePe', 'Paytm', 'Card'].map(a => (
            <button key={a} type="button" role="radio" aria-checked={state.pay === a} onClick={() => dispatch({ type: 'SET_PAY', pay: a })} className={`min-h-[44px] rounded-full border px-3.5 py-1.5 text-[13px] font-semibold ${state.pay === a ? 'border-brand bg-brand-soft text-brand' : 'border-line'}`}>{a}</button>
          ))}
        </div>
      </fieldset>

      <div className="my-4">
        <div className="flex justify-between"><span>Food</span><span>{rs(sub)}</span></div>
        <div className="flex justify-between"><span>Delivery by {p.name} ({fd(dist(state.area, s))})</span><span>{fee === 0 && promoNote ? <span className="text-green">Free</span> : rs(fee)}</span></div>
        {promoNote && fee === 0 && <p className="mt-1 text-[12px] text-green">Weekend free-delivery promo from this stall</p>}
        <div className="flex justify-between"><span>Chatorey fee</span><span>{rs(5)}</span></div>
        <div className="mt-2 flex justify-between text-[17px]"><b>Total</b><b>{rs(total)}</b></div>
        <p className="mt-1.5 text-[13px] text-muted">Estimated arrival: {eta(state.area, state.partner, s)} min · Pay via {state.pay}</p>
      </div>
      <Button variant="primary" size="big" block onClick={() => dispatch({ type: 'PLACE_ORDER' })}>Place order · {rs(total)}</Button>
    </Sheet>
  );
}
