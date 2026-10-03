import React from 'react';
type Tone = 'default' | 'green' | 'amber' | 'brand';
const TONE: Record<Tone, string> = {
  default: 'bg-soft text-ink',
  green: 'bg-green-bg text-green',
  amber: 'bg-amber-bg text-amber',
  brand: 'bg-brand-soft text-brand'
};
export function Pill({ children, tone = 'default', className = '' }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11.5px] font-bold ${TONE[tone]} ${className}`}>{children}</span>;
}
