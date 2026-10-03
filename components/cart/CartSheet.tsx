'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { ST, rs } from '../../lib/helpers';
import { Sheet } from '../ui/Sheet';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

export function CartSheet() {
  const { state, dispatch } = useApp();
  const open = state.sheet?.t === 'cart';
  const s = state.cart.sid ? ST(state.cart.sid, state.extraStalls, state.stallEdits) : null;
  if (!s) return <Sheet open={open} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })}><div /></Sheet>;
  const lines = Object.entries(state.cart.items).filter(([, q]) => q > 0).map(([k, q]) => ({ k: +k, it: s.items[+k], q }));
  const sub = lines.reduce((a, l) => a + l.it.p * l.q, 0);

  return (
    <Sheet open={open} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="Your basket">
      <div className="flex items-center justify-between"><h2 className="text-[20px] font-extrabold">Your basket</h2><button onClick={() => dispatch({ type: 'SET_SHEET', sheet: null })} aria-label="Close" className="grid h-[38px] w-[38px] place-items-center rounded-full bg-soft"><Icon name="close" /></button></div>
      <p className="mb-2 mt-0.5 text-[13px] text-muted">From {s.name}</p>
      {lines.map(l => (
        <div key={l.k} className="flex justify-between border-t border-line py-4 first:border-t-0">
          <div><b>{l.it.n}</b><div className="text-[13px] text-muted">{rs(l.it.p)} each</div></div>
          <div className="inline-flex items-center overflow-hidden rounded-xl border border-line bg-accent text-accent-ink">
            <button type="button" onClick={() => dispatch({ type: 'DEC_CART', k: l.k })} aria-label={`Remove one ${l.it.n}`} className="touch-target grid place-items-center px-2 text-[20px] font-extrabold">−</button>
            <span className="min-w-[28px] text-center font-extrabold">{l.q}</span>
            <button type="button" onClick={() => dispatch({ type: 'ADD_TO_CART', sid: s.id, k: l.k })} aria-label={`Add one ${l.it.n}`} className="touch-target grid place-items-center px-2 text-[20px] font-extrabold">+</button>
          </div>
        </div>
      ))}
      <label className="mb-1.5 mt-4 block text-[13.5px] font-bold" htmlFor="cnote">Cooking instructions (optional)</label>
      <input id="cnote" maxLength={80} placeholder="e.g. less spicy, extra chutney" defaultValue={state.note}
        onChange={e => dispatch({ type: 'SET_NOTE', note: e.target.value })}
        className="w-full rounded-xl border border-line bg-card px-3 py-3 outline-none" />
      <div className="my-3.5 flex justify-between"><b>Subtotal</b><b>{rs(sub)}</b></div>
      <Button variant="primary" size="big" block onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'checkout' } })}>Continue to checkout</Button>
    </Sheet>
  );
}
