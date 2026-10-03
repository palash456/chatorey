'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { ST, ago, rs } from '../../lib/helpers';
import { OrderTracker } from './OrderTracker';
import { Button } from '../ui/Button';
import { Pill } from '../ui/Pill';
import { EmptyState } from '../ui/EmptyState';
import { FoodIconBadge } from '../ui/FoodIcon';
import { UtensilsCrossed } from 'lucide-react';
import { DesktopPageShell } from '../layout/DesktopPageShell';

export function OrdersScreen() {
  const { state, dispatch } = useApp();
  const mine = state.orders.filter(o => o.mine);
  const active = mine.filter(o => o.status < 6);
  const past = mine.filter(o => o.status >= 6);

  const aside = (
    <div className="desktop-panel sticky top-2 p-5">
      <b className="text-[15px]">Need food?</b>
      <p className="mt-1 text-[13px] text-muted">Browse stalls near {state.area} and place an order — tracking shows up here.</p>
      <Button variant="primary" className="mt-3 w-full" onClick={() => dispatch({ type: 'SET_TAB', tab: 'explore' })}>Explore stalls</Button>
    </div>
  );

  return (
    <DesktopPageShell aside={aside}>
      <div className="pt-4 lg:hidden"><h1 className="text-[22px] font-extrabold" id="orders-heading">Orders</h1></div>
      <div className="h-3 lg:h-0" />
      <div>
        {active.length ? active.map(o => <OrderTracker key={o.id} o={o} />) : (
          <EmptyState icon={UtensilsCrossed} title="Nothing cooking right now" description="Find something worth eating and it'll show up here.">
            <Button variant="primary" onClick={() => dispatch({ type: 'SET_TAB', tab: 'explore' })}>Find food</Button>
          </EmptyState>
        )}
        {past.length > 0 && (
          <>
            <div className="pb-2.5 pt-[22px]"><h2 className="text-[19px] font-extrabold">Past orders</h2></div>
            {past.map(o => {
              const s = ST(o.sid, state.extraStalls, state.stallEdits);
              if (!s) return null;
              return (
                <div key={o.id} className="mb-3.5 rounded-2xl bg-card p-3.5 shadow-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FoodIconBadge food={s.foods[0] || 'other'} colors={s.c} size={46} iconSize={22} />
                      <div><b>{s.name}</b><div className="text-[12.5px] text-muted">{ago(o.placedAt)} · {rs(o.total)}</div></div>
                    </div>
                    <Pill tone="green">Delivered</Pill>
                  </div>
                  <div className="my-2.5 text-[13.5px] text-muted">{o.items.map((i, k) => <span key={k}>{i.q} × {i.n}{k < o.items.length - 1 ? ', ' : ''}</span>)}</div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => dispatch({ type: 'REORDER', id: o.id })}>Order again</Button>
                    {!o.rated && <Button size="sm" className="flex-1" onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'review', sid: s.id } })}>Rate it</Button>}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </DesktopPageShell>
  );
}
