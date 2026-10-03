'use client';
import React from 'react';
import { useDialogA11y } from './useDialogA11y';

export function Sheet({
  open,
  onClose,
  children,
  label = 'Panel'
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label?: string;
}) {
  const panelRef = useDialogA11y(open, onClose);
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-40 lg:flex lg:items-center lg:justify-center lg:p-6">
      <button
        type="button"
        aria-label="Close panel"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className="absolute inset-x-0 bottom-0 max-h-[92%] overflow-y-auto rounded-t-[22px] bg-card px-[18px] pb-[calc(22px+env(safe-area-inset-bottom,0px))] pt-3 animate-[up_.22s_ease-out] motion-reduce:animate-none lg:relative lg:max-h-[min(85vh,720px)] lg:w-full lg:max-w-lg lg:rounded-2xl lg:px-6 lg:pb-6 lg:shadow-[0_24px_80px_rgba(0,0,0,.35)]"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line lg:hidden" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
