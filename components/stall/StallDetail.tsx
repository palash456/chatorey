'use client';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ST, dist, fd, partnerById, rs, eta, mapsSearchUrl, telUrl } from '../../lib/helpers';
import { CATEGORY_IMG } from '../../lib/data';
import { shareStall, shareInviteVendor } from '../../lib/share';
import { Cover } from '../ui/Cover';
import { Icon } from '../ui/Icon';
import { Pill } from '../ui/Pill';
import { FoodArt } from '../ui/FoodArt';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { PhotoLightbox } from '../ui/PhotoLightbox';
import { FoodIconBadge } from '../ui/FoodIcon';
import { Bike, Clock, MessageSquareText, Phone } from 'lucide-react';

export function StallDetail({ id }: { id: string }) {
  const { state, dispatch } = useApp();
  const [lightbox, setLightbox] = useState<{ urls: string[]; index: number } | null>(null);
  const s = ST(id, state.extraStalls, state.stallEdits);
  if (!s) return null;
  const saved = state.saved.has(s.id);
  const inCart = state.cart.sid === s.id;
  const p = partnerById(state.partner);
  const q = p.quote(dist(state.area, s));
  const catImg = s.foods.map(f => CATEGORY_IMG[f]).find(Boolean);
  const onShare = async () => {
    const r = await shareStall(s.name, s.id);
    if (r === 'shared') dispatch({ type: 'TOAST', msg: 'Shared!' });
    else if (r === 'copied') dispatch({ type: 'TOAST', msg: 'Link copied to clipboard' });
    else dispatch({ type: 'TOAST', msg: 'Could not share — try again' });
  };

  const onInvite = async () => {
    const r = await shareInviteVendor(s.name, s.id);
    if (r === 'shared') dispatch({ type: 'TOAST', msg: 'Invite sent' });
    else if (r === 'copied') dispatch({ type: 'TOAST', msg: 'Invite message copied' });
    else dispatch({ type: 'TOAST', msg: 'Could not copy invite' });
  };

  const tel = s.phone ? telUrl(s.phone) : null;
  const cartCount = inCart ? Object.values(state.cart.items).reduce((a, b) => a + b, 0) : 0;
  const scrollPad = cartCount > 0
    ? 'calc(128px + env(safe-area-inset-bottom, 0px))'
    : 'calc(80px + env(safe-area-inset-bottom, 0px))';

  return (
    <div
      className="absolute inset-0 z-30 overflow-y-auto bg-bg [animation:slide_.22s_ease-out] lg:inset-y-0 lg:left-auto lg:w-full lg:max-w-[min(520px,42vw)] lg:border-l lg:border-line lg:shadow-2xl"
      style={{ paddingBottom: scrollPad }}
    >
      {lightbox && (
        <PhotoLightbox urls={lightbox.urls} index={lightbox.index} onClose={() => setLightbox(null)} onIndex={i => setLightbox({ urls: lightbox.urls, index: i })} />
      )}
      <div className="relative">
        <Cover stall={s} className="h-[200px] lg:h-[230px]" />
        <div className="absolute inset-x-3.5 top-3.5 z-[3] flex justify-between">
          <button onClick={() => dispatch({ type: 'SET_STALL', id: null })} aria-label="Back" className="grid h-[38px] w-[38px] place-items-center rounded-full bg-card shadow-card"><Icon name="back" /></button>
          <span className="flex gap-2">
            <button type="button" onClick={onShare} aria-label="Share" className="grid h-[38px] w-[38px] place-items-center rounded-full bg-card shadow-card"><Icon name="share" size={20} /></button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_SAVE', id: s.id })} aria-label="Save stall" aria-pressed={saved}
              className={`grid h-[38px] w-[38px] place-items-center rounded-full bg-card shadow-card ${saved ? 'text-brand' : ''}`}
            ><Icon name="heart" size={20} /></button>
          </span>
        </div>
      </div>

      <div className="relative -mt-[22px] rounded-t-[22px] bg-bg">
        <div className="rounded-t-[22px] bg-card p-4">
          <div className="flex items-start justify-between">
            <h1 className="text-[18px] font-semibold leading-tight lg:text-[22px] lg:font-extrabold">{s.name}</h1>
            <span className="flex-none rounded-md bg-green px-1.5 py-px text-[13px] font-bold text-white lg:rounded-lg lg:px-2 lg:text-[15px] lg:font-extrabold">{s.rating.toFixed(1)}</span>
          </div>
          <div className="mt-1 text-[12px] text-muted lg:text-[13px]">{s.foods.slice(0, 4).map(f => f[0].toUpperCase() + f.slice(1)).join(' · ')}</div>
          <div className="mt-2 flex flex-wrap gap-1 lg:mt-2.5 lg:gap-1.5">
            {s.tags.slice(0, 2).map(t => <Pill key={t} tone="brand">{t}</Pill>)}
            <Pill tone={s.open ? 'green' : 'amber'}>{s.open ? 'Open' : 'Closed'}</Pill>
            <Pill className="hidden lg:inline-flex">{s.hours}</Pill>
          </div>
          <div className="mt-2 text-[12px] text-muted lg:mt-2.5 lg:text-[13px]">{s.area} · {fd(dist(state.area, s))} · {s.n} reviews</div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <a href={mapsSearchUrl(s)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-3 py-1.5 text-[12.5px] font-bold text-ink">Directions</a>
            {tel && (
              <a href={tel} className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-[12.5px] font-bold text-ink">
                <Phone size={14} aria-hidden /> Call stall
              </a>
            )}
          </div>
          <div className="mt-2 hidden lg:mt-2.5 lg:block"><Pill tone="green" className="text-[12.5px]">{s.pct}% would order again</Pill></div>
          {s.freeDeliveryPromo && <div className="mt-2"><Pill tone="brand">Free delivery on orders above ₹150</Pill></div>}
          {s.addedBy && <p className="mt-2 text-[12px] text-muted">Added to Chatorey by {s.addedBy}</p>}
          {!!s.extra?.length && <div className="mt-2.5 flex flex-wrap gap-1.5">{s.extra.map(x => <Pill key={x}>{x}</Pill>)}</div>}
        </div>

        <div className="h-2" />
        {s.photos.length > 1 && (
          <div className="flex gap-2 px-4 pb-1">
            {s.photos.slice(1).map((p2, i) => (
              <button type="button" key={i} onClick={() => setLightbox({ urls: s.photos, index: i + 1 })} className="h-[84px] w-[84px] flex-none overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p2} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="mx-4 mb-2.5 flex gap-2.5 rounded-xl bg-amber-bg p-3 lg:rounded-2xl lg:p-3.5">
          <MessageSquareText size={20} className="flex-none text-amber lg:hidden" strokeWidth={1.75} aria-hidden />
          <MessageSquareText size={22} className="hidden flex-none text-amber lg:block" strokeWidth={1.75} aria-hidden />
          <div><b className="text-[13px] lg:text-base">Local tip</b><div className="mt-0.5 text-[13px] leading-snug lg:text-[14.5px]">{s.tip}</div></div>
        </div>
        <div className="mx-4 mb-2.5 hidden gap-2.5 rounded-2xl bg-card p-3.5 shadow-card lg:flex">
          <div className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] bg-brand-soft text-brand"><Bike size={20} aria-hidden /></div>
          <div><b>Delivered by {p.name}</b><div className="mt-0.5 text-[13.5px] text-muted">This stall doesn't deliver itself. Once your food is ready, a {p.name} rider picks it up. Est. {s.freeDeliveryPromo ? 'free delivery on ₹150+' : rs(q.fee)} · ~{q.eta} min ride.</div></div>
        </div>
        {!s.orderable && (
          <div className="mx-4 mb-2.5 flex gap-2.5 rounded-2xl bg-amber-bg p-3.5">
            <div className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] bg-card text-amber"><Clock size={20} aria-hidden /></div>
            <div>
              <b>Ordering isn't open yet</b>
              <div className="text-[13.5px]">Added by the community. The vendor hasn't joined Chatorey.</div>
              <Button size="sm" className="mt-2" onClick={onInvite}>Invite this vendor</Button>
            </div>
          </div>
        )}

        <div className="bg-card px-4 pb-6 pt-4">
          <h2 className="section-title font-display">Menu</h2>
          <p className="mt-1 hidden text-[13px] text-muted lg:block">Tap ADD on a dish — your basket appears at the bottom when you’re ready.</p>
          {s.items.map((it, k) => {
            const qty = inCart ? (state.cart.items[k] || 0) : 0;
            const disabled = !s.orderable || !s.open || it.st === 'out';
            return (
              <div key={k} className="flex gap-3.5 border-t border-line py-4 pb-5 first:border-t first:mt-3 first:pt-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-grid h-[15px] w-[15px] flex-none place-items-center rounded-[3px] border-[1.5px] ${it.v ? 'border-green' : 'border-red'}`}>
                      <span className={`h-[7px] w-[7px] rounded-full ${it.v ? 'bg-green' : 'bg-red'}`} />
                    </span>
                    {it.pop && <Pill tone="brand">Most ordered</Pill>}
                  </div>
                  <div className="mt-1 text-[15px] font-bold">{it.n}</div>
                  <div className="mt-0.5 font-bold">{rs(it.p)}</div>
                  <div className="mt-1 text-[13.5px] text-muted">{it.d}</div>
                  {it.st === 'low' && <Pill tone="amber" className="mt-1.5">Only a few left</Pill>}
                  {it.st === 'out' && <Pill className="mt-1.5">Sold out today</Pill>}
                </div>
                <div className="relative w-24 flex-none">
                  <div className="h-24 overflow-hidden rounded-2xl" style={{ background: `linear-gradient(135deg, ${s.c[0]}66, ${s.c[1]}88)` }}>
                    {it.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.img} alt="" className="h-full w-full object-cover" />
                    ) : catImg ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={catImg} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full scale-125"><FoodArt stall={s} /></div>
                    )}
                  </div>
                  {qty > 0 ? (
                    <div className="absolute -bottom-3 left-1/2 flex h-11 min-w-[96px] -translate-x-1/2 items-center justify-between rounded-[9px] border border-line bg-card font-extrabold text-green shadow-[0_2px_8px_rgba(0,0,0,.18)]">
                      <button type="button" onClick={() => dispatch({ type: 'DEC_CART', k })} aria-label={`Remove one ${it.n}`} className="touch-target grid flex-1 place-items-center text-[18px]">−</button>
                      <span aria-live="polite">{qty}</span>
                      <button type="button" onClick={() => dispatch({ type: 'ADD_TO_CART', sid: s.id, k })} aria-label={`Add one ${it.n}`} className="touch-target grid flex-1 place-items-center text-[18px]">+</button>
                    </div>
                  ) : (
                    <button
                      disabled={disabled}
                      onClick={() => dispatch({ type: 'ADD_TO_CART', sid: s.id, k })}
                      className="absolute -bottom-3 left-1/2 h-8 min-w-[80px] -translate-x-1/2 rounded-[9px] border border-line bg-card font-extrabold text-green shadow-[0_2px_8px_rgba(0,0,0,.18)] disabled:text-muted disabled:shadow-none"
                    >
                      {it.st === 'out' ? 'SOLD OUT' : 'ADD'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!!s.menuPics?.length && (
          <div className="bg-card p-4">
            <h2 className="text-[18px] font-extrabold">Menu photos</h2>
            <div className="mt-2.5 flex gap-2 overflow-x-auto [scrollbar-width:none]">
              {s.menuPics.map((mp, i) => (
                <button type="button" key={i} onClick={() => setLightbox({ urls: s.menuPics!, index: i })} className="h-24 w-24 flex-none overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mp} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-card p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-extrabold">What people say</h2>
            <Button size="sm" onClick={() => dispatch({ type: 'SET_SHEET', sheet: { t: 'review', sid: s.id } })}>Write a review</Button>
          </div>
          {s.reviews.map((r, i) => {
            const key = 'rev' + s.id + i;
            const liked = state.clikes.has(key);
            return (
              <div key={i} className="border-t border-line py-3.5 first:border-t-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Avatar uid={r.who.toLowerCase()} size={32} /><div><b className="text-[14px]">{r.who}</b><div className="text-[12px] text-muted">{r.lvl} · {r.when}{r.stars ? ` · ${'★'.repeat(r.stars)}` : ''}</div></div></div>
                  <Pill>{r.food}</Pill>
                </div>
                <div className="mt-2.5 flex items-start gap-3">
                  {r.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.photo} alt="" className="h-[68px] w-[68px] flex-none rounded-xl object-cover" />
                  ) : (
                    <FoodIconBadge food={s.foods[0] || 'other'} colors={s.c} size={68} iconSize={30} />
                  )}
                  <p className="flex-1">{r.text}</p>
                </div>
                <button onClick={() => dispatch({ type: 'REVIEW_HELPFUL', key })} className="mt-2.5 rounded-[10px] border border-line px-3 py-1.5 text-[13px] font-bold">
                  {liked ? '✓ ' : ''}Helpful · {r.likes + (liked ? 1 : 0)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
