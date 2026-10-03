'use client';
import React from 'react';
import type { LucideIcon } from 'lucide-react';

export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-container page-narrow mt-7 rounded-2xl bg-card p-7 text-center shadow-card">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-soft text-brand">
        <Icon size={28} strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="mt-3 text-[18px] font-extrabold">{title}</h3>
      {description && <p className="mb-3.5 mt-1.5 text-muted">{description}</p>}
      {children}
    </div>
  );
}
