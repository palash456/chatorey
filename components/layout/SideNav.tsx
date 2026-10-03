'use client';
import React from 'react';
import { useIsLgUp } from '../../lib/useMediaQuery';
import { Home, Search, Plus, ShoppingBag, User, LogOut, List, BarChart3, Star, Megaphone, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const VTABS: [string, string, React.ReactNode][] = [
  ['today', 'Today', <ShoppingBag size={20} strokeWidth={1.75} />],
  ['menu', 'Menu', <List size={20} strokeWidth={1.75} />],
  ['analytics', 'Analytics', <BarChart3 size={20} strokeWidth={1.75} />],
  ['reviews', 'Reviews', <Star size={20} strokeWidth={1.75} />],
  ['promos', 'Promotions', <Megaphone size={20} strokeWidth={1.75} />],
  ['settings', 'Settings', <Settings size={20} strokeWidth={1.75} />]
];

function NavItem({
  active,
  onClick,
  icon,
  label,
  badge
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold transition-colors ${
        active ? 'bg-brand-soft text-brand' : 'text-muted hover:bg-soft hover:text-ink'
      }`}
    >
      <span className={`flex-none ${active ? 'text-brand' : 'text-muted'}`}>{icon}</span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {badge != null && badge > 0 ? (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-[10px] font-extrabold text-white">{badge}</span>
      ) : null}
    </button>
  );
}

function VendorSideNav() {
  const { state, dispatch } = useApp();
  const isLg = useIsLgUp();
  const newCount = state.orders.filter(o => o.sid === state.vsid && o.status === 0 && !o.cancelled).length;

  return (
    <aside className="sidebar-shell hidden lg:flex" aria-hidden={!isLg}>
      <div className="border-b border-line px-5 py-5">
        <b className="text-[13px] font-bold uppercase tracking-wide text-muted">Vendor mode</b>
        <p className="mt-1 text-[18px] font-extrabold text-ink">Your stall</p>
      </div>
      <nav aria-label="Vendor (sidebar)" className="flex flex-1 flex-col gap-0.5 p-3">
        {VTABS.map(([t, label, icon]) => (
          <NavItem
            key={t}
            active={state.vtab2 === t}
            onClick={() => dispatch({ type: 'VENDOR_TAB', t })}
            icon={icon}
            label={label}
            badge={t === 'today' ? newCount : undefined}
          />
        ))}
      </nav>
      <div className="border-t border-line p-3">
        <button
          type="button"
          onClick={() => dispatch({ type: 'VENDOR_OFF' })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-muted hover:bg-soft"
        >
          <LogOut size={20} strokeWidth={1.75} /> Exit vendor mode
        </button>
      </div>
    </aside>
  );
}

export function SideNav() {
  const { state, dispatch } = useApp();
  const isLg = useIsLgUp();
  if (state.vendor) return <VendorSideNav />;

  const activeOrders = state.orders.filter(o => o.mine && o.status < 6 && !o.cancelled).length;

  return (
    <aside className="sidebar-shell hidden lg:flex" aria-hidden={!isLg}>
      <div className="flex items-center gap-3 border-b border-line px-5 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/icon.jpg" alt="" className="h-10 w-10 rounded-xl shadow-card" />
        <div className="min-w-0">
          <b className="block text-[20px] font-extrabold tracking-tight text-brand">Chatorey</b>
          <span className="block truncate text-[12px] text-muted">Jaipur food map</span>
        </div>
      </div>
      <nav aria-label="Main (sidebar)" className="flex flex-1 flex-col gap-0.5 p-3">
        <NavItem active={state.tab === 'home'} onClick={() => dispatch({ type: 'SET_TAB', tab: 'home' })} icon={<Home size={20} strokeWidth={1.75} />} label="Home" />
        <NavItem active={state.tab === 'explore'} onClick={() => dispatch({ type: 'SET_TAB', tab: 'explore' })} icon={<Search size={20} strokeWidth={1.75} />} label="Explore" />
        <NavItem active={state.tab === 'add'} onClick={() => dispatch({ type: 'SET_TAB', tab: 'add' })} icon={<Plus size={20} strokeWidth={1.75} />} label="Add food spot" />
        <NavItem active={state.tab === 'orders'} onClick={() => dispatch({ type: 'SET_TAB', tab: 'orders' })} icon={<ShoppingBag size={20} strokeWidth={1.75} />} label="Orders" badge={activeOrders} />
        <NavItem active={state.tab === 'profile'} onClick={() => dispatch({ type: 'SET_TAB', tab: 'profile' })} icon={<User size={20} strokeWidth={1.75} />} label="Profile" />
      </nav>
      <div className="border-t border-line p-4">
        <button
          type="button"
          onClick={() => dispatch({ type: 'VENDOR_ON' })}
          className="w-full rounded-xl border border-line bg-soft px-3 py-3 text-left text-[13px] font-semibold text-ink hover:bg-line/60"
        >
          <b className="block text-[14px]">Run a stall?</b>
          <span className="text-muted">Open vendor dashboard</span>
        </button>
      </div>
    </aside>
  );
}
