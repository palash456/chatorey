'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { useIsLgUp } from '../../lib/useMediaQuery';
import { Icon } from '../ui/Icon';

export function BottomNav() {
  const { state, dispatch } = useApp();
  const isLg = useIsLgUp();

  if (state.vendor) {
    const newCount = state.orders.filter(o => o.sid === state.vsid && o.status === 0 && !o.cancelled).length;
    const Item = ({ t, label, icon }: { t: string; label: string; icon: string }) => (
      <button
        type="button"
        onClick={() => dispatch({ type: 'VENDOR_TAB', t })}
        aria-current={state.vtab2 === t ? 'page' : undefined}
        className={`relative flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 py-1.5 text-[11px] font-medium ${state.vtab2 === t ? 'text-brand' : 'text-muted'}`}
      >
        <Icon name={icon} />{label}
        {t === 'today' && newCount > 0 && (
          <span className="absolute top-1 left-[calc(50%+4px)] grid h-[17px] min-w-[17px] place-items-center rounded-full bg-brand px-1 text-[10.5px] font-extrabold text-white">{newCount}</span>
        )}
      </button>
    );
    return (
      <nav aria-label="Vendor (mobile tabs)" aria-hidden={isLg} className="fixed inset-x-0 bottom-0 z-30 flex items-end gap-1 rounded-t-[20px] border-t border-line/80 bg-card/95 px-1 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-nav backdrop-blur-md supports-[padding:max(0px)]:pb-[max(10px,env(safe-area-inset-bottom))] lg:hidden">
        <Item t="today" label="Orders" icon="bag" />
        <Item t="menu" label="Menu" icon="list" />
        <button type="button" onClick={() => dispatch({ type: 'VENDOR_OFF' })} aria-label="Exit vendor mode" className="flex min-h-[52px] flex-1 flex-col items-center justify-center gap-[3px] py-2 text-[12px] font-semibold text-muted">
          <Icon name="back" />Exit
        </button>
      </nav>
    );
  }

  const activeOrders = state.orders.filter(o => o.mine && o.status < 6 && !o.cancelled).length;
  const Item = ({ t, label, icon }: { t: typeof state.tab; label: string; icon: string }) => (
    <button
      type="button"
      onClick={() => dispatch({ type: 'SET_TAB', tab: t })}
      aria-current={state.tab === t ? 'page' : undefined}
      className={`relative flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 py-1 text-[11px] font-medium ${state.tab === t ? 'text-brand' : 'text-muted'}`}
    >
      <Icon name={icon} />{label}
      {t === 'orders' && activeOrders > 0 && (
        <span className="absolute top-1 left-[calc(50%+4px)] grid h-[17px] min-w-[17px] place-items-center rounded-full bg-brand px-1 text-[10.5px] font-extrabold text-white">{activeOrders}</span>
      )}
    </button>
  );
  return (
    <nav aria-label="Main (mobile tabs)" aria-hidden={isLg} className="fixed inset-x-0 bottom-0 z-30 flex items-end gap-1 rounded-t-[20px] border-t border-line/80 bg-card/95 px-1 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-nav backdrop-blur-md lg:hidden">
      <Item t="home" label="Home" icon="home" />
      <Item t="explore" label="Explore" icon="search" />
      <button type="button" onClick={() => dispatch({ type: 'SET_TAB', tab: 'add' })} className="-mt-[22px] flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 py-0.5 text-[11px] font-medium text-ink" aria-label="Add food">
        <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-brand text-white shadow-[0_4px_12px_rgba(216,30,91,.35)]"><Icon name="plus" size={22} /></span>
        Add food
      </button>
      <Item t="orders" label="Orders" icon="bag" />
      <Item t="profile" label="Profile" icon="user" />
    </nav>
  );
}
