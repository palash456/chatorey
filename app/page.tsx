'use client';
import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { HomeScreen } from '../components/home/HomeScreen';
import { ExploreScreen } from '../components/explore/ExploreScreen';
import { AddStallScreen } from '../components/addflow/AddStallScreen';
import { OrdersScreen } from '../components/orders/OrdersScreen';
import { ProfileScreen } from '../components/profile/ProfileScreen';
import { VendorScreen } from '../components/vendor/VendorScreen';
import { StallDetail } from '../components/stall/StallDetail';
import { BottomNav } from '../components/layout/BottomNav';
import { SideNav } from '../components/layout/SideNav';
import { DesktopTopBar } from '../components/layout/DesktopTopBar';
import { CartSheet } from '../components/cart/CartSheet';
import { CheckoutSheet } from '../components/cart/CheckoutSheet';
import { MiscSheets } from '../components/ui/MiscSheets';
import { Toast } from '../components/ui/Toast';
import { StoryViewer } from '../components/stories/StoryViewer';
import { ReelsViewer } from '../components/reels/ReelsViewer';
import { rs, ST } from '../lib/helpers';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';

function CartBar() {
  const { state, dispatch } = useApp();
  const count = Object.values(state.cart.items).reduce((a, b) => a + b, 0);
  if (!(count > 0 && !state.vendor && !state.sheet)) return null;
  let subtotal = 0;
  if (state.cart.sid) {
    const s = ST(state.cart.sid, state.extraStalls, state.stallEdits);
    if (s) subtotal = Object.entries(state.cart.items).reduce((a, [k, q]) => a + s.items[+k].p * q, 0);
  }
  return (
    <div className={`fixed left-3 z-[32] right-3 lg:absolute lg:left-auto lg:right-8 lg:max-w-md lg:w-full ${state.stallId ? 'bottom-[calc(14px+env(safe-area-inset-bottom,0px))] lg:bottom-6' : 'bottom-[calc(76px+env(safe-area-inset-bottom,0px))] lg:bottom-6'}`}>
      <button type="button" onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'cart' } })} aria-label={`View basket, ${count} items, ${rs(subtotal)}`} className="flex min-h-[48px] w-full items-center justify-between rounded-xl bg-green px-3.5 py-3 text-[14px] font-semibold text-white shadow-[0_6px_16px_rgba(0,0,0,.2)] lg:min-h-[52px] lg:rounded-2xl lg:px-4 lg:py-3.5 lg:text-base lg:font-extrabold">
        <span>{count} {count === 1 ? 'item' : 'items'} · {rs(subtotal)}</span>
        <span>View basket ›</span>
      </button>
    </div>
  );
}

function Screen() {
  const { state } = useApp();
  if (state.vendor) return <VendorScreen />;
  switch (state.tab) {
    case 'home': return <HomeScreen />;
    case 'explore': return <ExploreScreen />;
    case 'add': return <AddStallScreen />;
    case 'orders': return <OrdersScreen />;
    case 'profile': return <ProfileScreen />;
    default: return null;
  }
}

function Shell() {
  const { state, dispatch } = useApp();
  return (
    <div id="app-shell">
      <SideNav />
      <div id="app-stage">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ErrorBoundary>
      <div className="desktop-stage-column">
      <main id="main-content" tabIndex={-1}>
        <DesktopTopBar />
        <div className="desktop-main-body"><Screen /></div>
      </main>
      </div>
      {state.stallId && !state.vendor && (
        <button
          type="button"
          aria-label="Close stall"
          className="absolute inset-0 z-[29] hidden bg-black/35 lg:block"
          onClick={() => dispatch({ type: 'SET_STALL', id: null })}
        />
      )}
      {state.stallId && !state.vendor && <StallDetail id={state.stallId} />}
      <CartBar />
      <BottomNav />
      <CartSheet />
      <CheckoutSheet />
      <MiscSheets />
      <StoryViewer />
      <ReelsViewer />
      <Toast />
      </ErrorBoundary>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
