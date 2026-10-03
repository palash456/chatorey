'use client';
import React, { useState } from 'react';
import { AREAS, PARTNERS } from '../../lib/data';
import { useApp } from '../../context/AppContext';
import { ST } from '../../lib/helpers';
import { clearPersist } from '../../lib/persist';
import { Sheet } from './Sheet';
import { Icon } from './Icon';
import { Button } from './Button';
import { Pill } from './Pill';

function CloseBtn() {
  const { dispatch } = useApp();
  return <button onClick={() => dispatch({ type: 'SET_SHEET', sheet: null })} aria-label="Close" className="grid h-[38px] w-[38px] place-items-center rounded-full bg-soft"><Icon name="close" /></button>;
}

function AreaSheet() {
  const { state, dispatch } = useApp();
  return (
    <Sheet open={state.sheet?.t === 'area'} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="Choose area">
      <div className="flex items-center justify-between"><h2 className="text-[20px] font-extrabold">Where are you?</h2><CloseBtn /></div>
      <p className="mb-2 mt-1 text-[13px] text-muted">Distances and delivery fees update from here.</p>
      {Object.keys(AREAS).map(a => (
        <button type="button" key={a} onClick={() => { dispatch({ type: 'SET_AREA', area: a }); dispatch({ type: 'SET_SHEET', sheet: null }); dispatch({ type: 'TOAST', msg: 'Showing food near ' + a }); }} className="flex min-h-[44px] w-full items-center justify-between border-t border-line py-3.5 text-left first:border-t-0">
          <b>{a}</b>{a === state.area && <Pill tone="green">Selected</Pill>}
        </button>
      ))}
    </Sheet>
  );
}

function ClashSheet() {
  const { state, dispatch } = useApp();
  const sheet = state.sheet;
  if (sheet?.t !== 'clash') return <Sheet open={false} onClose={() => {}}><div /></Sheet>;
  const s = ST(state.cart.sid!, state.extraStalls, state.stallEdits);
  return (
    <Sheet open onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="Start a new basket">
      <h2 className="text-[20px] font-extrabold">Start a new basket?</h2>
      <p className="mb-4 mt-1.5 text-muted">Your basket has food from {s?.name}. Orders go to one stall at a time so everything is cooked fresh.</p>
      <div className="flex gap-2.5">
        <Button className="flex-1" onClick={() => dispatch({ type: 'SET_SHEET', sheet: null })}>Keep current</Button>
        <Button variant="primary" className="flex-1" onClick={() => dispatch({ type: 'CLEAR_CART_START', sid: sheet.sid, k: sheet.k })}>Start new</Button>
      </div>
    </Sheet>
  );
}

function PartnersSheet() {
  const { state, dispatch } = useApp();
  return (
    <Sheet open={state.sheet?.t === 'partners'} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="Delivery partners">
      <div className="flex items-center justify-between"><h2 className="text-[20px] font-extrabold">Delivery partners</h2><CloseBtn /></div>
      <p className="mb-2.5 mt-1 text-[13px] text-muted">Chatorey works with delivery partners for pickup. More can be added without changing how you order.</p>
      {PARTNERS.map(x => (
        <div key={x.id} className="mb-2 flex w-full items-center justify-between rounded-xl border border-line px-3.5 py-3 text-left">
          <span><b>{x.name}</b><br /><span className="text-[13px] text-muted">{x.soon ? 'Coming soon to Jaipur' : 'Parcel pickup from stalls · live in checkout'}</span></span>
          {!x.soon && <Pill tone="green">Active</Pill>}
        </div>
      ))}
    </Sheet>
  );
}

function ExitFlowSheet() {
  const { state, dispatch } = useApp();
  return (
    <Sheet open={state.sheet?.t === 'exitflow'} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="Leave add stall flow">
      <h2 className="text-[20px] font-extrabold">Leave without publishing?</h2>
      <p className="mb-4 mt-1.5 text-muted">We can keep your draft so you can pick up where you left off.</p>
      <Button variant="primary" block onClick={() => dispatch({ type: 'EXIT_FLOW_SAVE' })}>Save draft and leave</Button>
      <div className="mt-2.5 flex gap-2.5">
        <Button className="flex-1" onClick={() => dispatch({ type: 'SET_SHEET', sheet: null })}>Keep editing</Button>
        <Button className="flex-1 text-red" onClick={() => dispatch({ type: 'EXIT_FLOW_DISCARD' })}>Discard</Button>
      </div>
    </Sheet>
  );
}

function ReviewSheet() {
  const { state, dispatch } = useApp();
  const [r, setR] = useState(0);
  const [rec, setRec] = useState<boolean | null>(null);
  const sheet = state.sheet;
  if (sheet?.t !== 'review') return <Sheet open={false} onClose={() => {}}><div /></Sheet>;
  const s = ST(sheet.sid, state.extraStalls, state.stallEdits);
  return (
    <Sheet open onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label={`Review ${s?.name ?? 'stall'}`}>
      <div className="flex items-center justify-between"><h2 className="text-[20px] font-extrabold">Review {s?.name}</h2><CloseBtn /></div>
      <div className="mt-2 flex gap-1">{[1, 2, 3, 4, 5].map(n => <button key={n} onClick={() => setR(n)} className={`text-[32px] ${r >= n ? 'text-amber' : 'text-line'}`} aria-label={`${n} stars`}>★</button>)}</div>
      <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">Would you order it again?</label>
      <div className="flex rounded-xl bg-soft p-[3px]">
        <button onClick={() => setRec(true)} className={`flex-1 rounded-[9px] py-2 text-[13px] font-bold ${rec === true ? 'bg-card text-ink shadow-card' : 'text-muted'}`}>Yes</button>
        <button onClick={() => setRec(false)} className={`flex-1 rounded-[9px] py-2 text-[13px] font-bold ${rec === false ? 'bg-card text-ink shadow-card' : 'text-muted'}`}>No</button>
      </div>
      <label className="mb-1.5 mt-4 block text-[13.5px] font-bold" htmlFor="rt">What should people know?</label>
      <textarea id="rt" rows={3} placeholder="What did you order? Was it worth it?" className="w-full rounded-xl border border-line bg-card px-3 py-3 outline-none" />
      <Button variant="primary" size="big" block className="mt-4" disabled={!r || rec === null} onClick={() => {
        const text = (document.getElementById('rt') as HTMLTextAreaElement).value;
        dispatch({ type: 'RATE_SUBMIT', sid: sheet.sid, text, stars: r });
      }}>Post review</Button>
    </Sheet>
  );
}

const POST_CATS = ['Recommendations', 'Questions', 'Hidden gems', 'Meetups', 'Vendors'];

function AddAddressSheet() {
  const { state, dispatch } = useApp();
  const [label, setLabel] = useState('Home');
  const [text, setText] = useState('');
  const [area, setArea] = useState(state.area);
  const open = state.sheet?.t === 'addaddr';
  return (
    <Sheet open={open} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="Add delivery address">
      <div className="flex items-center justify-between"><h2 className="text-[20px] font-extrabold">New address</h2><CloseBtn /></div>
      <label className="mb-1.5 mt-4 block text-[13.5px] font-bold" htmlFor="addr-label">Label</label>
      <input id="addr-label" value={label} onChange={e => setLabel(e.target.value)} className="w-full min-h-[44px] rounded-xl border border-line bg-card px-3 py-2.5 outline-none" />
      <label className="mb-1.5 mt-3 block text-[13.5px] font-bold" htmlFor="addr-text">Flat / street / landmark</label>
      <textarea id="addr-text" rows={2} value={text} onChange={e => setText(e.target.value)} className="w-full rounded-xl border border-line bg-card px-3 py-2.5 outline-none" />
      <label className="mb-1.5 mt-3 block text-[13.5px] font-bold" htmlFor="addr-area">Area</label>
      <select id="addr-area" value={area} onChange={e => setArea(e.target.value)} className="w-full min-h-[44px] rounded-xl border border-line bg-card px-3 py-2.5">
        {Object.keys(AREAS).map(a => <option key={a} value={a}>{a}</option>)}
      </select>
      <Button variant="primary" size="big" block className="mt-4" disabled={!text.trim()} onClick={() => {
        dispatch({ type: 'ADD_ADDRESS', label, text, area });
        dispatch({ type: 'SET_SHEET', sheet: null });
      }}>Save address</Button>
    </Sheet>
  );
}

function ComposePostSheet() {
  const { state, dispatch } = useApp();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [cat, setCat] = useState('Recommendations');
  const open = state.sheet?.t === 'compose';
  return (
    <Sheet open={open} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="New community post">
      <div className="flex items-center justify-between"><h2 className="text-[20px] font-extrabold">New post</h2><CloseBtn /></div>
      <label className="mb-1.5 mt-3 block text-[13.5px] font-bold" htmlFor="post-cat">Category</label>
      <select id="post-cat" value={cat} onChange={e => setCat(e.target.value)} className="w-full min-h-[44px] rounded-xl border border-line bg-card px-3 py-2.5">
        {POST_CATS.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <label className="mb-1.5 mt-3 block text-[13.5px] font-bold" htmlFor="post-title">Title</label>
      <input id="post-title" value={title} onChange={e => setTitle(e.target.value)} className="w-full min-h-[44px] rounded-xl border border-line bg-card px-3 py-2.5 outline-none" />
      <label className="mb-1.5 mt-3 block text-[13.5px] font-bold" htmlFor="post-body">What do you want to share?</label>
      <textarea id="post-body" rows={4} value={body} onChange={e => setBody(e.target.value)} className="w-full rounded-xl border border-line bg-card px-3 py-2.5 outline-none" />
      <Button variant="primary" size="big" block className="mt-4" disabled={!title.trim() || !body.trim()} onClick={() => {
        dispatch({ type: 'POST_THREAD', title, body, cat });
        dispatch({ type: 'SET_TAB', tab: 'explore' });
        dispatch({ type: 'ESEG', v: 'community' });
        dispatch({ type: 'SET_SHEET', sheet: null });
      }}>Post</Button>
    </Sheet>
  );
}

function HelpSheet() {
  const { state, dispatch } = useApp();
  const open = state.sheet?.t === 'help';
  return (
    <Sheet open={open} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="Help and support">
      <div className="flex items-center justify-between"><h2 className="text-[20px] font-extrabold">Help</h2><CloseBtn /></div>
      <div className="mt-3 space-y-3 text-[14px]">
        <p><b>Ordering</b> — Pick a stall, add items, checkout with a delivery partner. Stalls cook; riders deliver.</p>
        <p><b>Adding stalls</b> — Use Add food to publish a spot and earn Local Guide points.</p>
        <p><b>Vendor mode</b> — Profile → Open vendor mode to accept orders for Sindhi Camp Kachori (sample order CH-1042 waits for you).</p>
        <p className="text-muted">Prototype only — no real UPI charges. hello@chatorey.app</p>
      </div>
      <Button variant="primary" block className="mt-4" onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'howitworks' } })}>How Chatorey works</Button>
    </Sheet>
  );
}

function WelcomeSheet() {
  const { state, dispatch } = useApp();
  const open = state.sheet?.t === 'welcome';
  return (
    <Sheet open={open} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="Welcome">
      <h2 className="text-[22px] font-extrabold">Welcome to Chatorey</h2>
      <p className="mt-2 text-[14px] text-muted">A Jaipur-first street food prototype — discovery, community, ordering, and vendor tools in one app.</p>
      <ul className="mt-4 space-y-2 text-[14px]">
        <li>• <b>200+</b> Jaipur stalls &amp; cafés (years of local listings)</li>
        <li>• <b>Live order</b> on Orders tab (coffee from Pink City Coffee)</li>
        <li>• <b>Vendor demo</b> — accept CH-1042 in vendor mode</li>
      </ul>
      <Button variant="primary" block className="mt-4" onClick={() => dispatch({ type: 'START_DEMO_PATH' })}>Start 3‑minute tour</Button>
      <Button block className="mt-2" onClick={() => dispatch({ type: 'SET_SHEET', sheet: null })}>Explore on my own</Button>
    </Sheet>
  );
}

function HowItWorksSheet() {
  const { state, dispatch } = useApp();
  const open = state.sheet?.t === 'howitworks';
  return (
    <Sheet open={open} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="How Chatorey works">
      <div className="flex items-center justify-between"><h2 className="text-[20px] font-extrabold">How it works</h2><CloseBtn /></div>
      <div className="mt-4 space-y-4 text-[14px]">
        <div className="rounded-2xl bg-soft p-3.5"><b>1. You (customer)</b><p className="mt-1 text-muted">Browse locals’ picks, save stalls, add dishes to your basket, pay at checkout (prototype: no real charge).</p></div>
        <div className="rounded-2xl bg-soft p-3.5"><b>2. Stall vendor</b><p className="mt-1 text-muted">Accepts the order, cooks fresh, marks ready. Vendor mode shows the Hindi/English buttons stall owners would use.</p></div>
        <div className="rounded-2xl bg-soft p-3.5"><b>3. Delivery partner</b><p className="mt-1 text-muted">Rapido Parcel picks up the sealed parcel and delivers to your address. Fee is shown upfront.</p></div>
        <div className="rounded-2xl bg-soft p-3.5"><b>4. Community</b><p className="mt-1 text-muted">Threads, meetups, and hidden gems — all Jaipur market context.</p></div>
      </div>
      <Button variant="primary" block className="mt-4" onClick={() => dispatch({ type: 'SET_SHEET', sheet: null })}>Close</Button>
    </Sheet>
  );
}

function DemoPathSheet() {
  const { state, dispatch } = useApp();
  const open = state.sheet?.t === 'demopath';
  const steps = [
    { t: 'See a live order', d: 'Orders tab → cooking coffee order', a: () => dispatch({ type: 'SET_TAB', tab: 'orders' }) },
    { t: 'Order street food', d: 'Explore → Sindhi Camp Kachori → ADD → checkout', a: () => { dispatch({ type: 'SET_TAB', tab: 'explore' }); dispatch({ type: 'SET_STALL', id: 's1' }); } },
    { t: 'Be the vendor', d: 'Profile → Vendor mode → Accept CH-1042', a: () => dispatch({ type: 'VENDOR_ON' }) },
    { t: 'Community', d: 'Explore → Community → Sunday food walk', a: () => { dispatch({ type: 'SET_TAB', tab: 'explore' }); dispatch({ type: 'ESEG', v: 'community' }); } },
  ];
  return (
    <Sheet open={open} onClose={() => dispatch({ type: 'SET_SHEET', sheet: null })} label="Demo tour">
      <div className="flex items-center justify-between"><h2 className="text-[20px] font-extrabold">3‑minute founder tour</h2><CloseBtn /></div>
      <p className="mt-2 text-[13px] text-muted">Tap each step — sample data only.</p>
      <ol className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <li key={i}>
            <button type="button" onClick={() => { s.a(); dispatch({ type: 'SET_SHEET', sheet: null }); }} className="w-full rounded-2xl border border-line bg-card px-3.5 py-3 text-left">
              <b className="text-[14px]">{i + 1}. {s.t}</b>
              <div className="text-[13px] text-muted">{s.d}</div>
            </button>
          </li>
        ))}
      </ol>
    </Sheet>
  );
}

export function MiscSheets() {
  return (
    <>
      <AreaSheet /><ClashSheet /><PartnersSheet /><ExitFlowSheet /><ReviewSheet />
      <AddAddressSheet /><ComposePostSheet /><HelpSheet />
      <WelcomeSheet /><HowItWorksSheet /><DemoPathSheet />
    </>
  );
}

export { clearPersist };
