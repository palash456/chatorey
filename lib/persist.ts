import type { AppState, AddDraft } from '../context/reducer';
import type { Order, Stall, Addr, Thread, ReelComment } from './types';
import type { StallEditsMap } from './stallEdits';

const KEY = 'chatorey:v1';

export type PersistedSlice = {
  tab: AppState['tab'];
  area: string;
  query: string;
  cart: AppState['cart'];
  saved: string[];
  filters: AppState['filters'];
  orders: Order[];
  partner: string;
  addr: string;
  pay: string;
  addStage: AppState['addStage'];
  step: number;
  draft: AddDraft | null;
  contrib: string[];
  theme: AppState['theme'];
  points: number;
  note: string;
  orderSeq: number;
  estab: AppState['estab'];
  threadFilter: string;
  pollPick: Record<string, number>;
  votes: Record<string, 'up' | 'down' | null>;
  clikes: string[];
  rxn: Record<string, 'like' | 'dislike' | null>;
  rsave: string[];
  seenStories: string[];
  extraStalls: Stall[];
  vpromoOn: boolean;
  addresses?: Addr[];
  userThreads?: Thread[];
  stallEdits?: StallEditsMap;
  reelComments?: Record<string, ReelComment[]>;
  vendorReviewReplies?: Record<string, string>;
};

export function sliceForPersist(state: AppState): PersistedSlice {
  return {
    tab: state.tab,
    area: state.area,
    query: state.query,
    cart: state.cart,
    saved: [...state.saved],
    filters: state.filters,
    orders: state.orders,
    partner: state.partner,
    addr: state.addr,
    pay: state.pay,
    addStage: state.addStage,
    step: state.step,
    draft: state.draft,
    contrib: state.contrib,
    theme: state.theme,
    points: state.points,
    note: state.note,
    orderSeq: state.orderSeq,
    estab: state.estab,
    threadFilter: state.threadFilter,
    pollPick: state.pollPick,
    votes: state.votes,
    clikes: [...state.clikes],
    rxn: state.rxn,
    rsave: [...state.rsave],
    seenStories: [...state.seenStories],
    extraStalls: state.extraStalls,
    vpromoOn: state.vpromoOn,
    addresses: state.addresses,
    userThreads: state.userThreads,
    stallEdits: state.stallEdits,
    reelComments: state.reelComments,
    vendorReviewReplies: state.vendorReviewReplies,
  };
}

export function loadPersisted(): PersistedSlice | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedSlice;
  } catch {
    return null;
  }
}

export function savePersisted(slice: PersistedSlice) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(slice));
  } catch {
    /* quota or private mode */
  }
}

export function mergePersisted(base: AppState, saved: PersistedSlice): AppState {
  return {
    ...base,
    ...saved,
    saved: new Set(saved.saved),
    clikes: new Set(saved.clikes),
    rsave: new Set(saved.rsave),
    seenStories: new Set(saved.seenStories),
    stallId: null,
    sheet: null,
    vendor: false,
    storyOpen: false,
    reelOpen: false,
    threadOpen: null,
    toast: null,
    exploreSearchFocus: false,
    replyTo: null,
    commentDraft: '',
    done: null,
    lastPts: 0,
    vAddPhoto: null,
    addresses: saved.addresses ?? base.addresses,
    userThreads: saved.userThreads ?? base.userThreads,
    stallEdits: saved.stallEdits ?? base.stallEdits,
    reelComments: saved.reelComments ?? base.reelComments,
    vendorReviewReplies: saved.vendorReviewReplies ?? base.vendorReviewReplies,
  };
}

export function clearPersist() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
