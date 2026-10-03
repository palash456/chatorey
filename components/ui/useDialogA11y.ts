'use client';
import { useEffect, useRef } from 'react';
import { getFocusableElements, trapFocus } from '../../lib/a11y';

export function useDialogA11y(open: boolean, onClose: () => void) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const nodes = getFocusableElements(panel);
      (nodes[0] ?? panel).focus();
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      const panel = panelRef.current;
      if (panel) trapFocus(panel, e);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  return panelRef;
}
