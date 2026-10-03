'use client';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { AREAS, FOODS, EXTRA_CATS } from '../../lib/data';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { FoodIcon } from '../ui/FoodIcon';
import { MapPin } from 'lucide-react';

const STEPS = ['Basics', 'Location', 'Menu', 'Photos', 'Details', 'Your take', 'Review'];
const PRESETS: Record<string, string> = { Morning: '6 am – 12 pm', Afternoon: '12 pm – 5 pm', Evening: '5 pm – 10 pm', 'Late night': '9 pm – 1 am', 'All day': 'All day' };

function Chip({ on, children, ...rest }: any) {
  return <button {...rest} className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold ${on ? 'border-brand bg-brand-soft text-brand' : 'border-line bg-card text-ink'}`}>{children}</button>;
}

function flowOK(step: number, d: ReturnType<typeof useApp>['state']['draft']) {
  if (!d) return false;
  if (step === 0) return d.name.trim().length > 1 && d.foods.length > 0;
  if (step === 2) return d.items.some(i => i.n.trim() && +i.p > 0);
  if (step === 5) return d.rating > 0 && d.rec !== null;
  if (step === 6) return d.ok;
  return true;
}

export function AddFlowWizard() {
  const { state, dispatch } = useApp();
  const d = state.draft!;
  const st = state.step;
  const ok = flowOK(st, d);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2.5 px-4 pt-2">
        <button onClick={() => (st === 0 ? dispatch({ type: 'SET_SHEET', sheet: { t: 'exitflow' } }) : dispatch({ type: 'FLOW_BACK' }))} aria-label="Back" className="grid h-[38px] w-[38px] place-items-center rounded-full bg-soft"><Icon name="back" /></button>
        <div className="flex-1"><div className="text-[12px] font-bold text-muted">Step {st + 1} of 7</div><b className="text-[16px]">{STEPS[st]}</b></div>
        <button onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'exitflow' } })} aria-label="Save draft and close" className="grid h-[38px] w-[38px] place-items-center rounded-full bg-soft"><Icon name="close" /></button>
      </div>
      <div className="flex gap-1 px-4 py-2.5">{STEPS.map((_, i) => <i key={i} className={`h-1 flex-1 rounded-full ${i <= st ? 'bg-brand' : 'bg-line'}`} />)}</div>

      <div className="px-4 pb-7">
        {st === 0 && (
          <>
            <h2 className="mt-3.5 text-[22px] font-extrabold">Tell us about the stall</h2>
            <p className="text-muted">Use the name locals use. Even a nickname is fine.</p>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold" htmlFor="f-name">Stall name</label>
            <input id="f-name" defaultValue={d.name} onChange={e => dispatch({ type: 'DRAFT_SET', patch: { name: e.target.value } })} placeholder="e.g. Munna Bhai's Kachori" className="w-full rounded-xl border border-line bg-card px-3 py-3 outline-none" />
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">What do they mainly make?</label>
            <div className="flex flex-wrap gap-2">
              {FOODS.map(([v, iconKey]) => (
                <Chip key={v} on={d.foods.includes(v)} onClick={() => dispatch({ type: 'DRAFT_TOGGLE_FOOD', v })} className="inline-flex items-center gap-1.5">
                  <FoodIcon food={iconKey} size={14} strokeWidth={2} /> {v}
                </Chip>
              ))}
              {EXTRA_CATS.map(([v, iconKey]) => (
                <Chip key={v} on={d.foods.includes(v)} onClick={() => dispatch({ type: 'DRAFT_TOGGLE_FOOD', v })} className="inline-flex items-center gap-1.5">
                  <FoodIcon food={iconKey} size={14} strokeWidth={2} /> {v}
                </Chip>
              ))}
            </div>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">Veg or non-veg?</label>
            <div className="flex rounded-xl bg-soft p-[3px]">{['Veg', 'Non-veg', 'Both'].map(t => <button key={t} onClick={() => dispatch({ type: 'DRAFT_SET', patch: { type: t } })} className={`flex-1 rounded-[9px] py-2 text-[13px] font-bold ${d.type === t ? 'bg-card text-ink shadow-card' : 'text-muted'}`}>{t}</button>)}</div>
          </>
        )}
        {st === 1 && (
          <>
            <h2 className="mt-3.5 text-[22px] font-extrabold">Where is it?</h2>
            <p className="text-muted">Tap the map to place the pin.</p>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold" htmlFor="f-area">Area</label>
            <select id="f-area" value={d.area} onChange={e => dispatch({ type: 'DRAFT_SET', patch: { area: e.target.value } })} className="w-full rounded-xl border border-line bg-card px-3 py-3 outline-none">
              {Object.keys(AREAS).map(a => <option key={a}>{a}</option>)}
            </select>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">Pin on the map</label>
            <div
              onClick={e => { const r = (e.target as HTMLElement).getBoundingClientRect(); dispatch({ type: 'DRAFT_SET_PIN', pin: [Math.round((e.clientX - r.left) / r.width * 100), Math.round((e.clientY - r.top) / r.height * 100)] }); }}
              className="relative h-[190px] cursor-crosshair overflow-hidden rounded-2xl bg-map"
            >
              <span className="absolute left-2.5 top-2.5 rounded-lg bg-card px-2 py-[3px] text-[11.5px] font-bold shadow-card">{d.area}</span>
              <span className="absolute -translate-x-1/2 -translate-y-full text-brand drop-shadow-md" style={{ left: d.pin[0] + '%', top: d.pin[1] + '%' }}><MapPin size={32} fill="currentColor" strokeWidth={1.5} aria-hidden /></span>
            </div>
            <div className="mt-2"><Button size="sm" onClick={() => dispatch({ type: 'DRAFT_SET_PIN', pin: [48, 52] })}>Use my current location</Button></div>
            <div className="mt-3 rounded-xl bg-soft p-3">
              <label className="mb-1.5 block text-[13.5px] font-bold" htmlFor="f-gmaps">Or paste a Google Maps link</label>
              <div className="flex gap-2">
                <input id="f-gmaps" placeholder="https://maps.google.com/..." className="min-w-0 flex-1 rounded-xl border border-line bg-card px-3 py-3 outline-none" />
                <Button size="sm" onClick={() => {
                  const el = document.getElementById('f-gmaps') as HTMLInputElement;
                  import('../../lib/helpers').then(({ parseMaps, nearestArea }) => {
                    const ll = parseMaps(el.value);
                    if (!ll) { dispatch({ type: 'TOAST', msg: 'Couldn’t read coordinates from that link.' }); return; }
                    const na = nearestArea(ll[0], ll[1]);
                    dispatch({ type: 'DRAFT_APPLY_MAPS', ll, area: na.area });
                  });
                }}>Use</Button>
              </div>
              <p className="mt-1.5 text-[12px] text-muted">Open the place in Google Maps, tap Share, and paste the link here. We'll drop the pin for you.</p>
            </div>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold" htmlFor="f-lm">How do people find it?</label>
            <input id="f-lm" defaultValue={d.landmark} onChange={e => dispatch({ type: 'DRAFT_SET', patch: { landmark: e.target.value } })} placeholder="Opposite the temple gate, under the neem tree" className="w-full rounded-xl border border-line bg-card px-3 py-3 outline-none" />
          </>
        )}
        {st === 2 && (
          <>
            <h2 className="mt-3.5 text-[22px] font-extrabold">What do they sell?</h2>
            <p className="text-muted">Add items by hand, or upload a menu photo for reference.</p>
            <div className="mt-3.5 flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold">Menu items ({d.items.length})</h3>
              <Button size="sm" onClick={() => dispatch({ type: 'DRAFT_ADD_ITEM' })}>+ Add item</Button>
            </div>
            {d.items.length === 0 && <div className="mt-2 rounded-xl bg-soft p-3 text-[13px]">No items yet. Add your first one.</div>}
            {d.items.map((it, i) => (
              <div key={i} className="mb-2 grid grid-cols-[1fr_66px_56px_28px] items-center gap-1.5">
                <input defaultValue={it.n} onChange={e => dispatch({ type: 'DRAFT_SET_ITEM', i, patch: { n: e.target.value } })} placeholder="Item name" className="rounded-xl border border-line bg-card px-2.5 py-2.5 outline-none" />
                <input defaultValue={it.p} onChange={e => dispatch({ type: 'DRAFT_SET_ITEM', i, patch: { p: e.target.value } })} inputMode="numeric" placeholder="₹" className="rounded-xl border border-line bg-card px-2.5 py-2.5 outline-none" />
                <button onClick={() => dispatch({ type: 'DRAFT_SET_ITEM', i, patch: { v: !it.v } })} className="rounded-xl border border-line px-1.5 py-2.5 text-[12px] font-bold">{it.v ? 'Veg' : 'Non'}</button>
                <button onClick={() => dispatch({ type: 'DRAFT_DEL_ITEM', i })} aria-label="Remove item" className="h-7 w-7 rounded-full bg-soft text-[11px] text-muted">✕</button>
              </div>
            ))}
          </>
        )}
        {st === 3 && (
          <>
            <h2 className="mt-3.5 text-[22px] font-extrabold">Show us the food</h2>
            <p className="text-muted">Real photos help people decide. The first photo becomes the cover.</p>
            <div className="mt-3.5 grid grid-cols-3 gap-2">
              {d.photos.map((p, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                  {i === 0 && <span className="absolute left-1.5 top-1.5 rounded bg-brand px-1.5 py-0.5 text-[10px] font-extrabold text-white">Cover</span>}
                  <button onClick={() => dispatch({ type: 'DRAFT_RM_PHOTO', i })} className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/65 text-[11px] text-white">✕</button>
                </div>
              ))}
              {d.photos.length < 6 && (
                <label className="grid aspect-square cursor-pointer place-items-center rounded-xl border-[1.5px] border-dashed border-muted text-center text-[12.5px] font-bold text-muted">
                  + Add photo
                  <input type="file" accept="image/*" multiple hidden onChange={e => {
                    [...(e.target.files || [])].slice(0, 6 - d.photos.length).forEach(f => {
                      const r = new FileReader();
                      r.onload = () => dispatch({ type: 'DRAFT_ADD_PHOTO', url: String(r.result) });
                      r.readAsDataURL(f);
                    });
                  }} />
                </label>
              )}
            </div>
            <Button block className="mt-4" onClick={() => dispatch({ type: 'FLOW_NEXT' })}>Skip for now</Button>
          </>
        )}
        {st === 4 && (
          <>
            <h2 className="mt-3.5 text-[22px] font-extrabold">Timings and details</h2>
            <p className="text-muted">Rough is fine. Vendors can correct it later.</p>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">Open hours</label>
            <div className="flex flex-wrap gap-2">{Object.keys(PRESETS).map(h => <Chip key={h} on={!d.open && d.hours === h} onClick={() => dispatch({ type: 'DRAFT_SET', patch: { hours: h, open: '', close: '' } })}>{h}</Chip>)}</div>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">Open days</label>
            <div className="flex flex-wrap gap-2">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(x => <Chip key={x} on={d.days.includes(x)} onClick={() => dispatch({ type: 'DRAFT_TOGGLE_DAY', v: x })}>{x}</Chip>)}</div>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">Payments accepted</label>
            <div className="flex flex-wrap gap-2">{['Cash', 'UPI', 'Card'].map(x => <Chip key={x} on={d.pay.includes(x)} onClick={() => dispatch({ type: 'DRAFT_TOGGLE_PAY', v: x })}>{x}</Chip>)}</div>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">Seating</label>
            <div className="flex flex-wrap gap-2">{['Stand and eat', 'Benches', 'Take-away only'].map(x => <Chip key={x} on={d.seat === x} onClick={() => dispatch({ type: 'DRAFT_SET', patch: { seat: x } })}>{x}</Chip>)}</div>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">Usual wait</label>
            <div className="flex flex-wrap gap-2">{['Under 5 min', '5–10 min', '10–15 min', '15+ min'].map(x => <Chip key={x} on={d.wait === x} onClick={() => dispatch({ type: 'DRAFT_SET', patch: { wait: x } })}>{x}</Chip>)}</div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line p-3.5">
              <div><b>Can they pack parcel orders?</b><div className="text-[13px] text-muted">A delivery partner like Rapido picks the food up.</div></div>
              <button onClick={() => dispatch({ type: 'DRAFT_SET', patch: { parcel: !d.parcel } })} className={`relative h-7 w-[46px] flex-none rounded-full ${d.parcel ? 'bg-green' : 'bg-line'}`}>
                <span className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow transition-all ${d.parcel ? 'left-[21px]' : 'left-[3px]'}`} />
              </button>
            </div>
          </>
        )}
        {st === 5 && (
          <>
            <h2 className="mt-3.5 text-[22px] font-extrabold">What did you think?</h2>
            <p className="text-muted">Your honest take is the most useful part.</p>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">Your rating</label>
            <div className="flex gap-1">{[1, 2, 3, 4, 5].map(n => <button key={n} onClick={() => dispatch({ type: 'DRAFT_SET', patch: { rating: n } })} className={`text-[32px] ${d.rating >= n ? 'text-amber' : 'text-line'}`} aria-label={`${n} stars`}>★</button>)}</div>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold">Would you order it again?</label>
            <div className="flex rounded-xl bg-soft p-[3px]">
              <button onClick={() => dispatch({ type: 'DRAFT_SET', patch: { rec: true } })} className={`flex-1 rounded-[9px] py-2 text-[13px] font-bold ${d.rec === true ? 'bg-card text-ink shadow-card' : 'text-muted'}`}>Yes, worth it</button>
              <button onClick={() => dispatch({ type: 'DRAFT_SET', patch: { rec: false } })} className={`flex-1 rounded-[9px] py-2 text-[13px] font-bold ${d.rec === false ? 'bg-card text-ink shadow-card' : 'text-muted'}`}>Not really</button>
            </div>
            <label className="mb-1.5 mt-4 block text-[13.5px] font-bold" htmlFor="f-note">Tip for the next person</label>
            <textarea id="f-note" rows={3} defaultValue={d.note} onChange={e => dispatch({ type: 'DRAFT_SET', patch: { note: e.target.value } })} placeholder="Go after 5 pm. Ask for the second batch." className="w-full rounded-xl border border-line bg-card px-3 py-3 outline-none" />
          </>
        )}
        {st === 6 && (
          <>
            <h2 className="mt-3.5 text-[22px] font-extrabold">Here's your listing</h2>
            <p className="text-muted">This is how neighbours will see it.</p>
            <div className="mt-3.5 rounded-2xl bg-card p-3.5 shadow-card">
              <b>{d.name || 'Your stall'}</b>
              <div className="text-[13px] text-muted">{d.area}{d.landmark ? ' · ' + d.landmark : ''}</div>
              <div className="mt-1 text-[13px] text-muted">{d.items.filter(i => i.n.trim() && +i.p > 0).length} items · {d.rating} ★ · {d.rec ? 'Would order again' : 'Not really'}</div>
            </div>
            <button onClick={() => dispatch({ type: 'DRAFT_SET', patch: { ok: !d.ok } })} className="mt-4 flex gap-3 text-left">
              <span className={`grid h-[22px] w-[22px] flex-none place-items-center rounded-[6px] border-2 ${d.ok ? 'border-brand bg-brand text-white' : 'border-muted'}`}>{d.ok ? '✓' : ''}</span>
              <span className="text-[13px]">I confirm this information is accurate and the photos are mine to share.</span>
            </button>
            <div className="mt-3.5 rounded-xl bg-soft p-3 text-[13px]">Ordering opens once the vendor joins Chatorey. You can invite them right after publishing.</div>
          </>
        )}
      </div>

      <div className="sticky bottom-0 bg-card px-4 py-3">
        <Button variant="primary" size="big" block disabled={!ok} onClick={() => dispatch({ type: st === 6 ? 'DRAFT_SUBMIT' : 'FLOW_NEXT' })}>
          {st === 6 ? 'Publish to Chatorey' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
