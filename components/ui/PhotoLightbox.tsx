'use client';
import React from 'react';
import { Icon } from './Icon';
import { useDialogA11y } from './useDialogA11y';

export function PhotoLightbox({
  urls,
  index,
  onClose,
  onIndex
}: {
  urls: string[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const panelRef = useDialogA11y(true, onClose);
  if (!urls.length) return null;
  const i = Math.min(index, urls.length - 1);
  const prev = () => onIndex(i > 0 ? i - 1 : urls.length - 1);
  const next = () => onIndex(i < urls.length - 1 ? i + 1 : 0);

  return (
    <div ref={panelRef} className="absolute inset-0 z-[60] flex flex-col bg-black/95" role="dialog" aria-modal="true" aria-label="Photo viewer" tabIndex={-1}>
      <div className="flex items-center justify-between px-3 pt-3 text-white">
        <span className="text-[13px] font-semibold opacity-80">{i + 1} / {urls.length}</span>
        <button type="button" onClick={onClose} aria-label="Close photo viewer" className="touch-target grid place-items-center rounded-full bg-white/15">
          <Icon name="close" />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-2">
        <button type="button" aria-label="Previous photo" onClick={prev} className="touch-target absolute left-2 z-[2] grid place-items-center rounded-full bg-white/15 text-white">‹</button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={urls[i]} alt={`Stall photo ${i + 1} of ${urls.length}`} className="max-h-[72vh] max-w-full rounded-xl object-contain" />
        <button type="button" aria-label="Next photo" onClick={next} className="touch-target absolute right-2 z-[2] grid place-items-center rounded-full bg-white/15 text-white">›</button>
      </div>
    </div>
  );
}
