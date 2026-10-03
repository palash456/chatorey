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
    <div className="page-container page-narrow mt-5 rounded-xl bg-card p-5 text-center surface-card lg:mt-7 lg:rounded-2xl lg:p-7">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-soft text-brand lg:h-14 lg:w-14 lg:rounded-2xl">
        <Icon size={26} strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="mt-3 text-[16px] font-semibold lg:text-[18px] lg:font-extrabold">{title}</h3>
      {description && <p className="mb-3 mt-1 text-[13px] text-muted lg:mb-3.5 lg:mt-1.5">{description}</p>}
      {children}
    </div>
  );
}
