import { STALLS, PARTNERS, RIDERS, THREADS, REELS, STORIES, ADDRS } from '../lib/data';
import type { Addr, Thread } from '../lib/types';
import { partnerById, minP, dist, findStall, deliveryFee, allStalls } from '../lib/helpers';
import type { Order, Stall } from '../lib/types';
import { mergePersisted, type PersistedSlice } from '../lib/persist';
import { patchStall, type StallEditsMap } from '../lib/stallEdits';
import type { ReelComment, Review } from '../lib/types';

export type AddDraft = {
  name: string; foods: string[]; type: string; price: string; area: string; landmark: string;
  pin: [number, number]; ll?: [number, number];
  items: { n: string; p: string; v: boolean }[];
  menuFiles: File[]; menuPrev: string[];
  photos: string[];
  scan: { st: 'idle' | 'scanning' | 'done' | 'empty' | 'error'; count?: number; demo?: boolean; msg?: string };
  days: string[]; hours: string; open: string; close: string;
  pay: string[]; seat: string; wait: string; parcel: boolean; phone: string;
  rating: number; must: string[]; rec: boolean | null; vibes: string[]; note: string; ok: boolean;
};

export type AppState = {
  tab: 'home' | 'explore' | 'add' | 'orders' | 'profile';
  area: string;
  query: string;
  stallId: string | null;
  cart: { sid: string | null; items: Record<number, number> };
  saved: Set<string>;
  filters: { sort: 'recommended' | 'nearest' | 'cheapest' | 'rating'; veg: boolean; open: boolean; min: number; gem: boolean; view: 'list' | 'compare' };
  sheet: null | { t: string; [k: string]: any };
  orders: Order[];
  vendor: boolean; vsid: string; vtab2: string;
  partner: string; addr: string; pay: string;
  addStage: 'intro' | 'flow' | 'done';
  step: number; draft: AddDraft | null; done: string | null;
  contrib: string[];
  theme: 'light' | 'dark' | 'auto';
  points: number; lastPts: number;
  note: string;
  orderSeq: number;
  // community
  estab: 'stalls' | 'community' | 'reels';
  threadFilter: string; threadOpen: string | null; commentDraft: string;
  pollPick: Record<string, number>; votes: Record<string, 'up' | 'down' | null>;
  clikes: Set<string>; replyTo: string | null;
  // stories
  storyOpen: boolean; storyIdx: number; storySlide: number; seenStories: Set<string>;
  // reels
  reelOpen: boolean; reelIdx: number;
  rxn: Record<string, 'like' | 'dislike' | null>; rsave: Set<string>;
  // vendor extras
  vpromoOn: boolean; vAddPhoto: string | null;
  toast: string | null;
  extraStalls: Stall[];
  exploreSearchFocus: boolean;
  addresses: Addr[];
  userThreads: Thread[];
  stallEdits: StallEditsMap;
  reelComments: Record<string, ReelComment[]>;
  vendorReviewReplies: Record<string, string>;
};

export const STAGE_DELAYS = [5000, 6000, 7000, 4000, 7000, 9000];

export function newDraft(area: string): AddDraft {
  return {
    name: '', foods: [], type: 'Veg', price: '', area, landmark: '', pin: [50, 55],
    items: [], menuFiles: [], menuPrev: [], photos: [],
    scan: { st: 'idle' },
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], hours: '', open: '', close: '',
    pay: ['Cash', 'UPI'], seat: '', wait: '', parcel: true, phone: '',
    rating: 0, must: [], rec: null, vibes: [], note: '', ok: false
  };
}

export function initialState(): AppState {
  const now = Date.now();
  const mk = (o: Partial<Order> & Pick<Order, 'id' | 'sid' | 'items' | 'sub' | 'fee' | 'total'>): Order => ({
    status: 0, times: [], auto: false, cancelled: false, mine: false, rated: false, partner: PARTNERS[0], placedAt: now, ...o
  });
  return {
    tab: 'home', area: 'MI Road', query: '', stallId: null,
    cart: { sid: null, items: {} },
    saved: new Set(['s5', 'to_s2'.replace('to_', '')]),
    filters: { sort: 'recommended', veg: false, open: false, min: 0, gem: false, view: 'list' },
    sheet: null,
    orders: [
      mk({
        id: 'CH-1043', sid: 's32',
        items: [{ n: 'Jaipur filter coffee', p: 80, q: 1 }, { n: 'Banana walnut loaf', p: 90, q: 1 }],
        sub: 170, fee: 28, total: 203, status: 2, mine: true, auto: true,
        placedAt: now - 12 * 6e4, cust: 'Aarav',
        times: [now - 12 * 6e4, now - 10 * 6e4, now - 7 * 6e4]
      }),
      mk({ id: 'CH-1040', sid: 's6', items: [{ n: 'Kulhad chai', p: 15, q: 2 }, { n: 'Bun maska', p: 30, q: 1 }], sub: 60, fee: 38, total: 103, status: 6, mine: true, placedAt: now - 864e5, cust: 'Aarav' }),
      mk({ id: 'CH-1041', sid: 's4', items: [{ n: 'Raj kachori chaat', p: 70, q: 1 }, { n: 'Aloo tikki (2 pcs)', p: 40, q: 1 }], sub: 110, fee: 31, total: 146, status: 6, mine: true, placedAt: now - 3 * 864e5, cust: 'Aarav', rated: true }),
      mk({ id: 'CH-1042', sid: 's1', items: [{ n: 'Pyaaz kachori', p: 25, q: 3 }, { n: 'Mirchi vada', p: 20, q: 1 }], sub: 95, fee: 0, total: 95, status: 0, placedAt: now - 2 * 6e4, cust: 'Priya' }),
      mk({ id: 'CH-1039', sid: 's1', items: [{ n: 'Mawa kachori', p: 55, q: 1 }, { n: 'Pyaaz kachori', p: 25, q: 2 }], sub: 105, fee: 0, total: 105, status: 2, placedAt: now - 9 * 6e4, cust: 'Rahul' }),
      mk({ id: 'CH-1038', sid: 's1', items: [{ n: 'Kachori + sabzi plate (2 pcs)', p: 50, q: 2 }], sub: 100, fee: 0, total: 100, status: 6, placedAt: now - 50 * 6e4, cust: 'Sonal' }),
      mk({ id: 'CH-1037', sid: 's1', items: [{ n: 'Pyaaz kachori', p: 25, q: 4 }], sub: 100, fee: 0, total: 100, status: 6, placedAt: now - 90 * 6e4, cust: 'Vikram' })
    ],
    vendor: false, vsid: 's1', vtab2: 'today',
    partner: 'rapido', addr: 'Home · Raja Park', pay: 'GPay',
    addStage: 'intro', step: 0, draft: null, done: null,
    contrib: [], theme: 'light', points: 220, lastPts: 0, note: '', orderSeq: 1044,
    estab: 'stalls', threadFilter: 'All', threadOpen: null, commentDraft: '',
    pollPick: {}, votes: {}, clikes: new Set(), replyTo: null,
    storyOpen: false, storyIdx: 0, storySlide: 0, seenStories: new Set(),
    reelOpen: false, reelIdx: 0, rxn: {}, rsave: new Set(),
    vpromoOn: false, vAddPhoto: null,
    toast: null,
    extraStalls: [],
    exploreSearchFocus: false,
    addresses: [...ADDRS],
    userThreads: [],
    stallEdits: {},
    reelComments: {},
    vendorReviewReplies: {},
  };
}

export type Action =
  | { type: 'SET_TAB'; tab: AppState['tab'] }
  | { type: 'OPEN_EXPLORE_SEARCH' }
  | { type: 'SET_EXPLORE_FOCUS'; on: boolean }
  | { type: 'SET_STALL'; id: string | null }
  | { type: 'CANCEL_ORDER'; id: string }
  | { type: 'SET_AREA'; area: string }
  | { type: 'SET_QUERY'; query: string }
  | { type: 'TOGGLE_SAVE'; id: string }
  | { type: 'ADD_TO_CART'; sid: string; k: number }
  | { type: 'DEC_CART'; k: number }
  | { type: 'CLEAR_CART_START'; sid: string; k: number }
  | { type: 'SET_SHEET'; sheet: AppState['sheet'] }
  | { type: 'SET_NOTE'; note: string }
  | { type: 'SET_ADDR'; addr: string }
  | { type: 'SET_PAY'; pay: string }
  | { type: 'SET_PARTNER'; partner: string }
  | { type: 'PLACE_ORDER' }
  | { type: 'ADVANCE_ORDER'; id: string; to?: number }
  | { type: 'DECLINE_ORDER'; id: string }
  | { type: 'REORDER'; id: string }
  | { type: 'SET_FILTERS'; filters: Partial<AppState['filters']> }
  | { type: 'TOGGLE_THEME' } | { type: 'SET_THEME'; theme: AppState['theme'] }
  | { type: 'START_FLOW' } | { type: 'RESUME_FLOW' } | { type: 'EXIT_FLOW_DISCARD' } | { type: 'EXIT_FLOW_SAVE' }
  | { type: 'FLOW_NEXT' } | { type: 'FLOW_BACK' } | { type: 'FLOW_GOTO'; step: number }
  | { type: 'DRAFT_SET'; patch: Partial<AddDraft> }
  | { type: 'DRAFT_TOGGLE_FOOD'; v: string } | { type: 'DRAFT_TOGGLE_DAY'; v: string } | { type: 'DRAFT_TOGGLE_PAY'; v: string }
  | { type: 'DRAFT_TOGGLE_MUST'; v: string } | { type: 'DRAFT_TOGGLE_VIBE'; v: string }
  | { type: 'DRAFT_ADD_ITEM' } | { type: 'DRAFT_DEL_ITEM'; i: number } | { type: 'DRAFT_SET_ITEM'; i: number; patch: any }
  | { type: 'DRAFT_SET_PIN'; pin: [number, number] } | { type: 'DRAFT_APPLY_MAPS'; ll: [number, number]; area: string | null }
  | { type: 'DRAFT_ADD_PHOTO'; url: string } | { type: 'DRAFT_RM_PHOTO'; i: number }
  | { type: 'DRAFT_ADD_MENU_PHOTO'; file: File; url: string } | { type: 'DRAFT_RM_MENU_PHOTO'; i: number }
  | { type: 'SCAN_START' } | { type: 'SCAN_RESULT'; scan: AddDraft['scan']; items?: AddDraft['items'] } | { type: 'SCAN_DEMO' }
  | { type: 'DRAFT_SUBMIT' } | { type: 'FLOW_ANOTHER' }
  | { type: 'VENDOR_ON' } | { type: 'VENDOR_OFF' } | { type: 'VENDOR_SELECT'; id: string } | { type: 'VENDOR_TAB'; t: string }
  | { type: 'VENDOR_TOGGLE_OPEN' } | { type: 'VENDOR_ITEM_STATUS'; k: number; st: 'ok' | 'low' | 'out' }
  | { type: 'VENDOR_ADD_ITEM'; n: string; p: number; img?: string } | { type: 'VENDOR_PROMO_TOGGLE' }
  | { type: 'VENDOR_REPLY_REVIEW'; idx: number; text: string }
  | { type: 'VENDOR_CREATE_COMBO' }
  | { type: 'RESET_DEMO' }
  | { type: 'START_DEMO_PATH' }
  | { type: 'ESEG'; v: AppState['estab'] } | { type: 'THREAD_FILTER'; v: string } | { type: 'THREAD_OPEN'; id: string | null }
  | { type: 'VOTE'; id: string; v: 'up' | 'down' } | { type: 'POLL_VOTE'; id: string; i: number }
  | { type: 'COMMENT_LIKE'; tid: string; cid: string } | { type: 'REPLY_TO'; cid: string | null }
  | { type: 'REVIEW_HELPFUL'; key: string }
  | { type: 'POST_COMMENT'; tid: string; text: string } | { type: 'RSVP'; id: string }
  | { type: 'STORY_OPEN'; i: number } | { type: 'STORY_CLOSE' } | { type: 'STORY_NEXT' } | { type: 'STORY_PREV' }
  | { type: 'REEL_OPEN'; idx?: number } | { type: 'REEL_CLOSE' } | { type: 'REEL_NEXT' } | { type: 'REEL_PREV' }
  | { type: 'REEL_LIKE'; id: string } | { type: 'REEL_DISLIKE'; id: string } | { type: 'REEL_SAVE'; id: string }
  | { type: 'REEL_COMMENT'; id: string; text: string }
  | { type: 'RATE_SUBMIT'; sid: string; text: string; stars: number }
  | { type: 'TOAST'; msg: string | null }
  | { type: 'HEARD_STORY'; uid: string }
  | { type: 'HYDRATE'; saved: PersistedSlice }
  | { type: 'ADD_ADDRESS'; label: string; text: string; area: string }
  | { type: 'POST_THREAD'; title: string; body: string; cat: string }
  | { type: 'RESET_LOCAL' };

function cloneOrders(o: Order[]) { return o.map(x => ({ ...x, items: [...x.items], times: [...x.times] })); }

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATE':
      return mergePersisted(state, action.saved);
    case 'RESET_LOCAL':
    case 'RESET_DEMO':
      return { ...initialState(), toast: action.type === 'RESET_DEMO' ? 'Demo reset — fresh Jaipur sample data' : 'Local data cleared' };
    case 'START_DEMO_PATH':
      return {
        ...state,
        tab: 'home',
        stallId: null,
        sheet: { t: 'demopath' },
        toast: 'Follow the steps — takes about 3 minutes',
      };
    case 'ADD_ADDRESS': {
      const a: Addr = { id: 'a' + Date.now(), label: action.label.trim(), text: action.text.trim(), area: action.area };
      const label = `${a.label} · ${a.area}`;
      return { ...state, addresses: [...state.addresses, a], addr: label, toast: 'Address saved' };
    }
    case 'POST_THREAD': {
      if (!action.title.trim() || !action.body.trim()) return state;
      const t: Thread = {
        id: 'u' + Date.now(),
        uid: 'aarav',
        cat: action.cat,
        title: action.title.trim(),
        body: action.body.trim(),
        age: 0,
        up: 0,
        down: 0,
        comments: [],
      };
      return { ...state, userThreads: [t, ...state.userThreads], toast: 'Posted to community' };
    }
    case 'SET_TAB': {
      const closeOverlays = action.tab !== 'explore';
      return {
        ...state,
        tab: action.tab,
        stallId: null,
        addStage: action.tab === 'add' && state.addStage === 'done' ? 'intro' : state.addStage,
        reelOpen: closeOverlays ? false : state.reelOpen,
        storyOpen: closeOverlays ? false : state.storyOpen,
        exploreSearchFocus: action.tab === 'explore' ? state.exploreSearchFocus : false
      };
    }
    case 'OPEN_EXPLORE_SEARCH':
      return { ...state, tab: 'explore', stallId: null, exploreSearchFocus: true };
    case 'SET_EXPLORE_FOCUS':
      return { ...state, exploreSearchFocus: action.on };
    case 'SET_STALL': return { ...state, stallId: action.id };
    case 'SET_AREA': return { ...state, area: action.area };
    case 'SET_QUERY': return { ...state, query: action.query };
    case 'TOGGLE_SAVE': {
      const s = new Set(state.saved);
      s.has(action.id) ? s.delete(action.id) : s.add(action.id);
      return { ...state, saved: s };
    }
    case 'ADD_TO_CART': {
      const count = Object.values(state.cart.items).reduce((a, b) => a + b, 0);
      if (state.cart.sid && state.cart.sid !== action.sid && count > 0) {
        return { ...state, sheet: { t: 'clash', sid: action.sid, k: action.k } };
      }
      const items = state.cart.sid === action.sid ? { ...state.cart.items } : {};
      items[action.k] = (items[action.k] || 0) + 1;
      return { ...state, cart: { sid: action.sid, items } };
    }
    case 'DEC_CART': {
      const items = { ...state.cart.items };
      const q = (items[action.k] || 0) - 1;
      if (q <= 0) delete items[action.k]; else items[action.k] = q;
      const sid = Object.keys(items).length ? state.cart.sid : null;
      return { ...state, cart: { sid, items } };
    }
    case 'CLEAR_CART_START':
      return { ...state, cart: { sid: action.sid, items: { [action.k]: 1 } }, sheet: null };
    case 'SET_SHEET': return { ...state, sheet: action.sheet };
    case 'SET_NOTE': return { ...state, note: action.note };
    case 'SET_ADDR': return { ...state, addr: action.addr };
    case 'SET_PAY': return { ...state, pay: action.pay };
    case 'SET_PARTNER': return { ...state, partner: action.partner };
    case 'CANCEL_ORDER': {
      const orders = cloneOrders(state.orders);
      const o = orders.find(x => x.id === action.id);
      if (!o || !o.mine || o.cancelled || o.status >= 6) return state;
      o.cancelled = true;
      return { ...state, orders, toast: 'Order cancelled. You have not been charged.' };
    }
    case 'PLACE_ORDER': {
      if (!state.cart.sid) return state;
      const s = findStall(state.extraStalls, state.cart.sid)!;
      const p = partnerById(state.partner);
      const lines = Object.entries(state.cart.items).filter(([, v]) => v > 0).map(([k, v]) => ({ it: s.items[+k], q: v }));
      const sub = lines.reduce((a, l) => a + l.it.p * l.q, 0);
      const fee = deliveryFee(s, sub, state.area, state.partner);
      const order: Order = {
        id: 'CH-' + state.orderSeq, sid: s.id,
        items: lines.map(l => ({ n: l.it.n, p: l.it.p, q: l.q })),
        sub, fee, total: sub + fee + 5,
        status: 0, times: [Date.now()], auto: !state.vendor, cancelled: false,
        mine: true, rated: false, partner: p, cust: 'Aarav', placedAt: Date.now(), note: state.note.trim()
      };
      return {
        ...state, orders: [order, ...state.orders], cart: { sid: null, items: {} },
        sheet: null, stallId: null, tab: 'orders', note: '', orderSeq: state.orderSeq + 1,
        toast: 'Order sent to ' + s.name
      };
    }
    case 'ADVANCE_ORDER': {
      const orders = cloneOrders(state.orders);
      const o = orders.find(x => x.id === action.id);
      if (!o || o.cancelled || o.status >= 6) return state;
      const to = action.to ?? o.status + 1;
      o.status = to; o.times[to] = Date.now();
      if (to === 4) { o.rider = RIDERS[Math.floor(Math.random() * RIDERS.length)]; o.otp = String(1000 + Math.floor(Math.random() * 9000)); }
      let toast = state.toast;
      if (o.mine) {
        const s = findStall(state.extraStalls, o.sid)!;
        const msgs = ['', s.name + ' accepted your order', 'Your food is being cooked', 'Packed and ready for pickup', o.partner.name + ' rider assigned', 'On the way to you', 'Delivered. Enjoy!'];
        if (msgs[to]) toast = msgs[to];
      }
      return { ...state, orders, toast };
    }
    case 'DECLINE_ORDER': {
      const orders = cloneOrders(state.orders);
      const o = orders.find(x => x.id === action.id);
      if (o) o.cancelled = true;
      return { ...state, orders, toast: o?.mine ? 'The stall couldn’t take your order' : state.toast };
    }
    case 'REORDER': {
      const o = state.orders.find(x => x.id === action.id);
      if (!o) return state;
      const s = findStall(state.extraStalls, o.sid)!;
      const items: Record<number, number> = {};
      o.items.forEach(line => {
        const k = s.items.findIndex(x => x.n === line.n);
        if (k >= 0) items[k] = line.q;
      });
      return { ...state, cart: { sid: s.id, items }, sheet: { t: 'cart' } };
    }
    case 'SET_FILTERS': return { ...state, filters: { ...state.filters, ...action.filters } };
    case 'TOGGLE_THEME': return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'SET_THEME': return { ...state, theme: action.theme };

    case 'START_FLOW': return { ...state, draft: state.draft || newDraft(state.area), step: state.draft ? state.step : 0, addStage: 'flow' };
    case 'RESUME_FLOW': return { ...state, addStage: 'flow' };
    case 'EXIT_FLOW_DISCARD': return { ...state, draft: null, step: 0, addStage: 'intro', sheet: null };
    case 'EXIT_FLOW_SAVE': return { ...state, addStage: 'intro', sheet: null, toast: 'Draft saved' };
    case 'FLOW_NEXT': return { ...state, step: Math.min(6, state.step + 1) };
    case 'FLOW_BACK': return { ...state, step: Math.max(0, state.step - 1) };
    case 'FLOW_GOTO': return { ...state, step: action.step };
    case 'DRAFT_SET': return state.draft ? { ...state, draft: { ...state.draft, ...action.patch } } : state;
    case 'DRAFT_TOGGLE_FOOD': {
      if (!state.draft) return state;
      const f = state.draft.foods.includes(action.v) ? state.draft.foods.filter(x => x !== action.v) : [...state.draft.foods, action.v];
      return { ...state, draft: { ...state.draft, foods: f } };
    }
    case 'DRAFT_TOGGLE_DAY': {
      if (!state.draft) return state;
      const f = state.draft.days.includes(action.v) ? state.draft.days.filter(x => x !== action.v) : [...state.draft.days, action.v];
      return { ...state, draft: { ...state.draft, days: f } };
    }
    case 'DRAFT_TOGGLE_PAY': {
      if (!state.draft) return state;
      const f = state.draft.pay.includes(action.v) ? state.draft.pay.filter(x => x !== action.v) : [...state.draft.pay, action.v];
      return { ...state, draft: { ...state.draft, pay: f } };
    }
    case 'DRAFT_TOGGLE_MUST': {
      if (!state.draft) return state;
      const f = state.draft.must.includes(action.v) ? state.draft.must.filter(x => x !== action.v) : [...state.draft.must, action.v];
      return { ...state, draft: { ...state.draft, must: f } };
    }
    case 'DRAFT_TOGGLE_VIBE': {
      if (!state.draft) return state;
      const f = state.draft.vibes.includes(action.v) ? state.draft.vibes.filter(x => x !== action.v) : [...state.draft.vibes, action.v];
      return { ...state, draft: { ...state.draft, vibes: f } };
    }
    case 'DRAFT_ADD_ITEM': return state.draft ? { ...state, draft: { ...state.draft, items: [...state.draft.items, { n: '', p: '', v: true }] } } : state;
    case 'DRAFT_DEL_ITEM': return state.draft ? { ...state, draft: { ...state.draft, items: state.draft.items.filter((_, i) => i !== action.i) } } : state;
    case 'DRAFT_SET_ITEM': {
      if (!state.draft) return state;
      const items = state.draft.items.map((it, i) => (i === action.i ? { ...it, ...action.patch } : it));
      return { ...state, draft: { ...state.draft, items } };
    }
    case 'DRAFT_SET_PIN': return state.draft ? { ...state, draft: { ...state.draft, pin: action.pin } } : state;
    case 'DRAFT_APPLY_MAPS': {
      if (!state.draft) return state;
      const area = action.area || state.draft.area;
      return { ...state, draft: { ...state.draft, ll: action.ll, area, pin: [50, 50] }, toast: 'Pin set from Google Maps' };
    }
    case 'DRAFT_ADD_PHOTO': return state.draft ? { ...state, draft: { ...state.draft, photos: [...state.draft.photos, action.url] } } : state;
    case 'DRAFT_RM_PHOTO': return state.draft ? { ...state, draft: { ...state.draft, photos: state.draft.photos.filter((_, i) => i !== action.i) } } : state;
    case 'DRAFT_ADD_MENU_PHOTO':
      return state.draft ? { ...state, draft: { ...state.draft, menuFiles: [...state.draft.menuFiles, action.file], menuPrev: [...state.draft.menuPrev, action.url], scan: { st: 'idle' } } } : state;
    case 'DRAFT_RM_MENU_PHOTO':
      return state.draft ? { ...state, draft: { ...state.draft, menuFiles: state.draft.menuFiles.filter((_, i) => i !== action.i), menuPrev: state.draft.menuPrev.filter((_, i) => i !== action.i), scan: { st: 'idle' } } } : state;
    case 'SCAN_START': return state.draft ? { ...state, draft: { ...state.draft, scan: { st: 'scanning' } } } : state;
    case 'SCAN_RESULT': {
      if (!state.draft) return state;
      const items = action.items ? [...state.draft.items, ...action.items] : state.draft.items;
      return { ...state, draft: { ...state.draft, scan: action.scan, items } };
    }
    case 'DRAFT_SUBMIT': {
      if (!state.draft) return state;
      const d = state.draft;
      const catalogLen = allStalls(state.extraStalls).length;
      const id = 's' + (catalogLen + 1 + state.contrib.length);
      const pal: [string, string][] = [['#EF5350', '#B71C1C'], ['#7E57C2', '#4527A0'], ['#26C6DA', '#00838F'], ['#43A047', '#1B5E20']];
      const hrsMap: Record<string, string> = { Morning: '6 am – 12 pm', Afternoon: '12 pm – 5 pm', Evening: '5 pm – 10 pm', 'Late night': '9 pm – 1 am', 'All day': 'All day' };
      const hours = (d.open && d.close) ? `${d.open} – ${d.close}` : (hrsMap[d.hours] || 'Hours not added');
      const foods = d.foods.length ? d.foods : ['chaat'];
      const iconFood = foods[0] || 'other';
      const validItems = d.items.filter(i => i.n.trim() && +i.p > 0).map(i => ({ n: i.n.trim(), p: +i.p, v: i.v, d: '', st: 'ok' as const, e: iconFood }));
      const newStall: Stall = {
        id, name: d.name.trim() || 'Your stall', area: d.area, foods, e: iconFood, c: pal[catalogLen % 4],
        tags: ['New'], rating: d.rating, n: 1, pct: d.rec ? 100 : 0, hours, open: true,
        prep: d.wait === 'Under 5 min' ? 4 : d.wait === '10–15 min' ? 12 : d.wait === '15+ min' ? 18 : 8,
        orderable: false, addedBy: 'You', photos: d.photos.slice(), menuPics: d.menuPrev.slice(),
        extra: [d.pay.join(' & '), d.seat, d.wait, d.parcel ? 'Parcel-ready' : ''].filter(Boolean),
        phone: d.phone, tip: d.note.trim() || ('Near ' + (d.landmark || d.area)),
        items: validItems,
        reviews: [{ who: 'Aarav', lvl: 'Local Guide Lv ' + (Math.floor(state.points / 150) + 1), text: d.note.trim() || 'Added this one myself. Worth trying.', food: d.must[0] || validItems[0]?.n || 'the food', likes: 0, when: 'just now', e: iconFood, photo: d.photos[0] }]
      };
      const lastPts = 30 + (d.menuPrev.length ? 20 : 0) + (d.photos.length ? 10 : 0);
      return {
        ...state,
        extraStalls: [...state.extraStalls, newStall],
        contrib: [...state.contrib, id],
        done: id,
        draft: null,
        step: 0,
        addStage: 'done',
        points: state.points + lastPts,
        lastPts
      };
    }
    case 'FLOW_ANOTHER': return { ...state, done: null, addStage: 'intro' };

    case 'VENDOR_ON': return { ...state, vendor: true, vtab2: 'today', stallId: null };
    case 'VENDOR_OFF': return { ...state, vendor: false };
    case 'VENDOR_SELECT': return { ...state, vsid: action.id };
    case 'VENDOR_TAB': return { ...state, vtab2: action.t };
    case 'VENDOR_TOGGLE_OPEN': {
      const base = findStall(state.extraStalls, state.vsid);
      if (!base) return state;
      const open = !(state.stallEdits[state.vsid]?.open ?? base.open);
      return { ...state, stallEdits: patchStall(state.stallEdits, state.vsid, { open }) };
    }
    case 'VENDOR_ITEM_STATUS': {
      const s = findStall(state.extraStalls, state.vsid);
      if (!s) return state;
      const cur = state.stallEdits[state.vsid]?.items ?? s.items;
      const items = cur.map((it, i) => (i === action.k ? { ...it, st: action.st } : it));
      return { ...state, stallEdits: patchStall(state.stallEdits, state.vsid, { items }), toast: 'Menu updated' };
    }
    case 'VENDOR_ADD_ITEM': {
      const s = findStall(state.extraStalls, state.vsid);
      if (!s) return state;
      const cur = state.stallEdits[state.vsid]?.items ?? s.items;
      const items = [...cur, { n: action.n, p: action.p, v: true, d: '', st: 'ok' as const, e: s.e, img: action.img }];
      return { ...state, stallEdits: patchStall(state.stallEdits, state.vsid, { items }), toast: action.n + ' added to menu', vAddPhoto: null };
    }
    case 'VENDOR_PROMO_TOGGLE': {
      const next = !state.vpromoOn;
      const base = findStall(state.extraStalls, state.vsid);
      if (!base) return state;
      const freeDeliveryPromo = next;
      return {
        ...state,
        vpromoOn: next,
        stallEdits: patchStall(state.stallEdits, state.vsid, { freeDeliveryPromo }),
        toast: next ? 'Free delivery promo is live on orders above ₹150' : 'Promo turned off',
      };
    }
    case 'VENDOR_REPLY_REVIEW': {
      const text = action.text.trim();
      if (!text) return state;
      const key = `${state.vsid}:${action.idx}`;
      return {
        ...state,
        vendorReviewReplies: { ...state.vendorReviewReplies, [key]: text },
        toast: 'Reply posted — customer will see it in the app',
      };
    }
    case 'VENDOR_CREATE_COMBO': {
      const s = findStall(state.extraStalls, state.vsid);
      if (!s || s.items.length < 2) return state;
      const top = [...(state.stallEdits[state.vsid]?.items ?? s.items)].sort((a, b) => b.p - a.p).slice(0, 2);
      const price = Math.round(top[0].p + top[1].p - 15);
      const name = `${top[0].n.split(' ')[0]} + ${top[1].n.split(' ')[0]} combo`;
      const cur = state.stallEdits[state.vsid]?.items ?? s.items;
      const items = [...cur, { n: name, p: price, v: true, d: 'Vendor combo — saves ₹15', st: 'ok' as const, pop: true, e: s.e }];
      return { ...state, stallEdits: patchStall(state.stallEdits, state.vsid, { items }), toast: 'Combo added to your menu' };
    }

    case 'ESEG':
      return {
        ...state,
        estab: action.v,
        reelOpen: false
      };
    case 'THREAD_FILTER': return { ...state, threadFilter: action.v };
    case 'THREAD_OPEN': return { ...state, threadOpen: action.id };
    case 'VOTE': {
      const t = THREADS.find(x => x.id === action.id);
      if (!t) return state;
      const votes = { ...state.votes };
      const cur = votes[action.id];
      if (cur === action.v) { (t as any)[action.v]--; votes[action.id] = null; }
      else { if (cur) (t as any)[cur]--; (t as any)[action.v]++; votes[action.id] = action.v; }
      return { ...state, votes };
    }
    case 'POLL_VOTE': {
      if (state.pollPick[action.id] !== undefined) return state;
      const t = THREADS.find(x => x.id === action.id);
      if (!t || !t.poll) return state;
      t.poll.opts[action.i][1]++;
      return { ...state, pollPick: { ...state.pollPick, [action.id]: action.i } };
    }
    case 'COMMENT_LIKE': {
      const t = THREADS.find(x => x.id === action.tid);
      if (!t) return state;
      const find = (arr: any[]): any => { for (const c of arr) { if (c.id === action.cid) return c; const r = find(c.replies || []); if (r) return r; } return null; };
      const c = find(t.comments);
      const key = action.tid + action.cid;
      const clikes = new Set(state.clikes);
      if (c) { if (clikes.has(key)) { c.likes--; clikes.delete(key); } else { c.likes++; clikes.add(key); } }
      return { ...state, clikes };
    }
    case 'REPLY_TO': return { ...state, replyTo: action.cid };
    case 'REVIEW_HELPFUL': {
      const clikes = new Set(state.clikes);
      clikes.has(action.key) ? clikes.delete(action.key) : clikes.add(action.key);
      return { ...state, clikes };
    }
    case 'POST_COMMENT': {
      const t = THREADS.find(x => x.id === action.tid);
      if (!t || !action.text.trim()) return state;
      const c = { id: 'c' + Date.now(), u: 'aarav', t: action.text.trim(), likes: 0, age: 0, replies: [] };
      if (state.replyTo) {
        const find = (arr: any[]): any => { for (const x of arr) { if (x.id === state.replyTo) return x; const r = find(x.replies || []); if (r) return r; } return null; };
        const p = find(t.comments);
        (p ? p.replies : t.comments).push(c);
      } else t.comments.push(c);
      return { ...state, replyTo: null, commentDraft: '' };
    }
    case 'RSVP': {
      const t = THREADS.find(x => x.id === action.id);
      if (!t || !t.event) return state;
      t.rsvp = !t.rsvp;
      t.event.going += t.rsvp ? 1 : -1;
      return { ...state, toast: t.rsvp ? 'You are in! See you Sunday.' : 'RSVP removed' };
    }

    case 'STORY_OPEN': return { ...state, storyOpen: true, storyIdx: action.i, storySlide: 0 };
    case 'STORY_CLOSE': return { ...state, storyOpen: false };
    case 'STORY_NEXT': {
      const g = STORIES[state.storyIdx];
      if (!g || state.storySlide >= g.slides.length - 1) return state;
      return { ...state, storySlide: state.storySlide + 1 };
    }
    case 'STORY_PREV': return { ...state, storySlide: Math.max(0, state.storySlide - 1) };
    case 'HEARD_STORY': { const s = new Set(state.seenStories); s.add(action.uid); return { ...state, seenStories: s }; }

    case 'REEL_OPEN': return { ...state, reelOpen: true, reelIdx: action.idx ?? state.reelIdx };
    case 'REEL_CLOSE': return { ...state, reelOpen: false };
    case 'REEL_NEXT': return { ...state, reelIdx: Math.min(REELS.length - 1, state.reelIdx + 1) };
    case 'REEL_PREV': return { ...state, reelIdx: Math.max(0, state.reelIdx - 1) };
    case 'REEL_LIKE': { const r = { ...state.rxn }; r[action.id] = r[action.id] === 'like' ? null : 'like'; return { ...state, rxn: r }; }
    case 'REEL_DISLIKE': { const r = { ...state.rxn }; r[action.id] = r[action.id] === 'dislike' ? null : 'dislike'; return { ...state, rxn: r }; }
    case 'REEL_SAVE': { const s = new Set(state.rsave); s.has(action.id) ? s.delete(action.id) : s.add(action.id); return { ...state, rsave: s }; }
    case 'REEL_COMMENT': {
      const text = action.text.trim();
      if (!text) return state;
      const cm: ReelComment = { u: 'aarav', t: text, likes: 0, when: 'now' };
      const prev = state.reelComments[action.id] ?? [];
      return { ...state, reelComments: { ...state.reelComments, [action.id]: [...prev, cm] } };
    }

    case 'RATE_SUBMIT': {
      const base = findStall(state.extraStalls, action.sid);
      if (!base || action.stars < 1) return state;
      const stars = Math.min(5, Math.max(1, action.stars));
      const patch = state.stallEdits[action.sid];
      const prevN = patch?.n ?? base.n;
      const prevRating = patch?.rating ?? base.rating;
      const newN = prevN + 1;
      const newRating = Math.round(((prevRating * prevN + stars) / newN) * 10) / 10;
      const lvl = Math.floor(state.points / 150) + 1;
      const review: Review = {
        who: 'Aarav',
        lvl: 'Local Guide Lv ' + lvl,
        text: action.text.trim() || 'Worth a visit.',
        food: base.items[0]?.n || '',
        likes: 0,
        when: 'just now',
        e: base.e,
        stars,
      };
      const prevReviews = patch?.reviews ?? [];
      const orders = cloneOrders(state.orders).map(o => (o.sid === action.sid && o.mine ? { ...o, rated: true } : o));
      return {
        ...state,
        orders,
        sheet: null,
        stallEdits: patchStall(state.stallEdits, action.sid, {
          reviews: [review, ...prevReviews],
          n: newN,
          rating: newRating,
        }),
        toast: 'Thanks! Your review is live.',
      };
    }
    case 'TOAST': return { ...state, toast: action.msg };
    default: return state;
  }
}
