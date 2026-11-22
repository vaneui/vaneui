import { useEffect } from 'react';

// reference-counted scroll lock; compensates for scrollbar width to avoid layout shift
let lockCount = 0;
let originalStyles: {
  overflow: string;
  paddingRight: string;
} | null = null;

// The width the page loses when the lock hides its scrollbar. A gutter reserved with
// `scrollbar-gutter: stable` on the root stays when the scrollbar goes, so the page does not move
// and needs no padding (innerWidth - clientWidth still reports the gutter).
function getScrollbarWidth(): number {
  const gutter = getComputedStyle(document.documentElement).getPropertyValue('scrollbar-gutter');
  if (gutter.includes('stable')) return 0;
  return window.innerWidth - document.documentElement.clientWidth;
}

export function lockScroll(): void {
  lockCount++;

  if (lockCount === 1) {
    const scrollbarWidth = getScrollbarWidth();

    originalStyles = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
}

export function unlockScroll(): void {
  lockCount = Math.max(0, lockCount - 1);

  if (lockCount === 0 && originalStyles) {
    document.body.style.overflow = originalStyles.overflow;
    document.body.style.paddingRight = originalStyles.paddingRight;
    originalStyles = null;
  }
}

export function useScrollLock(enabled: boolean): void {
  useEffect(() => {
    if (enabled) {
      lockScroll();
      return unlockScroll;
    }
  }, [enabled]);
}
