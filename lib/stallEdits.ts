import type { Item, Review, Stall } from './types';

export type StallEditPatch = {
  reviews?: Review[];
  items?: Item[];
  rating?: number;
  n?: number;
  open?: boolean;
  freeDeliveryPromo?: boolean;
};

export type StallEditsMap = Record<string, StallEditPatch>;

export function applyStallEdits(base: Stall, patch?: StallEditPatch): Stall {
  if (!patch) return base;
  return {
    ...base,
    ...patch,
    items: patch.items ?? base.items,
    reviews: patch.reviews ? [...patch.reviews, ...base.reviews] : base.reviews,
    rating: patch.rating ?? base.rating,
    n: patch.n ?? base.n,
    open: patch.open ?? base.open,
    freeDeliveryPromo: patch.freeDeliveryPromo ?? base.freeDeliveryPromo,
  };
}

export function patchStall(edits: StallEditsMap, id: string, patch: Partial<StallEditPatch>): StallEditsMap {
  return { ...edits, [id]: { ...edits[id], ...patch } };
}
