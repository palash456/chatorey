/**
 * ~5× scale Jaipur demo corpus (deterministic). Feeds STALLS s41–s200, users, threads, stories, reels.
 */
import type { Stall, User, Thread, StoryGroup, Reel, Item, Review, Comment } from '../types';

const AREA_NAMES = [
  'Johari Bazaar', 'Bapu Bazaar', 'Tripolia Bazaar', 'Chandpole', 'Ajmeri Gate', 'Sindhi Camp', 'MI Road',
  'Ram Niwas Bagh', 'Chameliwala Market', 'Raja Park', 'C-Scheme', 'Bani Park', 'Vaishali Nagar', 'Malviya Nagar',
  'Mansarovar', 'Jawahar Circle', 'Gopalpura', 'Sanganer', 'Amer Road', 'Nahargarh Road', 'Civil Lines', 'Tonk Road', 'Sodala'
];

const FOODS = [
  'kachori', 'chaat', 'golgappe', 'chai', 'lassi', 'ghewar', 'jalebi', 'samosa', 'momos', 'dal baati',
  'mirchi bada', 'kulfi', 'pav bhaji', 'chole kulche', 'rolls', 'sweets'
] as const;

const FOOD_E: Record<string, string> = {
  kachori: '🧆', chaat: '🥣', golgappe: '🫧', chai: '☕', lassi: '🥛', ghewar: '🥞', jalebi: '🍯', samosa: '🥔',
  momos: '🥟', 'dal baati': '🍛', 'mirchi bada': '🌶️', kulfi: '🍨', 'pav bhaji': '🍞', 'chole kulche': '🫓', rolls: '🌯', sweets: '🍬'
};

const PALETTES: [string, string][] = [
  ['#E8A317', '#C2560B'], ['#43A047', '#F9A825'], ['#F06292', '#AD1457'], ['#26A69A', '#00695C'],
  ['#5C6BC0', '#283593'], ['#FB8C00', '#E65100'], ['#8E24AA', '#F06292'], ['#6D4C41', '#BCAAA4'],
  ['#00897B', '#80CBC4'], ['#EF5350', '#B71C1C'], ['#FFCA28', '#FF7043'], ['#7CB342', '#33691E']
];

const SUFFIX = ['Wale', 'Bhandar', 'Corner', 'Thela', 'House', 'Cart', 'Point', 'Ki Dukaan', 'Stall', 'Lane Cart'];
const PREFIX = ['Shree', 'Banna', 'Lal', 'New', 'Old City', 'Pink City', 'Royal', 'Janta', 'Seth', ''];

const MENU: Record<string, [string, number, string][]> = {
  kachori: [['Pyaaz kachori', 25, 'Onion filling, served with sabzi'], ['Mawa kachori', 55, 'Sweet, syrup-dipped'], ['Dal kachori', 22, 'Moong dal stuffing']],
  chaat: [['Raj kachori', 75, 'Loaded with curd and chutney'], ['Papdi chaat', 50, 'Crisp wafers, cold curd'], ['Dahi bhalla', 45, 'Soft lentil dumplings']],
  golgappe: [['Golgappe (6 pcs)', 25, 'Pudina paani'], ['Dahi golgappa', 40, 'Curd-filled'], ['Sev puri', 30, 'Tangy and crisp']],
  chai: [['Kulhad chai', 15, 'Ginger-elaichi'], ['Adrak chai', 12, 'Strong small cup'], ['Bun maska', 30, 'With Amul butter']],
  lassi: [['Plain lassi', 40, 'Thick curd'], ['Kesar lassi', 60, 'Saffron and malai'], ['Mango lassi', 70, 'Seasonal']],
  ghewar: [['Plain ghewar', 60, 'Honeycomb disc'], ['Malai ghewar', 90, 'Fresh malai topping'], ['Rabri ghewar', 110, 'With rabri']],
  jalebi: [['Garam jalebi (200 g)', 50, 'Hot from kadhai'], ['Rabri jalebi', 90, 'With thick rabri'], ['Jalebi (100 g)', 30, 'Morning batch']],
  samosa: [['Samosa (1 pc)', 15, 'Fennel-heavy aloo'], ['Samosa chaat', 45, 'Crushed with curd'], ['Kachori-samosa combo', 30, 'One each']],
  momos: [['Steamed veg momos (8)', 60, 'Hand-folded'], ['Kurkure momos (6)', 90, 'Extra crunch'], ['Paneer momos (6)', 80, 'Tandoori style']],
  'dal baati': [['Dal baati churma', 110, 'Ghee-rich plate'], ['Extra baati', 15, 'Charcoal baked'], ['Panchmel dal cup', 40, 'Thick dal']],
  'mirchi bada': [['Mirchi bada', 15, 'Fresh fried'], ['Mirchi bada chaat', 35, 'With onion mix'], ['Pakodi plate', 30, 'Moong dal']],
  kulfi: [['Matka kulfi', 50, 'Cardamom milk'], ['Kesar kulfi', 60, 'Saffron'], ['Kulfi falooda', 90, 'Rose syrup']],
  'pav bhaji': [['Pav bhaji', 90, 'Two buttered pav'], ['Masala pav', 50, 'Griddled'], ['Cheese pav bhaji', 110, 'Extra cheese']],
  'chole kulche': [['Chole kulche', 60, 'Two kulche'], ['Amritsari kulcha', 80, 'Stuffed'], ['Extra chole', 30, 'Small cup']],
  rolls: [['Paneer kathi roll', 80, 'Smoky paneer'], ['Egg roll', 60, 'Double egg'], ['Chicken roll', 90, 'Tandoori chicken']],
  sweets: [['Rabri (cup)', 40, 'Slow-cooked'], ['Malpua rabri', 70, 'Two malpua'], ['Ghewar slice', 65, 'Same-day']]
};

const TIPS = [
  'Ask for the second batch — crunch is better.',
  'Go before 10 am on weekends.',
  'Chutney on the side for delivery.',
  'Cash and UPI both work.',
  'Tell them Chatorey sent you — they smile.',
  'Evening batch from 5 pm is the sweet spot.',
  'Share a plate; portions are generous.',
  'Park near the pink gate and walk 2 minutes.',
];

const REVIEW_SNIPS = [
  'Worth the queue.',
  'Same taste for years.',
  'Not too oily — rare for street food.',
  'Delivery arrived warm.',
  'Hidden but locals know.',
  'Price went up ₹5 but still fair.',
  'Best in this area, honestly.',
  'Come early or sell-out.',
  'Chutney is the star.',
  'My nani used to bring me here.',
];

const FIRST = [
  'Amit', 'Pooja', 'Rahul', 'Neha', 'Kavita', 'Suresh', 'Anita', 'Vivek', 'Divya', 'Manoj', 'Rekha', 'Sanjay',
  'Pallavi', 'Naveen', 'Shreya', 'Ashok', 'Geeta', 'Rakesh', 'Simran', 'Harish', 'Lata', 'Mohit', 'Kiran', 'Dinesh',
  'Swati', 'Ajay', 'Nidhi', 'Pradeep', 'Meenakshi', 'Gaurav', 'Bhavna', 'Sunil', 'Anjali', 'Vinod', 'Preeti', 'Rajesh',
  'Sunita', 'Deepak', 'Mamta', 'Anil', 'Poonam', 'Ravi', 'Seema', 'Asha', 'Chetan', 'Urmila', 'Gopal', 'Lakshmi',
  'Hemant', 'Radha', 'Nitin', 'Sarita', 'Yash', 'Ira', 'Kartik', 'Tanvi', 'Abhishek', 'Muskan', 'Harsh', 'Jyoti',
  'Tarun', 'Nupur', 'Siddharth', 'Payal', 'Varun', 'Shivani', 'Akash', 'Ritu', 'Nikhil', 'Garima', 'Rohit', 'Komal',
  'Aman', 'Sakshi', 'Vishal', 'Ekta', 'Parth', 'Bhumi', 'Karan', 'Ishita', 'Aditya', 'Naina', 'Rishabh', 'Tisha'
];

const COLORS = [
  '#D81E5B', '#1E88E5', '#8E24AA', '#43A047', '#F4511E', '#00897B', '#6D4C41', '#3949AB', '#C2185B', '#455A64',
  '#F9A825', '#5D4037', '#00ACC1', '#7E57C2', '#2E7D32', '#D32F2F', '#512DA8', '#1565C0', '#6A1B9A', '#EF6C00'
];

const THREAD_TITLES = [
  'Best {food} in {area}?',
  'Is {area} still worth it for street food?',
  'Late-night {food} near {area}',
  'Hidden {food} stall in {area} — share pins',
  'Meetup: {food} crawl in {area}',
  'Vendor tip: handling monsoon rush at {area}',
  'Compare: {food} vs {food2} for breakfast',
  'Chatorey delivery: who ships {food} hot?',
  'Old vs new stalls in {area}',
  'Tourist trap or legit in {area}?',
];

const THREAD_BODY = [
  'Been eating around Jaipur for years. What’s your go-to in {area} for {food}? Mention time of day.',
  'Family visiting from Delhi — need honest picks near {area}, not hotel lobbies.',
  'Office crowd in {area} — where do you get {food} under ₹100?',
  'Added a stall on Chatorey last week. Who else should we list in {area}?',
  'Rainy evening cravings: {food} and chai. Where in {area}?',
];

const STORY_CAPS = [
  'First bite at {area}.',
  'Locals’ queue at {area} — worth it.',
  'Then {food} because Jaipur.',
  'Parcel test: still crisp at home.',
  'Sunday morning ritual in {area}.',
  'Post-Hawa Mahal detour for {food}.',
];

const REEL_CAPS = [
  'POV: {food} in {area}',
  'Sound on — {area} street energy',
  'Jaipur mornings = {food}',
  'Hidden lane near {area}',
  'Would you queue 20 min for this?',
];

function mulberry32(a: number) {
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pickN<T>(rng: () => number, arr: readonly T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) {
    const j = Math.floor(rng() * copy.length);
    out.push(copy.splice(j, 1)[0]);
  }
  return out;
}

const img = (n: number) => `/images/covers/cover-s${((n - 1) % 30) + 1}.jpg`;
const bonus = (n: number) => `/images/bonus/${['stall-cover-01', 'food-premium-01', 'cafe-premium-01', 'food-premium-03', 'stall-cover-06'][n % 5]}.jpg`;

let cid = 50000;
function cm(u: string, t: string, likes: number, age: number): Comment {
  return { id: 'c' + cid++, u, t, likes, age, replies: [] };
}

function fill(s: string, map: Record<string, string>) {
  return s.replace(/\{(\w+)\}/g, (_, k) => map[k] ?? k);
}

function buildUsers(): Record<string, User> {
  const out: Record<string, User> = {};
  const badges = ['Foodie', 'Local Guide', 'Newbie', 'Foodie', 'Local Guide'] as const;
  for (let i = 0; i < FIRST.length; i++) {
    const uid = `u${1000 + i}`;
    const lv = 1 + (i % 5);
    out[uid] = {
      n: FIRST[i],
      lv,
      bd: badges[i % badges.length],
      c: COLORS[i % COLORS.length],
      pts: 40 + (i * 37) % 2400,
      ...(i < 12 ? { photo: `/images/avatars/avatar-${['meera', 'kunal', 'nisha', 'dev', 'riya', 'sneha', 'aditi', 'vikram', 'tanya', 'rohan', 'arjun', 'farhan'][i]}.jpg` } : {})
    };
  }
  return out;
}

function buildStalls(userIds: string[]): Stall[] {
  const stalls: Stall[] = [];
  const startId = 41;
  const count = 160; // s41–s200 → 200 total with hand-crafted 40

  for (let i = 0; i < count; i++) {
    const id = 's' + (startId + i);
    const rng = mulberry32(1000 + i * 17);
    const area = pick(rng, AREA_NAMES);
    const foods = pickN(rng, [...FOODS], rng() > 0.35 ? 2 : 1);
    const main = foods[0];
    const pre = rng() > 0.6 ? pick(rng, PREFIX) + ' ' : '';
    const name = `${pre}${area.split(' ')[0]} ${main[0].toUpperCase() + main.slice(1)} ${pick(rng, SUFFIX)}`.replace(/\s+/g, ' ').trim();
    const pal = pick(rng, PALETTES);
    const years = 1 + Math.floor(rng() * 9);
    const n = Math.round(15 + years * 45 + rng() * 400);
    const rating = Math.round((3.85 + rng() * 1.05) * 10) / 10;
    const pct = Math.round(82 + rng() * 16);
    const tags: string[] = [];
    if (rng() > 0.88) tags.push('Hidden gem');
    if (rng() > 0.82) tags.push('Locals’ pick');
    if (rng() > 0.9) tags.push('Trending');
    if (rng() > 0.93) tags.push('Cafe');
    if (years < 2 && rng() > 0.5) tags.push('New');
    const menuBase = MENU[main] || MENU.chaat;
    const items: Item[] = menuBase.slice(0, 3 + Math.floor(rng() * 2)).map(([n, p, d], j) => ({
      n, p: p + Math.floor(rng() * 8) - 2, v: true, d, st: rng() > 0.92 ? 'low' : 'ok', pop: j === 0, e: FOOD_E[main]
    }));
    if (foods[1] && MENU[foods[1]]) {
      const extra = MENU[foods[1]][0];
      items.push({ n: extra[0], p: extra[1], v: true, d: extra[2], st: 'ok', e: FOOD_E[foods[1]] });
    }
    const reviewCount = 2 + Math.floor(rng() * 4);
    const reviews: Review[] = [];
    const nameOf = (uid: string) => SCALE_USERS[uid]?.n || uid.charAt(0).toUpperCase() + uid.slice(1);
    for (let r = 0; r < reviewCount; r++) {
      const uid = pick(rng, userIds);
      reviews.push({
        who: nameOf(uid),
        lvl: `Foodie Lv ${1 + Math.floor(rng() * 4)}`,
        text: pick(rng, REVIEW_SNIPS) + ' ' + pick(rng, TIPS),
        food: items[r % items.length].n,
        likes: Math.floor(rng() * 80),
        when: `${1 + Math.floor(rng() * 28)} days ago`,
        e: FOOD_E[main]
      });
    }
    const hoursOpts = ['6 am – 2 pm', '8 am – 10 pm', '11 am – 11 pm', '4 pm – 11 pm', '7 am – 3 pm', '12 pm – 10 pm', '5 pm – 1 am'];
    stalls.push({
      id, name, area, foods: [...foods], e: FOOD_E[main], c: pal, tags,
      rating, n, pct,
      hours: pick(rng, hoursOpts),
      open: rng() > 0.12,
      prep: 5 + Math.floor(rng() * 12),
      orderable: rng() > 0.08,
      tip: pick(rng, TIPS),
      photos: [img(startId + i), bonus(i)],
      items, reviews,
      ...(rng() > 0.85 ? { addedBy: (() => { const u = pick(rng, userIds); return SCALE_USERS[u]?.n || u; })() } : {}),
      ...(rng() > 0.9 ? { freeDeliveryPromo: true } : {})
    });
  }
  return stalls;
}

function buildThreads(stallIds: string[], userIds: string[]): Thread[] {
  const cats = ['Recommendations', 'Questions', 'Hidden gems', 'Meetups', 'Vendors'] as const;
  const threads: Thread[] = [];
  for (let i = 0; i < 64; i++) {
    const rng = mulberry32(2000 + i);
    const area = pick(rng, AREA_NAMES);
    const food = pick(rng, FOODS);
    const food2 = pick(rng, FOODS);
    const map = { area, food, food2 };
    const uid = pick(rng, userIds);
    const sid = pick(rng, stallIds);
    const title = fill(pick(rng, THREAD_TITLES), map);
    const body = fill(pick(rng, THREAD_BODY), map);
    const age = Math.round(200 + rng() * 800000);
    const comments: Comment[] = [];
    const nc = 1 + Math.floor(rng() * 4);
    for (let c = 0; c < nc; c++) {
      comments.push(cm(pick(rng, userIds), pick(rng, REVIEW_SNIPS) + ` (${area})`, Math.floor(rng() * 40), Math.floor(age * 0.3)));
    }
    threads.push({
      id: 't' + (100 + i),
      uid, cat: pick(rng, [...cats]), title, body,
      age, up: Math.floor(10 + rng() * 400), down: Math.floor(rng() * 8),
      sid, img: bonus(i),
      ...(rng() > 0.92 ? { pinned: false, live: true, event: { title: `${food} walk`, when: 'Sat, 6 pm', where: area, going: 8 + Math.floor(rng() * 30), cap: 40 } } : {}),
      ...(rng() > 0.88 ? { poll: { q: 'Your pick', opts: [[area + ' stall A', 40 + i], [area + ' stall B', 30 + i], ['Somewhere else', 10 + i]] } } : {}),
      comments
    });
  }
  return threads;
}

function buildStories(stallIds: string[], userIds: string[]): StoryGroup[] {
  const groups: StoryGroup[] = [];
  for (let i = 0; i < 52; i++) {
    const rng = mulberry32(3000 + i);
    const uid = pick(rng, userIds);
    const slides = 1 + Math.floor(rng() * 3);
    const slideArr = [];
    for (let s = 0; s < slides; s++) {
      const area = pick(rng, AREA_NAMES);
      const food = pick(rng, FOODS);
      const sid = pick(rng, stallIds);
      const pal = pick(rng, PALETTES);
      slideArr.push({
        id: `${uid}_scale_${i}_${s}`,
        e: FOOD_E[food],
        c: pal,
        cap: fill(pick(rng, STORY_CAPS), { area, food }),
        sid,
        when: `${1 + Math.floor(rng() * 48)}h`
      });
    }
    groups.push({ uid, slides: slideArr });
  }
  return groups;
}

function buildReels(stallIds: string[], userIds: string[]): Reel[] {
  const reels: Reel[] = [];
  for (let i = 0; i < 60; i++) {
    const rng = mulberry32(4000 + i);
    const area = pick(rng, AREA_NAMES);
    const food = pick(rng, FOODS);
    const u = pick(rng, userIds);
    const sid = pick(rng, stallIds);
    const pal = pick(rng, PALETTES);
    const cmCount = Math.floor(rng() * 3);
    const cm = [];
    for (let c = 0; c < cmCount; c++) {
      cm.push({ u: pick(rng, userIds), t: pick(rng, REVIEW_SNIPS), likes: Math.floor(rng() * 30), when: `${c + 1}h` });
    }
    reels.push({
      id: 'r' + (100 + i),
      u, sid,
      cap: fill(pick(rng, REEL_CAPS), { area, food }),
      music: rng() > 0.5 ? 'Original audio · Jaipur' : 'Trending · Pink City',
      e: FOOD_E[food], c: pal,
      likes: Math.floor(200 + rng() * 8000),
      dislikes: Math.floor(rng() * 40),
      saves: Math.floor(rng() * 1200),
      when: `${1 + Math.floor(rng() * 14)}d`,
      dur: `0:${10 + Math.floor(rng() * 35)}`,
      cm
    });
  }
  return reels;
}

const SCALE_USERS = buildUsers();
const SCALE_USER_IDS = Object.keys(SCALE_USERS);
const LEGACY_UIDS = [
  'meera', 'kunal', 'sneha', 'arjun', 'nisha', 'farhan', 'tanya', 'rohan', 'aditi', 'dev', 'riya', 'vikram',
  'zoya', 'ishaan', 'faiz', 'priya', 'sonal', 'aarav'
];
const ALL_UIDS = [...LEGACY_UIDS, ...SCALE_USER_IDS];

const SCALE_STALLS = buildStalls(ALL_UIDS);
export const JAIPUR_SCALE_STALLS: Stall[] = SCALE_STALLS;

const ALL_STALL_IDS = [
  ...Array.from({ length: 30 }, (_, i) => 's' + (i + 1)),
  ...Array.from({ length: 10 }, (_, i) => 's' + (31 + i)),
  ...SCALE_STALLS.map(s => s.id)
];

export const JAIPUR_SCALE_USERS: Record<string, User> = SCALE_USERS;
export const JAIPUR_SCALE_THREADS: Thread[] = buildThreads(ALL_STALL_IDS, ALL_UIDS);
export const JAIPUR_SCALE_STORIES: StoryGroup[] = buildStories(ALL_STALL_IDS, ALL_UIDS);
export const JAIPUR_SCALE_REELS: Reel[] = buildReels(ALL_STALL_IDS, ALL_UIDS);

/** For UI copy / stats */
export const JAIPUR_SCALE_STATS = {
  stalls: ALL_STALL_IDS.length,
  users: ALL_UIDS.length,
  threads: JAIPUR_SCALE_THREADS.length,
  stories: JAIPUR_SCALE_STORIES.length,
  reels: JAIPUR_SCALE_REELS.length
};
