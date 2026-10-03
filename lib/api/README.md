# API layer (next step for production)

This prototype runs **client-only** with `lib/data.ts` fixtures and `localStorage` persistence.

When moving to production, add:

1. **REST or GraphQL** — stalls, menus, orders, threads, auth
2. **`lib/api/client.ts`** — `fetch` wrapper with auth headers
3. **Replace** direct `STALLS` reads with `GET /stalls?area=…`
4. **Order pipeline** — `POST /orders`, webhooks from Rapido, vendor `PATCH /orders/:id/status`
5. **Payments** — Razorpay order creation server-side; never trust client totals

The UI reducer can stay: hydrate from API on boot, optimistic updates + sync.
