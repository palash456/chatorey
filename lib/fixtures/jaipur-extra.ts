import type { Stall, Thread, StoryGroup, Reel, User } from '../types';

const I = (n: string, p: number, o: Partial<import('../types').Item> = {}) => ({
  n, p, v: true, d: '', st: 'ok' as const, ...o
});
const R = (who: string, lvl: string, text: string, food: string, likes: number, when: string, e: string) => ({
  who, lvl, text, food, likes, when, e
});
const img = (name: string) => `/images/covers/${name}.jpg`;

/** More Jaipur-only stalls: bazaar lanes, cafés, and market corners (merged into STALLS in data.ts). */
export const JAIPUR_EXTRA_STALLS: Stall[] = [
  {
    id: 's31', name: 'C-Scheme Tapri & Toast House', area: 'C-Scheme', foods: ['chai', 'sandwich'], e: '☕',
    c: ['#6D4C41', '#BCAAA4'], tags: ['Cafe', 'Locals’ pick'], rating: 4.5, n: 228, pct: 92,
    hours: '7 am – 11 pm', open: true, prep: 7, orderable: true,
    photos: [img('cover-s29'), '/images/bonus/cafe-premium-01.jpg'],
    tip: 'Masala chai with a cheese toastie. Office crowd lines up at 5 pm — order ahead on Chatorey.',
    extra: ['Wi‑Fi', 'Parcel friendly'],
    items: [
      I('Masala chai', 25, { d: 'Ginger, elaichi, slow boiled', pop: true, e: '☕' }),
      I('Cheese chilli toast', 90, { d: 'Grilled, green chutney inside', e: '🥪' }),
      I('Veg club sandwich', 110, { d: 'Triple decker, mint chutney', e: '🥪' }),
      I('Cold coffee', 70, { d: 'Blended, not too sweet', e: '🥤' })
    ],
    reviews: [
      R('Tanya', 'Foodie Lv 2', 'Best chai-break spot near Ashok Marg. Toast is crisp.', 'Cheese toast', 34, '3 days ago', '☕'),
      R('Dev', 'Local Guide Lv 3', 'They pack chai separately for delivery. Still hot.', 'Masala chai', 21, '1 week ago', '☕')
    ]
  },
  {
    id: 's32', name: 'Pink City Coffee — MI Road', area: 'MI Road', foods: ['coffee', 'sandwich'], e: '☕',
    c: ['#4E342E', '#D7CCC8'], tags: ['Cafe', 'Trending'], rating: 4.6, n: 312, pct: 94,
    hours: '8 am – 10 pm', open: true, prep: 8, orderable: true, freeDeliveryPromo: true,
    photos: [img('cover-s29'), '/images/bonus/cafe-premium-02.jpg'],
    tip: 'Filter coffee over ice in summer. Ask for jaggery instead of sugar if you like it earthy.',
    extra: ['AC seating', 'UPI'],
    items: [
      I('Jaipur filter coffee', 80, { d: 'South Indian decoction, hot or iced', pop: true, e: '☕' }),
      I('Cappuccino', 120, { d: 'Double shot, microfoam', e: '☕' }),
      I('Banana walnut loaf', 90, { d: 'Warm slice, in-house bake', e: '🍞' }),
      I('Grilled paneer sandwich', 130, { d: 'Smoky tandoori paneer', e: '🥪' })
    ],
    reviews: [
      R('Riya', 'Foodie Lv 2', 'Finally a serious coffee spot on MI Road. Iced filter is perfect.', 'Filter coffee', 44, 'yesterday', '☕'),
      R('Arjun', 'Foodie Lv 2', 'Sandwich portion is big. Good for a late lunch.', 'Paneer sandwich', 18, '4 days ago', '🥪')
    ]
  },
  {
    id: 's33', name: 'Amer Fort View Café', area: 'Amer Road', foods: ['chai', 'lassi'], e: '🏰',
    c: ['#FF7043', '#5D4037'], tags: ['Cafe', 'Hidden gem'], rating: 4.4, n: 89, pct: 91,
    hours: '9 am – 7 pm', open: true, prep: 6, orderable: true,
    photos: [img('cover-s16'), '/images/bonus/cafe-premium-03.jpg'],
    tip: 'Stop here after Amer — kesar chai on the terrace. Kulfi lassi if they have it.',
    items: [
      I('Kesar chai', 40, { d: 'Saffron and cardamom', pop: true, e: '☕' }),
      I('Masala maggi', 60, { d: 'Tourist-friendly but actually good', e: '🍜' }),
      I('Kulfi lassi', 90, { d: 'Thick, malai on top', e: '🥛' }),
      I('Pyaaz kachori (2 pcs)', 50, { d: 'From their tie-up with a nearby halwai', e: '🧆' })
    ],
    reviews: [
      R('Zoya', 'Foodie Lv 3', 'View beats any five-star lobby. Chai is honest.', 'Kesar chai', 27, '5 days ago', '☕')
    ]
  },
  {
    id: 's34', name: 'Johari Bazaar Silver Lane Falooda', area: 'Johari Bazaar', foods: ['sweets', 'lassi'], e: '🥛',
    c: ['#EC407A', '#F48FB1'], tags: ['Cafe'], rating: 4.5, n: 156, pct: 93,
    hours: '11 am – 9 pm', open: true, prep: 5, orderable: true,
    photos: [img('cover-s2'), '/images/bonus/cafe-premium-04.jpg'],
    tip: 'Rabri falooda after jewellery shopping. Rose syrup is strong — ask for “half sweet”.',
    items: [
      I('Rabri falooda', 110, { d: 'Rose, sabja, vermicelli', pop: true, e: '🥛' }),
      I('Kesar thandai', 70, { d: 'Chilled, festival style', e: '🥤' }),
      I('Malai ghewar slice', 85, { d: 'Partner halwai, same-day', e: '🥞' })
    ],
    reviews: [
      R('Sneha', 'Local Guide Lv 5', 'My post-wedding shopping ritual. Falooda is huge.', 'Rabri falooda', 52, '2 days ago', '🥛')
    ]
  },
  {
    id: 's35', name: 'Bapu Bazaar Rooftop Chai Café', area: 'Bapu Bazaar', foods: ['chai'], e: '☕',
    c: ['#795548', '#FFB74D'], tags: ['Cafe', 'New'], rating: 4.3, n: 67, pct: 90,
    hours: '4 pm – 10 pm', open: true, prep: 5, orderable: true,
    photos: [img('cover-s6'), '/images/bonus/cafe-premium-05.jpg'],
    tip: 'Rooftop above the fabric shops. Kulhad chai and sunset over the pink facades.',
    items: [
      I('Kulhad adrak chai', 30, { d: 'Strong, two boils', pop: true, e: '☕' }),
      I('Masala bun maska', 45, { d: 'Soft bun, Amul butter', e: '🍞' }),
      I('Samosa (2 pcs)', 30, { d: 'From the stall downstairs', e: '🥔' })
    ],
    reviews: [
      R('Priya', 'Foodie Lv 2', 'Hidden lift at the blue door. Worth the climb.', 'Kulhad chai', 19, '1 week ago', '☕')
    ]
  },
  {
    id: 's36', name: 'Tripolia Bazaar Laal Maas Roll Cart', area: 'Tripolia Bazaar', foods: ['rolls'], e: '🌯',
    c: ['#C62828', '#FF8A65'], tags: ['Locals’ pick'], rating: 4.5, n: 134, pct: 92,
    hours: '12 pm – 10 pm', open: true, prep: 9, orderable: true,
    photos: [img('cover-s7'), '/images/bonus/stall-cover-02.jpg'],
    tip: 'Laal maas roll is spicy Rajasthani — get the mirchi chutney on the side, not inside, first time.',
    items: [
      I('Laal maas kathi roll', 120, { v: false, d: 'Mutton, smoky gravy', pop: true, e: '🌯' }),
      I('Paneer tikka roll', 90, { d: 'Tandoori paneer, onion', e: '🌯' }),
      I('Egg double roll', 70, { v: false, d: 'Double omelette', e: '🌯' })
    ],
    reviews: [
      R('Vikram', 'Foodie Lv 3', 'Proper heat. Not for kids.', 'Laal maas roll', 38, '6 days ago', '🌯')
    ]
  },
  {
    id: 's37', name: 'Masala Chowk Ghewar & Chaat Row', area: 'Ram Niwas Bagh', foods: ['ghewar', 'chaat'], e: '🥣',
    c: ['#F9A825', '#43A047'], tags: ['Trending'], rating: 4.6, n: 402, pct: 93,
    hours: '10 am – 10 pm', open: true, prep: 8, orderable: true,
    photos: [img('cover-s4'), '/images/bonus/food-premium-05.jpg'],
    tip: 'Official Masala Chowk counters — try ghewar and raj kachori in one trip. Evenings are packed.',
    items: [
      I('Raj kachori (Masala Chowk)', 75, { d: 'Curd, three chutneys', pop: true, e: '🥣' }),
      I('Malai ghewar', 95, { d: 'Same-day fresh', e: '🥞' }),
      I('Dahi bhalla', 55, { d: 'Soft, cold', e: '🥣' })
    ],
    reviews: [
      R('Aditi', 'Local Guide Lv 3', 'Touristy but the quality actually holds up.', 'Raj kachori', 61, 'yesterday', '🥣')
    ]
  },
  {
    id: 's38', name: 'Chandpole Bangle Market Kulfi', area: 'Chandpole', foods: ['kulfi', 'sweets'], e: '🍨',
    c: ['#7B1FA2', '#CE93D8'], tags: ['Hidden gem'], rating: 4.7, n: 98, pct: 96,
    hours: '3 pm – 11 pm', open: true, prep: 4, orderable: true, addedBy: 'Nisha',
    photos: [img('cover-s13'), '/images/bonus/stall-cover-06.jpg'],
    tip: 'Walk the bangle lane, end with matka kulfi. Pistachio rabri topping is ₹15 extra and worth it.',
    items: [
      I('Matka kulfi', 55, { d: 'Cardamom milk', pop: true, e: '🍨' }),
      I('Kesar pista stick', 45, { d: 'Dense, cold', e: '🍦' }),
      I('Garam jalebi (150 g)', 40, { d: 'Evening batch', e: '🍯' })
    ],
    reviews: [
      R('Nisha', 'Local Guide Lv 3', 'Added this after the lane festival. Still my favourite kulfi stop.', 'Matka kulfi', 29, '4 days ago', '🍨')
    ]
  },
  {
    id: 's39', name: 'Sindhi Camp Bedai & Aloo Sabzi', area: 'Sindhi Camp', foods: ['kachori'], e: '🥙',
    c: ['#FF6F00', '#FFE082'], tags: ['Locals’ pick'], rating: 4.6, n: 267, pct: 95,
    hours: '6 am – 11 am', open: true, prep: 6, orderable: true,
    photos: [img('cover-s1'), '/images/bonus/food-premium-01.jpg'],
    tip: 'Bedai (urad dal puri) with aloo — different from kachori. Morning only, like Ramganj.',
    items: [
      I('Bedai + aloo sabzi', 45, { d: 'Two puris, pickle', pop: true, e: '🥙' }),
      I('Jalebi (100 g)', 25, { d: 'Hot', e: '🍯' }),
      I('Extra bedai (1 pc)', 12, { d: 'Crisp urad dal', e: '🥙' })
    ],
    reviews: [
      R('Meera', 'Local Guide Lv 4', 'Sindhi Camp breakfast trail: kachori first, bedai here.', 'Bedai plate', 47, '3 days ago', '🥙')
    ]
  },
  {
    id: 's40', name: 'Raja Park Jaipur Thali Corner', area: 'Raja Park', foods: ['dal baati'], e: '🍛',
    c: ['#E65100', '#FFCC80'], tags: [], rating: 4.4, n: 189, pct: 89,
    hours: '12 pm – 3 pm · 7 pm – 10 pm', open: true, prep: 14, orderable: true,
    photos: [img('cover-s9'), '/images/bonus/food-premium-04.jpg'],
    tip: 'Mini Rajasthani thali with baati, gatte, ker sangri on Sundays. Call if you want ker sangri.',
    items: [
      I('Dal baati churma thali', 140, { d: 'Baati, dal, churma, papad', pop: true, e: '🍛' }),
      I('Gatte ki sabzi + roti', 90, { d: 'Gram flour dumplings', e: '🍛' }),
      I('Ker sangri (seasonal)', 110, { d: 'Desert beans, mustard oil', st: 'low', e: '🥣' })
    ],
    reviews: [
      R('Faiz', 'Local Guide Lv 2', 'Homestyle, not restaurant oily.', 'Thali', 22, '1 week ago', '🍛')
    ]
  }
];

let CID = 200;
const Cm = (u: string, t: string, likes: number, age: number, replies: [string, string, number, number][] = []) => ({
  id: 'c' + (CID++), u, t, likes, age,
  replies: replies.map(r => ({ id: 'c' + (CID++), u: r[0], t: r[1], likes: r[2], age: r[3], replies: [] }))
});

export const JAIPUR_EXTRA_THREADS: Thread[] = [
  {
    id: 't11', uid: 'riya', cat: 'Recommendations', title: 'Best café for work near C-Scheme under ₹150?',
    body: 'Need quiet-ish, good chai or coffee, and reliable Wi‑Fi. Bonus if they deliver to Ashok Marg offices.',
    age: 180, up: 54, down: 0, sid: 's32', img: '/images/bonus/cafe-premium-02.jpg',
    comments: [
      Cm('tanya', 'Pink City Coffee filter over ice. Sandwich is filling.', 19, 120),
      Cm('dev', 'Tapri & Toast is cheaper. Toast holds up in parcel.', 11, 90)
    ]
  },
  {
    id: 't12', uid: 'aditi', cat: 'Meetups', live: true,
    event: { title: 'Masala Chowk evening chaat crawl', when: 'Fri, 6:30 pm', where: 'Ram Niwas Bagh gate, Jaipur', going: 22, cap: 30 },
    title: 'Friday Masala Chowk chaat crawl', body: 'We’ll split raj kachori, dahi bhalla, and end with ghewar. ₹300 budget per head. RSVP so we know plates.',
    age: 60, up: 76, down: 0, sid: 's37', img: '/images/bonus/cafe-premium-05.jpg',
    comments: [Cm('rohan', 'First time — is it very crowded?', 3, 40, [['aditi', 'Yes on Friday. We meet at gate and walk in together.', 2, 30]])]
  },
  {
    id: 't13', uid: 'vikram', cat: 'Hidden gems', title: 'Bangle market kulfi lane in Chandpole',
    body: 'Nisha added it on Chatorey — matka kulfi after shopping. Pistachio rabri on top is the move.',
    age: 900, up: 88, down: 1, sid: 's38', img: '/images/bonus/stall-cover-06.jpg',
    comments: [Cm('nisha', 'That’s the one! Go before 10 pm.', 14, 800), Cm('meera', 'Jalebi there is underrated.', 9, 700)]
  },
  {
    id: 't14', uid: 'bablu', cat: 'Vendors', title: 'Taking phone orders for morning bedai — tips?',
    body: 'Sindhi Camp bedai sells out by 10. Thinking of a simple “call and hold” list. What do customers expect?',
    age: 2000, up: 41, down: 2, sid: 's39',
    comments: [
      Cm('gopal', 'Give a 15-minute window. Don’t promise exact minute.', 17, 1900),
      Cm('kunal', 'I’d pay ₹10 extra for a held plate. Just keep it hot.', 8, 1800)
    ]
  },
  {
    id: 't15', uid: 'sneha', cat: 'Questions', title: 'Amer fort day trip — where to eat nearby?',
    body: 'Tourist family visiting. Want chai, something light, not a big hotel bill.',
    age: 400, up: 33, down: 0, sid: 's33',
    comments: [
      Cm('riya', 'Amer Fort View Café terrace. Kesar chai + maggi works.', 12, 350),
      Cm('zoya', 'Then kulfi on Amer Road cart s16 if you’re driving back.', 6, 300)
    ]
  },
  {
    id: 't16', uid: 'farhan', cat: 'Recommendations', pinned: false,
    title: 'Laal maas roll at Tripolia — how spicy is it?',
    body: 'Love spice but my cousin is visiting. Is there a mild option?',
    age: 120, up: 28, down: 0, sid: 's36',
    poll: { q: 'Your heat level', opts: [['Mild paneer roll', 18], ['Laal maas full spice', 42], ['Mirchi on the side only', 31]] },
    comments: [Cm('vikram', 'Ask for chutney separate. Roll itself is 7/10.', 7, 100)]
  }
];

export const JAIPUR_EXTRA_STORIES: StoryGroup[] = [
  {
    uid: 'tanya', slides: [
      { id: 'tanya0', e: '☕', c: ['#4E342E', '#D7CCC8'], cap: 'Filter coffee break on MI Road before meetings.', sid: 's32', when: '1h' },
      { id: 'tanya1', e: '🥪', c: ['#6D4C41', '#BCAAA4'], cap: 'Cheese toast at C-Scheme Tapri. ₹90 well spent.', sid: 's31', when: '1h' }
    ]
  },
  {
    uid: 'zoya', slides: [
      { id: 'zoya0', e: '🏰', c: ['#FF7043', '#5D4037'], cap: 'Kesar chai with Amer in the background.', sid: 's33', when: '3h' }
    ]
  },
  {
    uid: 'priya', slides: [
      { id: 'priya0', e: '☕', c: ['#795548', '#FFB74D'], cap: 'Rooftop chai over Bapu Bazaar at sunset.', sid: 's35', when: '6h' }
    ]
  },
  {
    uid: 'faiz', slides: [
      { id: 'faiz0', e: '🍛', c: ['#E65100', '#FFCC80'], cap: 'Sunday thali at Raja Park — ker sangri day.', sid: 's40', when: '1d' }
    ]
  }
];

const RC = (u: string, t: string, likes: number, when: string) => ({ u, t, likes, when });

export const JAIPUR_EXTRA_REELS: Reel[] = [
  { id: 'r11', u: 'riya', sid: 's32', cap: 'POV: first sip of Jaipur filter coffee ☕', music: 'Lo-fi Jaipur', e: '☕', c: ['#4E342E', '#D7CCC8'], likes: 1840, dislikes: 11, saves: 420, when: '1h', dur: '0:11', cm: [RC('kunal', 'Need this every morning', 6, '1h')] },
  { id: 'r12', u: 'tanya', sid: 's31', cap: 'Cheese chilli toast crunch test', music: 'Original audio · Tanya', e: '🥪', c: ['#6D4C41', '#BCAAA4'], likes: 920, dislikes: 8, saves: 160, when: '3h', dur: '0:09', cm: [] },
  { id: 'r13', u: 'zoya', sid: 's33', cap: 'Amer fort view + kesar chai = Jaipur therapy', music: 'Morning raga', e: '☕', c: ['#FF7043', '#5D4037'], likes: 2100, dislikes: 15, saves: 890, when: '5h', dur: '0:19', cm: [RC('aditi', 'Adding to my itinerary', 12, '4h')] },
  { id: 'r14', u: 'vikram', sid: 's36', cap: 'Laal maas roll — Rajasthan on a rumali', music: 'Folk mix', e: '🌯', c: ['#C62828', '#FF8A65'], likes: 1340, dislikes: 22, saves: 280, when: '8h', dur: '0:16', cm: [RC('farhan', 'Spicy!!!', 4, '7h')] },
  { id: 'r15', u: 'sneha', sid: 's37', cap: 'Masala Chowk raj kachori in 60 seconds', music: 'Original audio · Sneha', e: '🥣', c: ['#F9A825', '#43A047'], likes: 3200, dislikes: 28, saves: 1100, when: '12h', dur: '0:28', cm: [RC('meera', 'The curd layer 😍', 40, '11h')] }
];

export const JAIPUR_EXTRA_USERS: Record<string, User> = {
  rahul: { n: 'Rahul', lv: 2, bd: 'Foodie', c: '#1565C0', pts: 340, photo: '/images/avatars/avatar-rohan.jpg' }
};
