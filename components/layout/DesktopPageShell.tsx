'use client';
import React from 'react';
import { DesktopCanvas } from './DesktopLayout';

/** Desktop: main column + optional right rail. Mobile: single column. */
export function DesktopPageShell({
  children,
  aside,
  className = ''
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <DesktopCanvas className={`pb-10 ${aside ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10' : ''} ${className}`}>
      <div className="min-w-0">{children}</div>
      {aside ? <aside className="hidden lg:block">{aside}</aside> : null}
    </DesktopCanvas>
  );
}
