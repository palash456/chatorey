'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { ST, ago, rs, money, hs, rng, allStalls } from '../../lib/helpers';
import { Button } from '../ui/Button';
import { Pill } from '../ui/Pill';
import { EmptyState } from '../ui/EmptyState';
import { Inbox } from 'lucide-react';
import { DesktopCanvas } from '../layout/DesktopLayout';

const VTABS: [string, string][] = [['today', 'Today'], ['menu', 'Menu'], ['analytics', 'Analytics'], ['reviews', 'Reviews'], ['promos', 'Promotions'], ['settings', 'Settings']];

function vendorOf(name: string) { return { n: name.split(' ')[0] + ' Ji' }; }

function VendorScreenBody() {
  const { state, dispatch } = useApp();
  const s = ST(state.vsid, state.extraStalls, state.stallEdits)!;
  const orders = state.orders.filter(o => o.sid === s.id && !o.cancelled);
  const nu = orders.filter(o => o.status === 0);
  const acc = orders.filter(o => o.status === 1);
  const prep = orders.filter(o => o.status === 2);
  const rdy = orders.filter(o => o.status >= 3 && o.status < 6);
  const done = orders.filter(o => o.status === 6);
  const anyActive = nu.length + acc.length + prep.length + rdy.length;

  const Head = () => (
    <>
      <div className="bg-ink px-4 pb-4 pt-3.5 text-card lg:rounded-xl lg:mx-0 lg:mt-0">
        <div className="text-[11px] font-bold opacity-70">VENDOR MODE · {vendorOf(s.name).n}</div>
        <select value={s.id} onChange={e => dispatch({ type: 'VENDOR_SELECT', id: e.target.value })} className="mt-0.5 max-w-full bg-transparent text-[18px] font-extrabold outline-none">
          {allStalls(state.extraStalls).filter(x => x.orderable).map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
      </div>
      <div className="flex gap-0 overflow-x-auto border-b border-line bg-card px-1 [scrollbar-width:none] lg:hidden">
        {VTABS.map(([t, label]) => (
          <button type="button" key={t} onClick={() => dispatch({ type: 'VENDOR_TAB', t })} aria-current={state.vtab2 === t ? 'page' : undefined} className={`min-h-[44px] whitespace-nowrap border-b-[2.5px] px-3.5 py-3 text-[13px] font-bold ${state.vtab2 === t ? 'border-brand text-brand' : 'border-transparent text-muted'}`}>
            {label}{t === 'today' && nu.length ? ` (${nu.length})` : ''}
          </button>
        ))}
      </div>
    </>
  );

  if (state.vtab2 === 'menu') {
    return (
      <>
        <Head />
        <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">Your menu <span className="font-semibold opacity-85">मेनू</span></h2></div>
        <div className="rounded-2xl bg-card px-3.5">
          {s.items.map((it, k) => (
            <div key={k} className="flex items-center gap-2.5 border-t border-line py-3.5 first:border-t-0">
              <div className="h-[52px] w-[52px] flex-none overflow-hidden rounded-xl bg-soft">
                {it.img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.img} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex-1"><b>{it.n}</b><div className="text-muted">{rs(it.p)}</div></div>
              <select value={it.st} onChange={e => dispatch({ type: 'VENDOR_ITEM_STATUS', k, st: e.target.value as any })} className="rounded-xl border border-line bg-card px-2 py-2 text-[13px] font-bold">
                <option value="ok">Available</option><option value="low">Few left</option><option value="out">Sold out</option>
              </select>
            </div>
          ))}
        </div>
        <div className="my-3.5 rounded-2xl bg-card p-3.5 shadow-card">
          <b>Add a new item</b>
          <div className="mt-2 flex gap-2"><input id="vn" placeholder="Item name" className="min-w-0 flex-1 rounded-xl border border-line bg-card px-3 py-2.5 outline-none" /><input id="vp" inputMode="numeric" placeholder="₹" className="w-[76px] rounded-xl border border-line bg-card px-3 py-2.5 outline-none" /></div>
          <Button variant="primary" block className="mt-2.5" onClick={() => {
            const n = (document.getElementById('vn') as HTMLInputElement).value.trim();
            const p = +(document.getElementById('vp') as HTMLInputElement).value;
            if (!n || !(p > 0)) { dispatch({ type: 'TOAST', msg: 'Add a name and a price' }); return; }
            dispatch({ type: 'VENDOR_ADD_ITEM', n, p });
          }}>Add to menu</Button>
        </div>
      </>
    );
  }

  if (state.vtab2 === 'analytics') {
    const seed = hs(s); const rand = rng(seed);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const vals = days.map(() => Math.round(18 + rand() * 40));
    const mx = Math.max(...vals);
    const items = [...s.items].map(it => ({ n: it.n, q: Math.round(6 + rand() * 40) })).sort((a, b) => b.q - a.q).slice(0, 5);
    const stars = [5, 4, 3, 2, 1].map(n => Math.round(rand() * 60) + (n === 5 ? 40 : 0));
    const stot = stars.reduce((a, b) => a + b, 0) || 1;
    const weeklyRev = vals.reduce((a, b) => a + b, 0) * Math.round((Math.min(...s.items.map(i => i.p)) + 30));
    return (
      <>
        <Head />
        <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">This week</h2></div>
        <div className="rounded-2xl bg-card p-4 shadow-card">
          <div className="flex justify-between"><b>Orders per day</b><span className="text-[12px] text-muted">Weekly total: {vals.reduce((a, b) => a + b, 0)}</span></div>
          <div className="mt-3.5 flex h-[90px] items-end gap-2.5">{vals.map((v, i) => <div key={i} className="relative flex-1 rounded-t-md bg-brand-soft" style={{ height: v / mx * 90 }}><div className="absolute inset-0 rounded-t-md bg-brand" /></div>)}</div>
          <div className="mt-1 flex gap-2.5">{days.map(d => <span key={d} className="flex-1 text-center text-[10px] text-muted">{d}</span>)}</div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl bg-card p-3.5 shadow-card"><b className="text-[22px]">{money(weeklyRev)}</b><div className="text-[12px] text-muted">Est. weekly earnings</div></div>
          <div className="rounded-2xl bg-card p-3.5 shadow-card"><b className="text-[22px]">96%</b><div className="text-[12px] text-muted">Order acceptance</div></div>
          <div className="rounded-2xl bg-card p-3.5 shadow-card"><b className="text-[22px]">{s.prep} min</b><div className="text-[12px] text-muted">Avg. prep time</div></div>
          <div className="rounded-2xl bg-card p-3.5 shadow-card"><b className="text-[22px]">2%</b><div className="text-[12px] text-muted">Cancelled orders</div></div>
        </div>
        <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">Best sellers</h2></div>
        <div className="rounded-2xl bg-card px-3.5">{items.map((it, i) => (
          <div key={i} className="flex items-center gap-2.5 border-t border-line py-2.5 first:border-t-0"><b className="w-[18px]">{i + 1}</b><div className="flex-1 text-[14px] font-bold">{it.n}</div><span className="text-[13px] text-muted">{it.q} sold</span></div>
        ))}</div>
        <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">Rating breakdown</h2></div>
        <div className="mb-5 rounded-2xl bg-card p-4 shadow-card">
          <div className="flex justify-between"><b className="text-[26px]">{s.rating.toFixed(1)}</b><span className="text-[13px] text-muted">{s.n} ratings</span></div>
          {stars.map((v, i) => (
            <div key={i} className="my-1.5 flex items-center gap-2"><span className="w-[14px] text-[12px]">{5 - i}★</span><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-soft"><div className="h-full rounded-full bg-amber" style={{ width: Math.round(v / stot * 100) + '%' }} /></div><span className="w-[26px] text-[12px] text-muted">{Math.round(v / stot * 100)}%</span></div>
          ))}
        </div>
      </>
    );
  }

  if (state.vtab2 === 'reviews') {
    return (
      <>
        <Head />
        <div className="flex items-center justify-between px-5 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">Customer reviews</h2><Pill tone="green">{s.rating.toFixed(1)} ★ overall</Pill></div>
        <div className="mx-5 rounded-2xl bg-card px-3.5">
          {s.reviews.map((r, i) => {
            const key = `${s.id}:${i}`;
            const reply = state.vendorReviewReplies[key];
            return (
              <div key={i} className="border-t border-line py-3.5 first:border-t-0">
                <div className="flex items-center justify-between"><b className="text-[14px]">{r.who}</b><Pill>{r.food}</Pill></div>
                <p className="mt-2 text-[14px]">{r.text}</p>
                {reply && (
                  <p className="mt-2 rounded-xl bg-soft px-3 py-2 text-[13px]"><b>You replied:</b> {reply}</p>
                )}
                {!reply && (
                  <div className="mt-2 flex gap-2">
                    <input id={`vr-${i}`} placeholder="Thank them or clarify…" className="min-w-0 flex-1 rounded-xl border border-line bg-card px-3 py-2 text-[13px] outline-none" />
                    <Button size="sm" onClick={() => {
                      const el = document.getElementById(`vr-${i}`) as HTMLInputElement;
                      dispatch({ type: 'VENDOR_REPLY_REVIEW', idx: i, text: el?.value || '' });
                      if (el) el.value = '';
                    }}>Reply</Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  if (state.vtab2 === 'promos') {
    return (
      <>
        <Head />
        <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">Promotions</h2></div>
        <div className="rounded-2xl border-[1.5px] border-dashed border-brand bg-brand-soft p-3.5">
          <b>Free delivery this weekend</b>
          <p className="mb-2.5 mt-1 text-[13px] text-muted">Chatorey covers the delivery fee on orders above ₹150. Boosts weekend orders by ~20% on average.</p>
          <button type="button" onClick={() => dispatch({ type: 'VENDOR_PROMO_TOGGLE' })} aria-label="Free delivery weekend promo" aria-pressed={state.vpromoOn} className={`relative h-7 w-[46px] rounded-full ${state.vpromoOn ? 'bg-green' : 'bg-line'}`}>
            <span className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition-all ${state.vpromoOn ? 'left-[21px]' : 'left-[3px]'}`} />
          </button>
        </div>
        <div className="mt-3 rounded-2xl bg-card p-3.5 shadow-card"><b>Featured placement</b><p className="mb-2.5 mt-1 text-[13px] text-muted">Show up in "Top picks" for your area for a week.</p><Button size="sm" onClick={() => dispatch({ type: 'TOAST', msg: 'Request sent. Chatorey will review it within 2 days.' })}>Request featuring</Button></div>
        <div className="mt-3 rounded-2xl bg-card p-3.5 shadow-card"><b>Combo suggestion</b><p className="mb-2.5 mt-1 text-[13px] text-muted">Pair your two best sellers as a combo to raise average order value.</p><Button size="sm" onClick={() => dispatch({ type: 'VENDOR_CREATE_COMBO' })}>Create a combo</Button></div>
      </>
    );
  }

  if (state.vtab2 === 'settings') {
    return (
      <>
        <Head />
        <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">Stall settings</h2></div>
        <div className="rounded-2xl bg-card px-3.5">
          <div className="flex items-center justify-between py-3"><div><b className="text-[14px]">Accept new orders</b><div className="text-[12px] text-muted">Turn off to pause without closing</div></div>
            <button type="button" onClick={() => dispatch({ type: 'VENDOR_TOGGLE_OPEN' })} aria-label="Accept new orders" aria-pressed={s.open} className={`relative h-7 w-[46px] rounded-full ${s.open ? 'bg-green' : 'bg-line'}`}><span className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition-all ${s.open ? 'left-[21px]' : 'left-[3px]'}`} /></button>
          </div>
          <div className="flex items-center justify-between border-t border-line py-3"><div><b className="text-[14px]">Parcel / delivery orders</b><div className="text-[12px] text-muted">Let Rapido pick up from you</div></div><button type="button" aria-label="Parcel delivery enabled" aria-pressed={true} className="relative h-7 w-[46px] rounded-full bg-green"><span className="absolute left-[21px] top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow" /></button></div>
        </div>
        <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">Stall details</h2></div>
        <div className="mb-5 rounded-2xl bg-card p-3.5 shadow-card">
          <label className="block text-[13.5px] font-bold">Hours</label>
          <input readOnly value={s.hours} className="mt-1.5 w-full rounded-xl border border-line bg-card px-3 py-2.5" />
          <label className="mt-3 block text-[13.5px] font-bold">Vendor</label>
          <input readOnly value={vendorOf(s.name).n} className="mt-1.5 w-full rounded-xl border border-line bg-card px-3 py-2.5" />
        </div>
      </>
    );
  }

  // today
  const Card = ({ o, children }: { o: typeof orders[number]; children?: React.ReactNode }) => (
    <div className="mb-3 rounded-2xl bg-card p-4 shadow-card">
      <div className="flex justify-between"><b>{o.cust || 'Aarav'}</b><span className="text-[13px] text-muted">{o.id} · {ago(o.placedAt)}</span></div>
      <div className="my-2 text-[17px] font-bold leading-relaxed">{o.items.map((i, k) => <div key={k}>{i.q} × {i.n}</div>)}</div>
      <div className="text-[13px] text-muted">Total {rs(o.sub)}</div>
      {o.note && <div className="mt-1.5 rounded-xl bg-soft p-2.5 text-[13px]"><b>Note:</b> {o.note}</div>}
      {children}
    </div>
  );
  return (
    <>
      <Head />
      <div className="mt-3.5 grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-card p-3.5 shadow-card"><b className="text-[22px]">{nu.length + acc.length + prep.length + rdy.length + done.length}</b><div className="text-[12px] text-muted">Orders today</div></div>
        <div className="rounded-2xl bg-card p-3.5 shadow-card"><b className="text-[22px]">{s.rating.toFixed(1)} ★</b><div className="text-[12px] text-muted">Rating</div></div>
      </div>
      <div className="my-3 flex items-center justify-between rounded-2xl bg-card p-3.5 shadow-card">
        <div><b>{s.open ? 'Stall is open' : 'Stall is closed'}</b><div className="text-[13px] text-muted">{s.open ? 'You can get new orders' : 'No new orders will come in'}</div></div>
        <button type="button" onClick={() => dispatch({ type: 'VENDOR_TOGGLE_OPEN' })} aria-label="Stall open for orders" aria-pressed={s.open} className={`relative h-7 w-[46px] rounded-full ${s.open ? 'bg-green' : 'bg-line'}`}><span className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition-all ${s.open ? 'left-[21px]' : 'left-[3px]'}`} /></button>
      </div>

      {nu.length > 0 && <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">New orders <span className="opacity-85">नए ऑर्डर</span> <Pill tone="brand">{nu.length}</Pill></h2></div>}
      {nu.map(o => <Card key={o.id} o={o}><div className="mt-2.5 flex gap-2.5"><Button variant="green" size="big" className="flex-[2]" onClick={() => dispatch({ type: 'ADVANCE_ORDER', id: o.id, to: 1 })}>Accept <span className="opacity-85">स्वीकार</span></Button><Button size="big" className="flex-1" onClick={() => dispatch({ type: 'DECLINE_ORDER', id: o.id })}>No</Button></div></Card>)}

      {acc.length > 0 && <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">Accepted <span className="opacity-85">स्वीकार किए</span> <Pill tone="brand">{acc.length}</Pill></h2></div>}
      {acc.map(o => <Card key={o.id} o={o}><Button variant="primary" size="big" block className="mt-2.5" onClick={() => dispatch({ type: 'ADVANCE_ORDER', id: o.id, to: 2 })}>Start cooking <span className="opacity-85">बनाना शुरू</span></Button></Card>)}

      {prep.length > 0 && <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">Cooking <span className="opacity-85">बन रहा है</span> <Pill tone="brand">{prep.length}</Pill></h2></div>}
      {prep.map(o => <Card key={o.id} o={o}><Button variant="green" size="big" block className="mt-2.5" onClick={() => dispatch({ type: 'ADVANCE_ORDER', id: o.id, to: 3 })}>Food is ready <span className="opacity-85">तैयार है</span></Button></Card>)}

      {rdy.length > 0 && <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">Rider <span className="opacity-85">राइडर</span> <Pill tone="brand">{rdy.length}</Pill></h2></div>}
      {rdy.map(o => <Card key={o.id} o={o}><div className="mt-2.5 rounded-xl bg-soft p-2.5 text-[13px]"><b>{o.status === 3 ? 'Pickup is being booked' : o.status === 4 ? `${o.rider?.n || 'Rider'} is coming` : 'Picked up'}</b><br />{o.status < 5 ? `Keep the sealed bag by the counter. OTP: ${o.otp || '—'}` : 'On the way to the customer.'}</div></Card>)}

      {!anyActive && (
        <EmptyState icon={Inbox} title="No orders right now" description="New orders will appear here with a big Accept button." />
      )}

      {done.length > 0 && (
        <>
          <div className="px-4 pb-2.5 pt-4"><h2 className="text-[18px] font-extrabold">Done <span className="opacity-85">पूरे हुए</span></h2></div>
          {done.slice(0, 4).map(o => <Card key={o.id} o={o} />)}
        </>
      )}
    </>
  );
}

export function VendorScreen() {
  return (
    <DesktopCanvas>
      <VendorScreenBody />
    </DesktopCanvas>
  );
}
