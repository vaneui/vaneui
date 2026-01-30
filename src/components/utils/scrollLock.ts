import { useEffect } from 'react';

/**
 * Simple scroll lock utility with reference counting for nested modals.
 * Prevents body scroll and compensates for scrollbar width to avoid layout shift.
 */

let lockCount = 0;
let originalStyles: {
  overflow: string;
  paddingRight: string;
} | null = null;

/**
 * Get the width of the browser scrollbar
 */
function getScrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth;
}

/**
 * Lock body scroll and compensate for scrollbar removal
 */
export function lockScroll(): void {
  lockCount++;

  if (lockCount === 1) {
    const scrollbarWidth = getScrollbarWidth();

    // Store original styles
    originalStyles = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };

    // Apply lock
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
}

/**
 * Unlock body scroll (when all modals are closed)
 */
export function unlockScroll(): void {
  lockCount = Math.max(0, lockCount - 1);

  if (lockCount === 0 && originalStyles) {
    document.body.style.overflow = originalStyles.overflow;
    document.body.style.paddingRight = originalStyles.paddingRight;
    originalStyles = null;
  }
}

/**
 * React hook for scroll lock
 * @param enabled - Whether scroll lock is active
 */
export function useScrollLock(enabled: boolean): void {
  useEffect(() => {
    if (enabled) {
      lockScroll();
      return unlockScroll;
    }
  }, [enabled]);
}
