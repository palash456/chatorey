export function activateOnEnterSpace(fn: () => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  };
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
  );
}

export function trapFocus(container: HTMLElement, e: { key: string; shiftKey: boolean; preventDefault: () => void }) {
  if (e.key !== 'Tab') return;
  const nodes = getFocusableElements(container);
  if (!nodes.length) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  const active = document.activeElement as HTMLElement | null;
  if (e.shiftKey) {
    if (active === first || !container.contains(active)) {
      e.preventDefault();
      last.focus();
    }
  } else if (active === last) {
    e.preventDefault();
    first.focus();
  }
}
