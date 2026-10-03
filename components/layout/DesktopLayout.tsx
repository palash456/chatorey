'use client';
import React from 'react';

export function DesktopCanvas({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`desktop-canvas ${className}`.trim()}>{children}</div>;
}

export function DesktopPageHeader({
  title,
  subtitle,
  action
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="desktop-page-header">
      <div className="min-w-0">
        <h1 className="text-[26px] font-extrabold tracking-tight text-ink">{title}</h1>
        {subtitle ? <p className="mt-1 text-[14px] text-muted">{subtitle}</p> : null}
      </div>
      {action ? <div className="flex flex-none items-center gap-2">{action}</div> : null}
    </header>
  );
}

export function DesktopSection({
  title,
  subtitle,
  action,
  children,
  className = ''
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`desktop-section ${className}`.trim()}>
      <div className="desktop-section-head px-4 lg:px-0">
        <div className="min-w-0">
          <h2 className="text-[19px] font-extrabold text-ink">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-[13px] text-muted">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

/** Horizontal scroll on mobile; responsive card grid on desktop. */
export function StallRail({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <>
      <div className={`stall-rail-scroll flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:hidden ${className}`}>
        {children}
      </div>
      <div className={`stall-rail-grid hidden lg:grid ${className}`}>{children}</div>
    </>
  );
}
