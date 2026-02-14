import { useEffect, useRef, RefObject } from 'react';

/**
 * Selector for focusable elements
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Get visible focusable elements within container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  return Array.from(elements).filter(
    (el) => el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden'
  );
}

/** Options for createFocusTrap */
export interface FocusTrapOptions {
  /** Whether to return focus to the trigger element on cleanup (default: true) */
  returnFocus?: boolean;
  /** Element to focus initially instead of the first focusable element */
  initialFocus?: RefObject<HTMLElement | null>;
}

/**
 * Create focus trap for a container element.
 * Traps Tab/Shift+Tab cycling within the container.
 *
 * @param container - The element to trap focus within
 * @param triggerElement - Element to return focus to on cleanup
 * @param options - Optional configuration for focus behavior
 * @returns Cleanup function that removes event listeners and restores focus
 */
export function createFocusTrap(
  container: HTMLElement,
  triggerElement: Element | null,
  options?: FocusTrapOptions
): () => void {
  const { returnFocus = true, initialFocus } = options || {};

  // Focus initial element or first focusable element
  requestAnimationFrame(() => {
    if (initialFocus?.current) {
      initialFocus.current.focus();
    } else {
      const elements = getFocusableElements(container);
      if (elements.length > 0) {
        elements[0].focus();
      } else {
        // Fallback: make container focusable
        container.setAttribute('tabindex', '-1');
        container.focus();
      }
    }
  });

  // Handle Tab key cycling
  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;

    const elements = getFocusableElements(container);
    if (elements.length === 0) return;

    const first = elements[0];
    const last = elements[elements.length - 1];
    const active = document.activeElement;

    // Shift+Tab on first element -> focus last
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    }
    // Tab on last element -> focus first
    else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  document.addEventListener('keydown', handleKeyDown);

  // Cleanup: remove listener and restore focus
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    if (returnFocus && triggerElement instanceof HTMLElement) {
      triggerElement.focus();
    }
  };
}

/**
 * React hook for focus trap
 *
 * @param containerRef - Ref to the container element
 * @param enabled - Whether focus trap is active
 * @param options - Optional configuration for focus behavior
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  options?: FocusTrapOptions
): void {
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (enabled && containerRef.current) {
      // Capture the element that had focus before modal opened
      triggerRef.current = document.activeElement;
      return createFocusTrap(containerRef.current, triggerRef.current, options);
    }
  }, [enabled, containerRef, options?.returnFocus, options?.initialFocus]);
}
