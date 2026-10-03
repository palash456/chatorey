import type { Stall, Partner, Rider, User, Thread, StoryGroup, Reel, Addr, Item, Review, Comment } from './types';
import {
  JAIPUR_EXTRA_STALLS, JAIPUR_EXTRA_THREADS, JAIPUR_EXTRA_STORIES, JAIPUR_EXTRA_REELS, JAIPUR_EXTRA_USERS
} from './fixtures/jaipur-extra';
import {
  JAIPUR_SCALE_STALLS, JAIPUR_SCALE_USERS, JAIPUR_SCALE_THREADS, JAIPUR_SCALE_STORIES, JAIPUR_SCALE_REELS
} from './fixtures/jaipur-scale';

export const AREAS: Record<string, [number, number]> = {
  'Johari Bazaar': [0, 0], 'Bapu Bazaar': [.4, -.7], 'Tripolia Bazaar': [-.6, .5], 'Chandpole': [-.9, 1.1],
  'Ajmeri Gate': [1.1, -1.2], 'Sindhi Camp': [-2.3, -.8], 'MI Road': [.2, -2.1], 'Ram Niwas Bagh': [.3, -1.6],
  'Chameliwala Market': [.5, -1.4], 'Raja Park': [3.3, -2.6], 'C-Scheme': [2.4, -3.2], 'Bani Park': [-2.6, 1.6],
  'Vaishali Nagar': [-5.4, -2.2], 'Malviya Nagar': [.6, -6.8], 'Mansarovar': [-5.5, -6.5], 'Jawahar Circle': [.8, -5.6],
  'Gopalpura': [3.5, -7.6], 'Sanganer': [4.5, -11], 'Amer Road': [3.5, 4.2], 'Nahargarh Road': [-.9, 3],
  'Civil Lines': [-3.2, -2.2], 'Tonk Road': [2.2, -6.5], 'Sodala': [-3.7, -3.4]
};

export const FOODS: [string, string, string][] = [
  ['kachori', 'kachori', '#FFE9C7'], ['chaat', 'chaat', '#E2F4E6'], ['golgappe', 'golgappe', '#DDF1F7'], ['chai', 'chai', '#F3E5DA'],
  ['lassi', 'lassi', '#FBE3EC'], ['ghewar', 'ghewar', '#FFF0BF'], ['jalebi', 'jalebi', '#FFE2C2'], ['samosa', 'samosa', '#F6E7C8'],
  ['momos', 'momos', '#E9E5FA'], ['dal baati', 'dal baati', '#FFE7D0'], ['mirchi bada', 'mirchi bada', '#E3F2DA'], ['kulfi', 'kulfi', '#E6ECFB'],
  ['pav bhaji', 'pav bhaji', '#FFE3D6'], ['chole kulche', 'chole kulche', '#F6E7C8'], ['rolls', 'rolls', '#E9E5FA'], ['sweets', 'sweets', '#FBE3EC']
];
export const EXTRA_CATS: [string, string][] = [['sweets', 'sweets'], ['rolls', 'rolls'], ['sandwich', 'sandwich'], ['other', 'other']];

export const PARTNERS: Partner[] = [
  { id: 'rapido', name: 'Rapido Parcel', soon: false, quote: d => ({ fee: Math.round(24 + 6 * d), eta: 12 + Math.round(d * 4) }) },
  { id: 'porter', name: 'Porter', soon: true, quote: () => ({ fee: 0, eta: 0 }) },
  { id: 'shadowfax', name: 'Shadowfax', soon: true, quote: () => ({ fee: 0, eta: 0 }) }
];
export const RIDERS: Rider[] = [
  { n: 'Sandeep K.', r: 4.9, v: 'RJ14 · Bike' }, { n: 'Imran S.', r: 4.8, v: 'RJ14 · Bike' }, { n: 'Deepak M.', r: 4.9, v: 'RJ14 · Scooter' },
  { n: 'Pankaj R.', r: 4.7, v: 'RJ14 · Bike' }, { n: 'Salim A.', r: 4.8, v: 'RJ14 · Bike' }, { n: 'Naresh P.', r: 4.6, v: 'RJ14 · Scooter' }
];

const I = (n: string, p: number, o: Partial<Item> = {}): Item => ({ n, p, v: true, d: '', st: 'ok', ...o });
const R = (who: string, lvl: string, text: string, food: string, likes: number, when: string, e: string): Review => ({ who, lvl, text, food, likes, when, e });

const img = (name: string) => `/images/covers/${name}.jpg`;
const cat = (name: string) => `/images/categories/${name}.jpg`;

const STALLS_BASE: Stall[] = [
{id:'s1',name:'Sindhi Camp Kachori Corner',area:'Sindhi Camp',foods:['kachori','mirchi bada'],e:'🧆',c:['#E8A317','#C2560B'],tags:['Locals’ pick'],rating:4.8,n:412,pct:96,hours:'6 am – 1 pm',open:true,prep:8,orderable:true,phone:'+91 98290 12345',photos:[img('cover-s1'),'/images/bonus/stall-cover-01.jpg'],
 tip:'Come before 9 am, or ask for the second batch. It comes out even crisper.',
 items:[I('Pyaaz kachori',25,{d:'Jaipur’s classic: onion and spice filling, served with sabzi',pop:true,e:'🧆'}),I('Mawa kachori',55,{d:'Sweet, mawa-stuffed, dipped in sugar syrup',st:'low',e:'🍯'}),I('Mirchi vada',20,{d:'Fat green chilli in a besan coat',e:'🌶️'}),I('Kachori + sabzi plate (2 pcs)',50,{d:'Two kachori, aloo sabzi, green chutney',e:'🍛'})],
 reviews:[R('Meera','Local Guide Lv 4','I’ve tried five “famous” kachori places. This one wins on crunch. The chutney is what makes it.','Pyaaz kachori',88,'2 days ago','🧆'),R('Kunal','Foodie Lv 2','Line moves fast. Mawa kachori is gone by 10 am.','Mawa kachori',41,'1 week ago','🍯'),R('Priya','Foodie Lv 2','Sabzi is a bit oily but the kachori is a 10.','Pyaaz kachori',19,'3 weeks ago','🧆'),R('Sonal','Foodie Lv 3','Been coming for 6 years. Same taste.','Pyaaz kachori',44,'1 month ago','🧆')]},
{id:'s2',name:'Johari Bazaar Ghewar House',area:'Johari Bazaar',foods:['ghewar','jalebi'],e:'🥞',c:['#F4B942','#D97A1C'],tags:['Trending'],rating:4.7,n:301,pct:95,hours:'8 am – 9 pm',open:true,prep:6,orderable:true,photos:[img('cover-s2')],
 tip:'Malai ghewar is the one. Eat it the same day, since it loses its crunch overnight.',
 items:[I('Plain ghewar (1 pc)',60,{d:'Honeycomb disc, sugar-syrup soaked',e:'🥞'}),I('Malai ghewar',90,{d:'Topped with fresh malai and pistachio',pop:true,e:'🥞',img:'/images/bonus/food-premium-01.jpg'}),I('Rabri ghewar',110,{d:'Thick rabri, warm base',st:'low',e:'🥞'}),I('Garam jalebi (200 g)',50,{d:'Straight from the kadhai',e:'🍯'}),I('Feeni with milk',50,{d:'Fine vermicelli sweet, served in warm milk',e:'🥛'})],
 reviews:[R('Sneha','Local Guide Lv 5','Bought ghewar for family from here every festival. Consistent, never too sweet.','Malai ghewar',120,'4 days ago','🥞'),R('Arjun','Foodie Lv 2','Feeni with milk is underrated. Ask for it warm.','Feeni',34,'1 week ago','🥛'),R('Kunal','Foodie Lv 2','Ghewar was fresh, not stale like at some places.','Malai ghewar',30,'2 weeks ago','🥞')]},
{id:'s3',name:'Kulhad Lassi Wala',area:'MI Road',foods:['lassi'],e:'🥛',c:['#F06292','#AD1457'],tags:['Locals’ pick'],rating:4.6,n:530,pct:94,hours:'9 am – 10 pm',open:true,prep:4,orderable:true,photos:[img('cover-s3')],
 tip:'Thick, set curd in a kulhad, and it tastes best on a hot afternoon. Get the malai on top.',
 items:[I('Plain lassi (kulhad)',40,{d:'Thick curd, lightly sweet',e:'🥛',img:'/images/bonus/food-premium-02.jpg'}),I('Kesar lassi (kulhad)',60,{d:'Saffron, malai on top',pop:true,e:'🥛'}),I('Mango lassi',70,{d:'Seasonal mango pulp',e:'🥭'}),I('Chaas (glass)',20,{d:'Jeera and mint',e:'🥤'})],
 reviews:[R('Riya','Foodie Lv 2','The malai layer is unreal. Go in the afternoon heat.','Kesar lassi',31,'6 days ago','🥛'),R('Dev','Local Guide Lv 3','Kulhad makes a real difference. Not just marketing.','Plain lassi',52,'2 weeks ago','🥛'),R('Sneha','Local Guide Lv 5','Get the plain lassi if you don’t want it too sweet.','Plain lassi',24,'3 weeks ago','🥛')]},
{id:'s4',name:'Masala Chowk Chaat Counter',area:'Ram Niwas Bagh',foods:['chaat','golgappe'],e:'🥣',c:['#43A047','#F9A825'],tags:['Trending'],rating:4.5,n:268,pct:92,hours:'11 am – 10 pm',open:true,prep:7,orderable:true,photos:[img('cover-s4')],
 tip:'Raj kachori chaat is huge. Share it, and ask for extra saunth chutney.',
 items:[I('Raj kachori chaat',70,{d:'Big crisp shell, curd, chutneys, sev',pop:true,e:'🥣'}),I('Papdi chaat',50,{d:'Cold curd, warm tikki bits',e:'🥣'}),I('Dahi bhalla',50,{d:'Soft lentil dumplings in curd',e:'🥣'}),I('Aloo tikki (2 pcs)',40,{d:'Griddle-crisp',e:'🥔'})],
 reviews:[R('Aditi','Local Guide Lv 3','Best after a walk in the Bagh. Crowded on weekends, but worth it.','Raj kachori',63,'yesterday','🥣'),R('Rohan','Newbie','Portions are big. Chutney is properly tangy.','Papdi chaat',12,'3 days ago','🥣'),R('Arjun','Foodie Lv 2','Crowded at 1 pm, go earlier.','Papdi chaat',13,'2 weeks ago','🥣')]},
{id:'s5',name:'Chandpole Golgappe Wale',area:'Chandpole',foods:['golgappe','chaat'],e:'🫧',c:['#26A69A','#00695C'],tags:['Hidden gem'],rating:4.7,n:64,pct:98,hours:'3 pm – 9 pm',open:true,prep:5,orderable:true,addedBy:'Nisha',photos:[img('cover-s5')],
 tip:'Two waters: pudina and a sweet-tangy one. Ask him to keep the puris warm.',
 items:[I('Golgappe (6 pcs)',20,{d:'Pudina paani, spiced aloo filling',pop:true,e:'🫧'}),I('Dahi golgappa (6 pcs)',40,{d:'Filled with curd and sweet chutney',e:'🫧'}),I('Sev puri',30,{d:'Crisp puris, chutney, sev',e:'🥣'}),I('Extra paani',5,{d:'Because you’ll want it',e:'🥤'})],
 reviews:[R('Nisha','Local Guide Lv 3','Nobody talks about this stall and I’m annoyed at how good it is. The pudina water is sharp.','Golgappe',47,'5 days ago','🫧'),R('Farhan','Foodie Lv 1','He remembers your spice level after two visits.','Golgappe',22,'2 weeks ago','🫧'),R('Dev','Local Guide Lv 3','Pudina water is the best I have had.','Golgappe',19,'3 weeks ago','🫧')]},
{id:'s6',name:'Bapu Bazaar Chai Tapri',area:'Bapu Bazaar',foods:['chai'],e:'☕',c:['#8D6E63','#4E342E'],tags:[],rating:4.4,n:190,pct:91,hours:'6 am – 10 pm',open:true,prep:4,orderable:true,photos:[img('cover-s6')],
 tip:'Kulhad chai and a bun maska. It’s the best 45 rupees you’ll spend in the bazaar.',
 items:[I('Kulhad chai',15,{d:'Ginger and elaichi, boiled slow',pop:true,e:'☕'}),I('Adrak chai',12,{d:'Strong, small cup',e:'☕'}),I('Bun maska',30,{d:'Soft bun with a lot of butter',e:'🍞'}),I('Mathri (2 pcs)',10,{d:'Crisp, peppery',e:'🥨'})],
 reviews:[R('Tanya','Foodie Lv 2','Good for a tea break between shops. He makes it fresh each time.','Kulhad chai',29,'1 week ago','☕')]},
{id:'s7',name:'Tripolia Mirchi Bada Wale',area:'Tripolia Bazaar',foods:['mirchi bada','kachori'],e:'🌶️',c:['#7CB342','#33691E'],tags:['Hidden gem'],rating:4.6,n:41,pct:97,hours:'4 pm – 9 pm',open:true,prep:6,orderable:true,addedBy:'Faiz',photos:[img('cover-s7')],
 tip:'Mirchi bada with pudina chutney. Get two, because one is never enough.',
 items:[I('Mirchi bada',15,{d:'Stuffed chilli, besan coat, fried fresh',pop:true,e:'🌶️'}),I('Mirchi bada + chaat',35,{d:'Crushed over onion-tomato mix',e:'🌶️'}),I('Moong dal pakodi',30,{d:'Light and crisp',e:'🥣'}),I('Aloo bonda (2 pcs)',20,{d:'Spiced potato balls',e:'🥔'})],
 reviews:[R('Faiz','Local Guide Lv 2','Added this one myself. The chilli is mild enough for everyone, and it’s crisp.','Mirchi bada',35,'2 weeks ago','🌶️')]},
{id:'s8',name:'Raja Park Momo Cart',area:'Raja Park',foods:['momos'],e:'🥟',c:['#EF5350','#B71C1C'],tags:['Trending'],rating:4.5,n:210,pct:90,hours:'4 pm – 11 pm',open:true,prep:10,orderable:true,photos:[img('cover-s8'),'/images/bonus/stall-cover-03.jpg'],
 tip:'Kurkure momos with the red chutney. It’s spicy, so ask for “thoda kam” if unsure.',
 items:[I('Steamed veg momos (8)',60,{d:'Cabbage, carrot, black pepper',e:'🥟'}),I('Kurkure momos (6)',90,{d:'Crumb-fried, extra crunchy',pop:true,e:'🥟',img:'/images/bonus/food-premium-03.jpg'}),I('Paneer tandoori momos (6)',110,{d:'Charred, smoky',st:'low',e:'🥟'}),I('Chicken steamed momos (8)',80,{v:false,d:'Juicy, ginger-heavy',e:'🥟'})],
 reviews:[R('Aditi','Local Guide Lv 3','Cart looks tiny but the momos are hand-folded and you can taste it.','Kurkure momos',63,'yesterday','🥟'),R('Rohan','Newbie','Chutney is 10/10. Momos are good, not life-changing.','Steamed momos',12,'3 days ago','🌶️'),R('Ishaan','Newbie','Kurkure is worth it.','Kurkure momos',9,'2 weeks ago','🥟')]},
{id:'s9',name:'Malviya Nagar Dal Baati Thela',area:'Malviya Nagar',foods:['dal baati'],e:'🍛',c:['#FB8C00','#E65100'],tags:['Locals’ pick'],rating:4.6,n:145,pct:93,hours:'12 pm – 10 pm',open:true,prep:12,orderable:true,photos:[img('cover-s9')],
 tip:'Baatis are cooked in the angeethi, so it’s smoky and dripping with ghee. Get the extra lehsun chutney.',
 items:[I('Dal baati churma plate',110,{d:'2 baati, panchmel dal, churma, chutney',pop:true,e:'🍛',img:'/images/bonus/food-premium-04.jpg'}),I('Baati (1 pc)',15,{d:'Charcoal baked, dipped in ghee',e:'🥯'}),I('Extra churma',40,{d:'Sweet, crumbly',e:'🍬'}),I('Lehsun chutney',10,{d:'Garlic, red chilli',e:'🥣'})],
 reviews:[R('Vikram','Foodie Lv 3','Ghee is generous and the dal is properly thick. A full meal for ₹110.','Dal baati churma',57,'1 week ago','🍛'),R('Meera','Local Guide Lv 4','Real baati, real ghee. Fair price.','Baati',33,'3 weeks ago','🍛')]},
{id:'s10',name:'Chameliwala Kanji Vada Point',area:'Chameliwala Market',foods:['chaat'],e:'🥣',c:['#FBC02D','#F57F17'],tags:[],rating:4.3,n:120,pct:88,hours:'11 am – 8 pm',open:true,prep:5,orderable:true,photos:[img('cover-s10')],
 tip:'Kanji vada is best on a hot day. It’s tangy, cold and mustardy.',
 items:[I('Kanji vada (6 pcs)',30,{d:'Moong dal vada in spicy mustard water',pop:true,e:'🥣'}),I('Dahi vada',40,{d:'Soft vada, cold curd, chutney',e:'🥣'}),I('Papdi chaat',40,{d:'Classic',e:'🥣'})],
 reviews:[R('Zoya','Foodie Lv 3','Kanji vada is a Rajasthani thing and this place does it right.','Kanji vada',26,'5 days ago','🥣')]},
{id:'s11',name:'Nehru Bazaar Poha Jalebi',area:'Ajmeri Gate',foods:['jalebi'],e:'🍯',c:['#FFA726','#EF6C00'],tags:['Trending'],rating:4.5,n:176,pct:92,hours:'6 am – 12 pm',open:true,prep:6,orderable:true,photos:[img('cover-s11')],
 tip:'Poha jalebi is a Jaipur breakfast. Eat them together. The sweet and sour is the whole point.',
 items:[I('Poha + jalebi',40,{d:'Kanda poha with a hot jalebi',pop:true,e:'🍯'}),I('Garam jalebi (200 g)',50,{d:'Crisp, saffron syrup',e:'🍯'}),I('Rabri jalebi',90,{d:'Thick rabri, warm jalebi',e:'🍯'})],
 reviews:[R('Dev','Foodie Lv 2','Perfect Sunday breakfast. Gets busy by 8.','Poha jalebi',18,'2 weeks ago','🍯'),R('Farhan','Foodie Lv 1','Poha jalebi. Sweet and sour, exactly like Jaipur mornings','Poha jalebi',10,'3 days ago','🍯')]},
{id:'s12',name:'Ajmeri Gate Samosa Wale',area:'Ajmeri Gate',foods:['samosa','kachori'],e:'🥔',c:['#FF8A65','#D84315'],tags:['Hidden gem'],rating:4.5,n:58,pct:94,hours:'7 am – 8 pm',open:true,prep:5,orderable:true,addedBy:'Kunal',photos:[img('cover-s12'),'/images/bonus/stall-cover-04.jpg'],
 tip:'Samosa chaat with khatti-meethi chutney. The samosa is coarse and flaky.',
 items:[I('Samosa (1 pc)',15,{d:'Coarse-mashed aloo, fennel',pop:true,e:'🥔'}),I('Samosa chaat',45,{d:'Crushed, curd, chutneys',e:'🥣'}),I('Kachori-samosa combo',30,{d:'One each, with chutney',e:'🧆'})],
 reviews:[R('Kunal','Local Guide Lv 2','Added this after a walk through Ajmeri Gate. Flaky and hot.','Samosa',35,'2 weeks ago','🥔')]},
{id:'s13',name:'Bani Park Matka Kulfi',area:'Bani Park',foods:['kulfi'],e:'🍨',c:['#7E57C2','#4527A0'],tags:['Hidden gem','New'],rating:4.7,n:33,pct:97,hours:'5 pm – 11 pm',open:true,prep:4,orderable:true,addedBy:'Meera',photos:[img('cover-s13')],
 tip:'Rabri kulfi in a matka, cold, dense, no ice crystals. Ask for pistachio on top.',
 items:[I('Matka kulfi',50,{d:'Cardamom, thick milk',pop:true,e:'🍨'}),I('Kulfi falooda',90,{d:'Kulfi with falooda and rose syrup',e:'🍨'}),I('Rabri (small cup)',40,{d:'Slow-cooked, chilled',e:'🥛'})],
 reviews:[R('Meera','Local Guide Lv 4','Found it by chance in Bani Park. The matka kulfi is dense and properly cold.','Matka kulfi',24,'5 days ago','🍨')]},
{id:'s14',name:'Vaishali Nagar Roll & Momo Point',area:'Vaishali Nagar',foods:['momos'],e:'🌯',c:['#5C6BC0','#283593'],tags:[],rating:4.2,n:97,pct:85,hours:'4 pm – 11 pm',open:false,prep:10,orderable:true,photos:[img('cover-s14')],
 tip:'Afghani momos for a group, and share them, since they’re rich.',
 items:[I('Steamed momos (8)',70,{d:'Classic',e:'🥟'}),I('Afghani momos (6)',120,{d:'Creamy, mild, herby',pop:true,e:'🥟'}),I('Paneer kathi roll',70,{d:'Rumali-style wrap',e:'🌯'})],
 reviews:[R('Ishaan','Newbie','Good for the price, and the roll is filling.','Kathi roll',9,'1 week ago','🌯')]},
{id:'s15',name:'Ramganj Bedmi Puri Corner',area:'Johari Bazaar',foods:['kachori'],e:'🥙',c:['#26C6DA','#00838F'],tags:['Hidden gem','New'],rating:4.6,n:23,pct:96,hours:'6 am – 11 am',open:true,prep:6,orderable:false,addedBy:'Faiz',photos:[img('cover-s15')],
 tip:'Morning only. Hot bedmi puri with aloo sabzi, and get there early.',
 items:[I('Bedmi puri + sabzi',40,{d:'Two puris, aloo sabzi, pickle',pop:true,e:'🥙'}),I('Jalebi (100 g)',25,{d:'Hot',e:'🍯'})],
 reviews:[R('Faiz','Local Guide Lv 2','Found this stall down a lane off Johari Bazaar. Added it so more people can.','Bedmi puri',15,'3 days ago','🥙')]},
{id:'s16',name:'Amer Road Kesar Kulfi Cart',area:'Amer Road',foods:['kulfi','sweets'],e:'🍨',c:['#8E24AA','#F06292'],tags:['Trending'],rating:4.6,n:187,pct:94,hours:'4 pm – 12 am',open:true,prep:5,orderable:true,photos:[img('cover-s16')],
 tip:'Go after a walk near Jal Mahal. Kesar pista kulfi is thick, cold and never icy.',
 items:[I('Kesar pista kulfi',60,{d:'Thick, chilled',pop:true,e:'🍨'}),I('Rabri falooda',90,{d:'Cold, layered',e:'🥛'}),I('Malai kulfi stick',40,{d:'Classic',e:'🍦'})],
 reviews:[R('Riya','Foodie Lv 2','Dense and creamy. Worth the drive.','Kesar kulfi',40,'3 days ago','🍨'),R('Zoya','Foodie Lv 3','Falooda is generous with rabri.','Rabri falooda',22,'1 week ago','🥛')]},
{id:'s17',name:'Nahargarh Road Chai & Maggi Point',area:'Nahargarh Road',foods:['chai','maggi'],e:'☕',c:['#795548','#FFB74D'],tags:['Hidden gem'],rating:4.5,n:76,pct:93,hours:'5 pm – 1 am',open:true,prep:6,orderable:true,photos:[img('cover-s17')],
 tip:'Late-night chai and masala maggi with a view of the fort lights.',
 items:[I('Kulhad chai',15,{d:'Strong, elaichi',pop:true,e:'☕'}),I('Masala maggi',40,{d:'Veg, extra masala',e:'🍜'}),I('Bread pakora',25,{d:'Hot, with green chutney',e:'🥪'}),I('Cheese maggi',55,{d:'Gooey',e:'🍜'})],
 reviews:[R('Dev','Local Guide Lv 3','Perfect after 10 pm. Cheap and hot.','Masala maggi',33,'4 days ago','🍜')]},
{id:'s18',name:'Jawahar Circle Chole Kulche Cart',area:'Jawahar Circle',foods:['chole kulche'],e:'🫓',c:['#F9A825','#E65100'],tags:['Locals’ pick'],rating:4.4,n:203,pct:90,hours:'10 am – 4 pm',open:true,prep:7,orderable:true,photos:[img('cover-s18')],
 tip:'Kulche are crisped on the tawa just before serving. Ask for extra tamarind chutney.',
 items:[I('Chole kulche',60,{d:'Two kulche, spicy chole, onions',pop:true,e:'🫓'}),I('Amritsari kulcha',80,{d:'Stuffed, butter on top',e:'🫓'}),I('Extra chole',30,{d:'Small cup',e:'🥣'})],
 reviews:[R('Vikram','Foodie Lv 3','Chole has proper tang. Lunch for ₹60.','Chole kulche',41,'6 days ago','🫓')]},
{id:'s19',name:'Mansarovar Pav Bhaji Junction',area:'Mansarovar',foods:['pav bhaji'],e:'🍞',c:['#EF5350','#FF8A65'],tags:[],rating:4.3,n:164,pct:88,hours:'5 pm – 11 pm',open:true,prep:10,orderable:true,photos:[img('cover-s19'),'/images/bonus/stall-cover-05.jpg'],
 tip:'Butter pav bhaji. Order the extra pav, since they are toasted well.',
 items:[I('Pav bhaji',90,{d:'Two pav, butter, onion',pop:true,e:'🍞'}),I('Butter pav bhaji',110,{d:'Extra butter and cheese',e:'🍞'}),I('Masala pav',50,{d:'Griddled with bhaji',e:'🍞'})],
 reviews:[R('Tanya','Foodie Lv 2','Big portions, well spiced.','Pav bhaji',19,'2 weeks ago','🍞')]},
{id:'s20',name:'Civil Lines Egg Roll Corner',area:'Civil Lines',foods:['rolls'],e:'🌯',c:['#FFB300','#6D4C41'],tags:[],rating:4.2,n:118,pct:86,hours:'6 pm – 12 am',open:true,prep:9,orderable:true,photos:[img('cover-s20')],
 tip:'Egg roll with double egg. Parathas are cooked fresh, so allow a few minutes.',
 items:[I('Egg roll',60,{d:'Double egg, onions, chutney',v:false,pop:true,e:'🌯'}),I('Chicken kathi roll',90,{d:'Smoky chicken',v:false,e:'🌯'}),I('Paneer roll',80,{d:'Tandoori paneer',e:'🌯'})],
 reviews:[R('Ishaan','Newbie','Good, filling, cheap.','Egg roll',11,'1 week ago','🌯')]},
{id:'s21',name:'Tonk Road Sabudana Vada Stall',area:'Tonk Road',foods:['snacks'],e:'🥔',c:['#8BC34A','#558B2F'],tags:['Hidden gem'],rating:4.5,n:52,pct:95,hours:'7 am – 12 pm',open:false,prep:6,orderable:true,photos:[img('cover-s21')],
 tip:'Morning only. Sabudana vada with peanut chutney sells out by 10 am.',
 items:[I('Sabudana vada',30,{d:'Crisp outside, soft inside',pop:true,e:'🥔'}),I('Aloo chaat',40,{d:'Spiced, tangy',e:'🥣'}),I('Kachori',15,{d:'Small, spicy',e:'🧆'})],
 reviews:[R('Kunal','Foodie Lv 2','Hidden in the market lane. Worth an early alarm.','Sabudana vada',20,'5 days ago','🥔')]},
{id:'s22',name:'Gopalpura Bhutta & Corn Chaat',area:'Gopalpura',foods:['chaat'],e:'🌽',c:['#FDD835','#F9A825'],tags:[],rating:4.1,n:88,pct:85,hours:'4 pm – 10 pm',open:true,prep:6,orderable:true,photos:[img('cover-s22')],
 tip:'Roasted bhutta with lemon and masala. Best in the cooler months.',
 items:[I('Roasted bhutta',30,{d:'Lemon, masala',pop:true,e:'🌽'}),I('Masala corn cup',40,{d:'Butter, chaat masala',e:'🥣'}),I('Sweet corn chaat',50,{d:'Mixed with veggies',e:'🥣'})],
 reviews:[R('Riya','Foodie Lv 2','Simple and good.','Roasted bhutta',8,'2 weeks ago','🌽')]},
{id:'s23',name:'Sodala Raj Kachori Bhandar',area:'Sodala',foods:['kachori','chaat'],e:'🥣',c:['#00897B','#80CBC4'],tags:['Locals’ pick'],rating:4.6,n:246,pct:93,hours:'11 am – 9 pm',open:true,prep:8,orderable:true,photos:[img('cover-s23')],
 tip:'Raj kachori with sweet curd. It’s big, so go with someone.',
 items:[I('Raj kachori',80,{d:'Loaded, curd, chutneys',pop:true,e:'🥣',img:'/images/bonus/food-premium-05.jpg'}),I('Dahi kachori',60,{d:'Cold and creamy',e:'🥣'}),I('Pyaaz kachori',25,{d:'Crisp, hot',e:'🧆'})],
 reviews:[R('Sneha','Local Guide Lv 5','Best raj kachori on this side of the city.','Raj kachori',66,'3 days ago','🥣')]},
{id:'s24',name:'Sanganer Khasta Kachori & Jalebi',area:'Sanganer',foods:['kachori','jalebi'],e:'🧆',c:['#FB8C00','#BF360C'],tags:['Hidden gem'],rating:4.7,n:71,pct:97,hours:'6 am – 2 pm',open:true,prep:7,orderable:true,photos:[img('cover-s24')],
 tip:'Khasta kachori is flaky and comes with hot aloo sabzi. Add a plate of jalebi.',
 items:[I('Khasta kachori',20,{d:'Flaky, moong dal filling',pop:true,e:'🧆'}),I('Dal kachori',25,{d:'Spiced dal',e:'🧆'}),I('Jalebi (200 g)',50,{d:'Hot, crisp',e:'🍯'})],
 reviews:[R('Meera','Local Guide Lv 4','Worth crossing the city for breakfast.','Khasta kachori',58,'4 days ago','🧆')]},
{id:'s25',name:'Bapu Bazaar Dahi Puri Wale',area:'Bapu Bazaar',foods:['chaat','golgappe'],e:'🫧',c:['#5C6BC0','#9FA8DA'],tags:[],rating:4.3,n:132,pct:89,hours:'3 pm – 9 pm',open:true,prep:5,orderable:true,photos:[img('cover-s25')],
 tip:'Dahi puri with sweet chutney and pomegranate.',
 items:[I('Dahi puri',40,{d:'Curd, chutney, sev',pop:true,e:'🫧'}),I('Sev puri',30,{d:'Crisp puris',e:'🥣'}),I('Pani puri',30,{d:'Six pieces',e:'🫧'})],
 reviews:[R('Aditi','Local Guide Lv 3','Clean stall, fresh puris.','Dahi puri',17,'1 week ago','🫧')]},
{id:'s26',name:'Chandpole Kesar Doodh Corner',area:'Chandpole',foods:['sweets'],e:'🥛',c:['#FFCA28','#FF7043'],tags:[],rating:4.4,n:109,pct:92,hours:'6 pm – 11 pm',open:true,prep:5,orderable:true,photos:[img('cover-s26')],
 tip:'Hot kesar doodh in winter, cold badam milk in summer.',
 items:[I('Kesar doodh',50,{d:'Saffron, cardamom',pop:true,e:'🥛'}),I('Badam milk',60,{d:'Chilled, almond',e:'🥛'}),I('Rabri (small)',40,{d:'Slow-cooked',e:'🥣'})],
 reviews:[R('Dev','Foodie Lv 2','Perfect after dinner.','Kesar doodh',14,'2 weeks ago','🥛')]},
{id:'s27',name:'Ajmeri Gate Tikki Chaat Bhandar',area:'Ajmeri Gate',foods:['chaat'],e:'🥔',c:['#EC407A','#FFA726'],tags:['Trending'],rating:4.5,n:190,pct:91,hours:'12 pm – 9 pm',open:true,prep:7,orderable:true,photos:[img('cover-s27'),'/images/bonus/stall-cover-06.jpg'],
 tip:'Aloo tikki chaat with extra curd and chole.',
 items:[I('Aloo tikki chaat',50,{d:'Curd, chutneys',pop:true,e:'🥔'}),I('Chole tikki',60,{d:'Tikki with hot chole',e:'🥔'}),I('Tikki burger',40,{d:'Bun, tikki, onion',e:'🍔'})],
 reviews:[R('Rohan','Foodie Lv 1','Tikki is really crisp.','Aloo tikki',15,'1 week ago','🥔')]},
{id:'s28',name:'Raja Park Shawarma & Rolls',area:'Raja Park',foods:['rolls'],e:'🌯',c:['#D84315','#FF8A65'],tags:[],rating:4.2,n:154,pct:87,hours:'5 pm – 1 am',open:true,prep:9,orderable:true,photos:[img('cover-s28')],
 tip:'Chicken shawarma with garlic sauce. Ask for less mayo if you prefer.',
 items:[I('Chicken shawarma',90,{d:'Garlic sauce, pickled veg',v:false,pop:true,e:'🌯'}),I('Paneer shawarma',80,{d:'Grilled paneer',e:'🌯'}),I('Falafel roll',70,{d:'Crisp falafel',e:'🌯'})],
 reviews:[R('Farhan','Foodie Lv 1','Late-night shawarma done right.','Chicken shawarma',21,'5 days ago','🌯')]},
{id:'s29',name:'MI Road Cold Coffee & Sandwich Cart',area:'MI Road',foods:['sandwich','coffee'],e:'🥪',c:['#6D4C41','#D7CCC8'],tags:[],rating:4.3,n:96,pct:89,hours:'11 am – 10 pm',open:true,prep:6,orderable:true,photos:[img('cover-s29')],
 tip:'Cold coffee with a scoop of ice cream. The grilled cheese sandwich is filling.',
 items:[I('Cold coffee',60,{d:'Blended, chilled',pop:true,e:'🥤'}),I('Grilled cheese sandwich',70,{d:'Toasted, butter',e:'🥪'}),I('Veg club sandwich',80,{d:'Three layers',e:'🥪'})],
 reviews:[R('Tanya','Foodie Lv 2','Good study break spot.','Cold coffee',10,'2 weeks ago','🥤')]},
{id:'s30',name:'Tripolia Malpua Rabri Stall',area:'Tripolia Bazaar',foods:['sweets'],e:'🥞',c:['#FFA000','#6A1B9A'],tags:['Hidden gem','New'],rating:4.6,n:29,pct:96,hours:'5 pm – 10 pm',open:true,prep:8,orderable:false,addedBy:'Nisha',photos:[img('cover-s30')],
 tip:'Malpua fried fresh and served with cold rabri.',
 items:[I('Malpua rabri',70,{d:'Two malpua, rabri',pop:true,e:'🥞',img:'/images/bonus/food-premium-06.jpg'}),I('Rabri kulhad',50,{d:'Chilled',e:'🥛'}),I('Moong dal halwa',60,{d:'Ghee-rich',e:'🍮'})],
 reviews:[R('Nisha','Local Guide Lv 3','Added it after finding it behind the temple lane.','Malpua rabri',12,'3 days ago','🥞')]}
];

function withStallPhones(stalls: Stall[]): Stall[] {
  return stalls.map((s, i) => {
    if (s.phone || !s.orderable) return s;
    const tail = String(10000 + (i * 37) % 89999).padStart(5, '0');
    return { ...s, phone: `+91 98290 ${tail.slice(0, 2)} ${tail.slice(2)}` };
  });
}

export const STALLS: Stall[] = withStallPhones([...STALLS_BASE, ...JAIPUR_EXTRA_STALLS, ...JAIPUR_SCALE_STALLS]);

export const CATEGORY_IMG: Record<string, string> = {
  kachori: cat('category-kachori'), chaat: cat('category-chaat'), golgappe: cat('category-golgappe'), chai: cat('category-chai'),
  lassi: cat('category-lassi'), ghewar: cat('category-ghewar'), jalebi: cat('category-jalebi'), samosa: cat('category-samosa'),
  momos: cat('category-momos'), 'dal baati': cat('category-dal-baati'), 'mirchi bada': cat('category-mirchi-bada'), kulfi: cat('category-kulfi'),
  'pav bhaji': cat('category-pav-bhaji'), 'chole kulche': cat('category-chole-kulche'), rolls: cat('category-rolls'), sweets: cat('category-sweets')
};

export const USERS: Record<string, User> = {
  meera:{n:'Meera',lv:4,bd:'Local Guide',c:'#D81E5B',pts:1420,photo:'/images/avatars/avatar-meera.jpg'},
  kunal:{n:'Kunal',lv:2,bd:'Foodie',c:'#1E88E5',pts:610,photo:'/images/avatars/avatar-kunal.jpg'},
  sneha:{n:'Sneha',lv:5,bd:'Local Guide',c:'#8E24AA',pts:2210,photo:'/images/avatars/avatar-sneha.jpg'},
  arjun:{n:'Arjun',lv:2,bd:'Foodie',c:'#43A047',pts:480,photo:'/images/avatars/avatar-arjun.jpg'},
  nisha:{n:'Nisha',lv:3,bd:'Local Guide',c:'#F4511E',pts:990,photo:'/images/avatars/avatar-nisha.jpg'},
  farhan:{n:'Farhan',lv:1,bd:'Foodie',c:'#00897B',pts:220,photo:'/images/avatars/avatar-farhan.jpg'},
  tanya:{n:'Tanya',lv:2,bd:'Foodie',c:'#6D4C41',pts:530,photo:'/images/avatars/avatar-tanya.jpg'},
  rohan:{n:'Rohan',lv:1,bd:'Newbie',c:'#3949AB',pts:90,photo:'/images/avatars/avatar-rohan.jpg'},
  aditi:{n:'Aditi',lv:3,bd:'Local Guide',c:'#C2185B',pts:870,photo:'/images/avatars/avatar-aditi.jpg'},
  dev:{n:'Dev',lv:3,bd:'Local Guide',c:'#455A64',pts:760,photo:'/images/avatars/avatar-dev.jpg'},
  riya:{n:'Riya',lv:2,bd:'Foodie',c:'#F9A825',pts:400,photo:'/images/avatars/avatar-riya.jpg'},
  vikram:{n:'Vikram',lv:3,bd:'Foodie',c:'#5D4037',pts:690,photo:'/images/avatars/avatar-vikram.jpg'},
  bablu:{n:'Bablu Ji',lv:0,bd:'Vendor',c:'#E65100',pts:0,photo:'/images/avatars/avatar-bablu.jpg'},
  gopal:{n:'Gopal Ji',lv:0,bd:'Vendor',c:'#AD1457',pts:0,photo:'/images/avatars/avatar-gopal.jpg'},
  zoya:{n:'Zoya',lv:2,bd:'Foodie',c:'#00ACC1',pts:360},
  ishaan:{n:'Ishaan',lv:1,bd:'Newbie',c:'#7E57C2',pts:60},
  faiz:{n:'Faiz',lv:2,bd:'Local Guide',c:'#2E7D32',pts:410},
  priya:{n:'Priya',lv:2,bd:'Foodie',c:'#D32F2F',pts:300},
  sonal:{n:'Sonal',lv:3,bd:'Foodie',c:'#512DA8',pts:520},
  aarav:{n:'Aarav (you)',lv:2,bd:'Local Guide',c:'#D81E5B',pts:220},
  ...JAIPUR_EXTRA_USERS,
  ...JAIPUR_SCALE_USERS
};

let CID = 100;
const Cm = (u: string, t: string, likes: number, age: number, replies: [string, string, number, number][] = []): Comment => ({
  id: 'c' + (CID++), u, t, likes, age, replies: replies.map(r => ({ id: 'c' + (CID++), u: r[0], t: r[1], likes: r[2], age: r[3], replies: [] }))
});

export const THREADS: Thread[] = [
{id:'t1',uid:'sneha',cat:'Recommendations',pinned:true,title:'Best pyaaz kachori in Jaipur? Vote and argue below',body:'Every Jaipurite has a strong opinion. Pick your favourite and tell us why. Please mention the time you went, since batches matter.',age:1500,up:212,down:6,img:'/images/bonus/cafe-premium-01.jpg',
 poll:{q:'Pick one',opts:[['Sindhi Camp Kachori Corner',462],['Sanganer Khasta Kachori & Jalebi',311],['Sodala Raj Kachori Bhandar',124],['Somewhere else',97]]},
 comments:[Cm('meera','Sindhi Camp, second batch, before 9 am. Nothing beats it.',48,1400,[['kunal','Agree. First batch is a bit soft.',9,1300],['arjun','Sanganer is underrated though.',6,1200]]),Cm('nisha','Sanganer khasta is a different style, so it’s not fair to compare.',31,1100),Cm('vikram','Add the hing-matar sabzi and it’s over.',12,900)]},
{id:'t2',uid:'kunal',cat:'Questions',title:'Which stalls are open after 11 pm near MI Road?',body:'Craving something hot after a late movie. Chai, maggi, rolls, anything. Bonus if it’s safe to walk there.',age:240,up:64,down:1,sid:'s17',
 comments:[Cm('dev','Nahargarh Road Chai & Maggi is open till 1 am. Well lit and busy.',28,200),Cm('farhan','Raja Park shawarma till 1 am too.',14,180,[['kunal','Thanks! Heading to the maggi one.',3,120]]),Cm('tanya','Amer Road kulfi till midnight if you want something cold.',9,150)]},
{id:'t3',uid:'meera',cat:'Meetups',live:true,event:{title:'Sunday kachori and ghewar walk',when:'Sun, 7:30 am',where:'Johari Bazaar, meeting at Hawa Mahal side gate',going:14,cap:20},title:'Sunday kachori and ghewar walk in Johari Bazaar',body:'Easy 2-hour food walk. We’ll try 4 stalls, split plates and end with lassi. Bring cash and an appetite. All levels welcome.',age:90,up:98,down:0,sid:'s2',img:'/images/bonus/cafe-premium-02.jpg',
 comments:[Cm('aditi','Count me in! Can I bring a friend?',6,80,[['meera','Of course, just RSVP for both.',3,70]]),Cm('riya','Is it veg only?',2,60,[['meera','Mostly veg. Halwais only.',4,50]])]},
{id:'t4',uid:'nisha',cat:'Hidden gems',title:'Found a mirchi bada lane off Tripolia Bazaar',body:'Behind the small temple, there’s a man frying mirchi bada in batches. No board, no name. I added it on Chatorey as “Tripolia Mirchi Bada Wale”. Go around 5 pm.',age:2880,up:143,down:2,sid:'s7',img:'/images/bonus/cafe-premium-03.jpg',
 comments:[Cm('faiz','I’m the one who added it! Also try the aloo bonda.',22,2700),Cm('rohan','Went yesterday. Crisp and not oily.',11,2000)]},
{id:'t5',uid:'bablu',cat:'Vendors',title:'Vendors: how do you handle the Sunday morning rush?',body:'We get double the crowd on Sundays. I’m thinking of pre-cooking half the batch. Does that hurt taste? Would love tips from other stall owners.',age:4300,up:57,down:3,img:'/images/bonus/cafe-premium-04.jpg',
 comments:[Cm('gopal','I keep dough ready but fry only when the customer arrives. Slower, but tastes right.',24,4200),Cm('meera','As a customer, I’d wait 5 more minutes for fresh kachori.',31,4100)]},
{id:'t6',uid:'aditi',cat:'Questions',title:'Best momos near Raja Park under ₹80?',body:'Not looking for fancy. Just a hot plate of steamed momos with a good red chutney.',age:600,up:39,down:0,sid:'s8',
 comments:[Cm('rohan','Raja Park Momo Cart. Steamed momos are ₹60 and the chutney is spicy.',18,500),Cm('farhan','Agree. Kurkure ones are ₹90 though.',7,480)]},
{id:'t7',uid:'sneha',cat:'Recommendations',title:'Monsoon menu: kanji vada, pakoda and hot chai',body:'Rainy evening picks. Tell me yours and where you get them.',age:7200,up:88,down:1,img:'/images/bonus/cafe-premium-05.jpg',
 comments:[Cm('zoya','Kanji vada at Chameliwala Market. Tangy and cold.',14,7000),Cm('kunal','Moong dal pakodi at Tripolia. Even better with chai.',10,6900)]},
{id:'t8',uid:'dev',cat:'Recommendations',title:'Kulhad or steel glass for lassi?',body:'I say kulhad. The clay smell adds something. My friend says it’s just marketing. Settle this.',age:3400,up:76,down:8,
 poll:{q:'Your side',opts:[['Kulhad, always',388],['Steel glass, less mess',56],['Don’t care, just give me lassi',94]]},
 comments:[Cm('riya','Kulhad, obviously.',9,3300)]},
{id:'t9',uid:'tanya',cat:'Questions',title:'Does delivered street food actually arrive hot?',body:'Tried ordering kachori through a parcel rider. Wondering how it holds up over 3 km.',age:5000,up:71,down:4,img:'/images/bonus/cafe-premium-06.jpg',
 comments:[Cm('meera','Ask the vendor to pack chutney separately and keep the kachori loose. Steam softens them.',33,4900),Cm('arjun','Sealed bags help. Mine arrived warm in 22 minutes.',15,4700)]},
{id:'t10',uid:'kunal',cat:'Vendors',title:'Street food hygiene: what locals look for',body:'My checklist: covered food, clean oil, fresh batch, gloves or tongs, dustbin nearby. Add yours.',age:9000,up:120,down:2,
 comments:[Cm('sneha','Also look at the queue. Locals don’t stand for bad food.',40,8900),Cm('nisha','Check that the oil isn’t dark. Simple test.',26,8800)]},
  ...JAIPUR_EXTRA_THREADS,
  ...JAIPUR_SCALE_THREADS
];

export const STORIES: StoryGroup[] = [
{uid:'meera',slides:[{id:'meera0',e:'🧆',c:['#E8A317','#C2560B'],cap:'First batch at Sindhi Camp. Listen to that crunch.',sid:'s1',when:'2h'},{id:'meera1',e:'🍯',c:['#F4B942','#D97A1C'],cap:'Then malai ghewar in Johari Bazaar. Breakfast done.',sid:'s2',when:'2h'}]},
{uid:'kunal',slides:[{id:'kunal0',e:'🥛',c:['#F06292','#AD1457'],cap:'Kesar lassi on MI Road. 4 stars, 5 with the malai.',sid:'s3',when:'4h'}]},
{uid:'nisha',slides:[{id:'nisha0',e:'🫧',c:['#26A69A','#00695C'],cap:'The golgappe man in Chandpole remembered my spice level.',sid:'s5',when:'5h'},{id:'nisha1',e:'🌶️',c:['#7CB342','#33691E'],cap:'And a hidden mirchi bada lane nearby.',sid:'s7',when:'5h'}]},
{uid:'dev',slides:[{id:'dev0',e:'☕',c:['#795548','#FFB74D'],cap:'Midnight chai at Nahargarh Road. Worth it.',sid:'s17',when:'8h'}]},
{uid:'riya',slides:[{id:'riya0',e:'🍨',c:['#8E24AA','#F06292'],cap:'Kulfi after the Jal Mahal walk.',sid:'s16',when:'9h'}]},
{uid:'sneha',slides:[{id:'sneha0',e:'🥣',c:['#00897B','#80CBC4'],cap:'Raj kachori at Sodala, and yes, I finished it.',sid:'s23',when:'12h'}]},
{uid:'aditi',slides:[{id:'aditi0',e:'🥟',c:['#EF5350','#B71C1C'],cap:'Kurkure momos at Raja Park.',sid:'s8',when:'14h'}]},
{uid:'vikram',slides:[{id:'vikram0',e:'🫓',c:['#F9A825','#E65100'],cap:'Chole kulche for lunch. ₹60.',sid:'s18',when:'20h'}]},
  ...JAIPUR_EXTRA_STORIES,
  ...JAIPUR_SCALE_STORIES
];

const RC = (u: string, t: string, likes: number, when: string) => ({ u, t, likes, when });
export const REELS: Reel[] = [
{id:'r1',u:'meera',sid:'s1',cap:'Sound on 🔊 second batch pyaaz kachori at Sindhi Camp',music:'Original audio · Meera',e:'🧆',c:['#E8A317','#C2560B'],likes:1284,dislikes:12,saves:340,when:'2h',dur:'0:18',cm:[RC('kunal','Going tomorrow at 6!',12,'1h'),RC('nisha','That crunch 😍',8,'1h')]},
{id:'r2',u:'kunal',sid:'s3',cap:'Kulhad lassi with a malai top. Yes it’s worth ₹60.',music:'Chill beats',e:'🥛',c:['#F06292','#AD1457'],likes:842,dislikes:9,saves:210,when:'4h',dur:'0:14',cm:[RC('riya','The malai layer!',5,'3h')]},
{id:'r3',u:'nisha',sid:'s5',cap:'Watch him fill 6 golgappe in 5 seconds',music:'Original audio · Nisha',e:'🫧',c:['#26A69A','#00695C'],likes:2310,dislikes:24,saves:510,when:'5h',dur:'0:22',cm:[RC('aditi','So satisfying',33,'4h'),RC('farhan','Where is this??',2,'4h'),RC('nisha','Chandpole! Ask for the sweet water too.',9,'3h')]},
{id:'r4',u:'sneha',sid:'s2',cap:'How malai ghewar is made, start to finish',music:'Original audio · Sneha',e:'🥞',c:['#F4B942','#D97A1C'],likes:5120,dislikes:40,saves:1900,when:'1d',dur:'0:41',cm:[RC('meera','This is art.',52,'1d'),RC('dev','Need one now.',14,'1d')]},
{id:'r5',u:'dev',sid:'s17',cap:'Midnight maggi, cutting chai, fort lights',music:'Lo-fi Jaipur',e:'🍜',c:['#795548','#FFB74D'],likes:690,dislikes:6,saves:120,when:'8h',dur:'0:16',cm:[RC('kunal','On my way!',3,'7h')]},
{id:'r6',u:'aditi',sid:'s8',cap:'Kurkure momos taste test 🥟🔥',music:'Trending sound',e:'🥟',c:['#EF5350','#B71C1C'],likes:1020,dislikes:31,saves:180,when:'14h',dur:'0:12',cm:[RC('rohan','Too spicy for me',4,'12h'),RC('farhan','Chutney is fire',7,'11h')]},
{id:'r7',u:'riya',sid:'s16',cap:'Matka kulfi that stays cold in 40°C',music:'Original audio · Riya',e:'🍨',c:['#8E24AA','#F06292'],likes:760,dislikes:5,saves:200,when:'9h',dur:'0:15',cm:[]},
{id:'r8',u:'vikram',sid:'s9',cap:'Dal baati churma straight from the angeethi',music:'Folk mix',e:'🍛',c:['#FB8C00','#E65100'],likes:1500,dislikes:14,saves:430,when:'2d',dur:'0:27',cm:[RC('meera','Ghee overload, in a good way.',20,'2d')]},
{id:'r9',u:'tanya',sid:'s4',cap:'Raj kachori challenge at Masala Chowk',music:'Original audio · Tanya',e:'🥣',c:['#43A047','#F9A825'],likes:930,dislikes:19,saves:150,when:'3d',dur:'0:24',cm:[RC('arjun','Finished it? Respect.',6,'3d')]},
{id:'r10',u:'farhan',sid:'s11',cap:'Poha jalebi. Sweet and sour, exactly like Jaipur mornings',music:'Morning raga',e:'🍯',c:['#FFA726','#EF6C00'],likes:610,dislikes:4,saves:97,when:'3d',dur:'0:13',cm:[]},
  ...JAIPUR_EXTRA_REELS,
  ...JAIPUR_SCALE_REELS
];

export const ADDRS: Addr[] = [
  { id: 'a1', label: 'Home', text: 'Flat 302, Shanti Apartments', area: 'Raja Park' },
  { id: 'a2', label: 'Work', text: '2nd floor, Ashok Marg office', area: 'MI Road' },
  { id: 'a3', label: 'Johari run', text: 'Near Hawa Mahal side gate', area: 'Johari Bazaar' },
  { id: 'a4', label: 'Family', text: 'B-12, Vaishali Nagar', area: 'Vaishali Nagar' },
  { id: 'a5', label: 'College', text: 'MNIT campus gate, Malviya Nagar', area: 'Malviya Nagar' },
  { id: 'a6', label: 'Dadi\'s', text: 'Near Chandpole metro, Purani Basti lane', area: 'Chandpole' },
  { id: 'a7', label: 'Weekend', text: 'Amer fort parking, upper lane', area: 'Amer Road' }
];
