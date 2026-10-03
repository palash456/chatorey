# Chatorey — Jaipur street food (Next.js prototype)

High-fidelity **founder-ready prototype**: discovery, community, stories/reels, cart & checkout, live order tracking, vendor dashboard, and add-a-stall UGC — **Jaipur sample data only**. Not a live marketplace (no real UPI / delivery APIs).

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # reducer / flow tests
npm run verify:images
npm run build        # static export → out/
```

Optional env: see `.env.example` (`NEXT_PUBLIC_PROTOTYPE`, `NEXT_PUBLIC_DEMO_CONTROLS`).

## Founder demo (3 minutes)

1. **Welcome sheet** on first visit, or Profile → **3‑minute demo tour**
2. **Orders** — sample active order (Pink City Coffee, cooking)
3. **Explore → stall → ADD → checkout** (no real charge)
4. **Profile → Vendor mode** — accept **CH-1042** at Sindhi Camp Kachori
5. **Explore → Community** — meetups & polls

**Reset:** Profile → **Reset demo data** (clears `localStorage` + sample orders).

## What’s included

| Area | Notes |
|------|--------|
| **200 stalls** | Hand-crafted + `jaipur-extra` + `jaipur-scale` (Jaipur-only) |
| **105 users · 80 threads · 64 story rings · 75 reels** | Scale corpus in `lib/fixtures/jaipur-scale.ts` |
| **Community** | 16+ threads, polls, RSVP |
| **Social** | Stories, reels, saves |
| **Orders** | 7-stage tracker, Rapido fee math, demo advance button |
| **Vendor** | Menu, promos, combos, review replies |
| **Legal** | `/privacy`, `/terms` |
| **CI** | `.github/workflows/ci.yml` — test, images, build |

## Production (not in this repo yet)

See `lib/api/README.md` — backend, auth, Razorpay, real Rapido webhooks, moderation.

## Deploy

```bash
npm run build
# Deploy `out/` to Netlify, Vercel (static), or any static host
```

## Structure

```
app/                 Layout, home shell, privacy & terms
components/          Screens + design system + demo chrome
context/reducer.ts   Typed state machine (unit-tested)
lib/data.ts          Core fixtures
lib/fixtures/        Jaipur extensions
public/images/       Covers, categories, avatars
```
