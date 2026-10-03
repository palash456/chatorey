export type Item = {
  n: string; p: number; v: boolean; d: string;
  st: 'ok' | 'low' | 'out';
  pop?: boolean; img?: string; e?: string;
};
export type Review = {
  who: string; lvl: string; text: string; food: string;
  likes: number; when: string; e: string; photo?: string; stars?: number;
};
export type Stall = {
  id: string; name: string; area: string; foods: string[];
  e: string; c: [string, string]; tags: string[];
  rating: number; n: number; pct: number; hours: string;
  open: boolean; prep: number; orderable: boolean;
  tip: string; items: Item[]; reviews: Review[];
  photos: string[]; menuPics?: string[];
  addedBy?: string; extra?: string[]; phone?: string;
  freeDeliveryPromo?: boolean;
};
export type Partner = { id: string; name: string; soon: boolean; quote: (d: number) => { fee: number; eta: number } };
export type Rider = { n: string; r: number; v: string };
export type CartLine = { k: number; it: Item; q: number };
export type Order = {
  id: string; sid: string;
  items: { n: string; p: number; q: number }[];
  sub: number; fee: number; total: number;
  status: number; times: number[]; auto: boolean; cancelled: boolean;
  mine: boolean; rated: boolean; partner: Partner;
  cust?: string; placedAt: number; note?: string;
  rider?: Rider; otp?: string;
};
export type User = { n: string; lv: number; bd: string; c: string; pts: number; photo?: string };
export type Comment = { id: string; u: string; t: string; likes: number; age: number; replies: Comment[] };
export type Poll = { q: string; opts: [string, number][] };
export type ThreadEvent = { title: string; when: string; where: string; going: number; cap: number };
export type Thread = {
  id: string; uid: string; cat: string; title: string; body: string;
  age: number; up: number; down: number;
  pinned?: boolean; live?: boolean; sid?: string; img?: string;
  poll?: Poll; event?: ThreadEvent; comments: Comment[]; rsvp?: boolean;
};
export type StorySlide = { id: string; e: string; c: [string, string]; cap: string; sid?: string; when: string };
export type StoryGroup = { uid: string; slides: StorySlide[] };
export type ReelComment = { u: string; t: string; likes: number; when: string };
export type Reel = {
  id: string; u: string; sid: string; cap: string; music: string;
  e: string; c: [string, string]; likes: number; dislikes: number;
  saves: number; when: string; dur: string; cm: ReelComment[];
};
export type Addr = { id: string; label: string; text: string; area: string };
