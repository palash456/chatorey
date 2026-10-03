'use client';
import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Coffee,
  Cookie,
  CupSoda,
  Droplets,
  Flame,
  IceCream,
  Leaf,
  Sandwich,
  Soup,
  Sparkles,
  UtensilsCrossed,
  Wheat,
  Circle,
  Triangle,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  kachori: Cookie,
  chaat: Soup,
  golgappe: Droplets,
  chai: Coffee,
  lassi: CupSoda,
  ghewar: Sparkles,
  jalebi: Sparkles,
  samosa: Triangle,
  momos: Circle,
  'dal baati': Flame,
  'mirchi bada': Flame,
  kulfi: IceCream,
  'pav bhaji': Sandwich,
  'chole kulche': Wheat,
  rolls: Sandwich,
  sweets: Sparkles,
  sandwich: Sandwich,
  maggi: Soup,
  other: UtensilsCrossed,
  snacks: Cookie,
  milk: CupSoda,
  coffee: Coffee,
};

export function foodIconFor(food: string): LucideIcon {
  const key = food.toLowerCase().trim();
  if (MAP[key]) return MAP[key];
  for (const f of FOOD_ALIASES) {
    if (key.includes(f)) return MAP[f] || UtensilsCrossed;
  }
  return UtensilsCrossed;
}

const FOOD_ALIASES = ['kachori', 'chaat', 'golgappe', 'chai', 'lassi', 'ghewar', 'jalebi', 'samosa', 'momos', 'kulfi', 'mirchi bada', 'dal baati'];

export function FoodIcon({
  food,
  size = 22,
  className = '',
  strokeWidth = 2,
}: {
  food: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = foodIconFor(food);
  return <Icon size={size} className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export function FoodIconBadge({
  food,
  colors,
  size = 46,
  iconSize = 22,
}: {
  food: string;
  colors?: [string, string];
  size?: number;
  iconSize?: number;
}) {
  const [c1, c2] = colors || ['#888', '#666'];
  return (
    <div
      className="grid flex-none place-items-center rounded-xl text-ink"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${c1}66, ${c2}99)`,
        color: c2,
      }}
    >
      <FoodIcon food={food} size={iconSize} />
    </div>
  );
}

export function VegMark({ veg, className = '' }: { veg?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-green ${className}`} title={veg ? 'Vegetarian' : 'Non-veg'}>
      <Leaf size={14} strokeWidth={2.5} />
    </span>
  );
}
