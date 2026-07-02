import { useEffect, useRef, RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  return Array.from(elements).filter(
    (el) => el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden'
  );
}

export interface FocusTrapOptions {
  returnFocus?: boolean;
  initialFocus?: RefObject<HTMLElement | null>;
}

export function createFocusTrap(
  container: HTMLElement,
  triggerElement: Element | null,
  options?: FocusTrapOptions
): () => void {
  const { returnFocus = true, initialFocus } = options || {};

  requestAnimationFrame(() => {
    if (initialFocus?.current) {
      initialFocus.current.focus();
    } else {
      const elements = getFocusableElements(container);
      if (elements.length > 0) {
        elements[0].focus();
      } else {
        // fallback: make container itself focusable
        container.setAttribute('tabindex', '-1');
        container.focus();
      }
    }
  });

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;

    const elements = getFocusableElements(container);
    // a dialog with no focusable content still traps Tab on itself rather than
    // leaking focus to the background
    if (elements.length === 0) {
      event.preventDefault();
      return;
    }

    const first = elements[0];
    const last = elements[elements.length - 1];
    const active = document.activeElement;

    // when the container itself holds focus (the no-initial-target fallback),
    // Tab wraps to the first focusable and Shift-Tab to the last
    if (active === container) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    if (returnFocus && triggerElement instanceof HTMLElement) {
      triggerElement.focus();
    }
  };
}

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  options?: FocusTrapOptions
): void {
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (enabled && containerRef.current) {
      triggerRef.current = document.activeElement;
      return createFocusTrap(containerRef.current, triggerRef.current, options);
    }
  }, [enabled, containerRef, options?.returnFocus, options?.initialFocus]);
}
