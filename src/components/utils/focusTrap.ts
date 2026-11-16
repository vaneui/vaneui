import { useEffect, useRef, RefObject } from 'react';
import { findOverlayOpener, hasOverlayOpener, isInClosedOverlay, setOverlayOpener } from './overlayStack';

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

// Where focus may go when a trap is released: the element that had focus when the trap was set
// up, then stand-ins for it. A menu item that opens a dialog is gone when the dialog closes
// (its menu has closed), so the menu's trigger stands in for it, then that menu's own opener,
// and so on outward. Resolved when the trap is set up, while those overlays are still in the DOM.
function getReturnTargets(trigger: Element | null): HTMLElement[] {
  const targets: HTMLElement[] = [];
  let el: Element | null = trigger;
  while (el instanceof HTMLElement && el !== document.body && !targets.includes(el)) {
    targets.push(el);
    el = findOverlayOpener(el);
  }
  return targets;
}

function restoreFocus(targets: HTMLElement[]): void {
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    // gone, or inside an overlay that has closed since (hidden, or about to unmount)
    if (!target.isConnected || isInClosedOverlay(target)) continue;
    // the original trigger keeps the browser's default scrolling; a stand-in must not move the page
    target.focus(i === 0 ? undefined : { preventScroll: true });
    if (document.activeElement === target) return;
  }
  // Nothing left to return to (the opener is gone, or the dialog was opened without one).
  // Focus stays where the browser leaves it: sending it to some other element, such as the
  // first focusable one on the page, scrolls there and loses the user's place.
}

export function createFocusTrap(
  container: HTMLElement,
  triggerElement: Element | null,
  options?: FocusTrapOptions
): () => void {
  const { returnFocus = true, initialFocus } = options || {};
  const returnTargets = getReturnTargets(triggerElement);

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
    if (returnFocus) restoreFocus(returnTargets);
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
      const container = containerRef.current;
      triggerRef.current = document.activeElement;
      // let a dialog opened from inside this one find its way back out; a popup that already
      // recorded its anchor keeps it
      if (!hasOverlayOpener(container)) {
        setOverlayOpener(container, () => {
          const trigger = triggerRef.current;
          return trigger instanceof HTMLElement && trigger !== document.body ? trigger : null;
        });
      }
      return createFocusTrap(container, triggerRef.current, options);
    }
  }, [enabled, containerRef, options?.returnFocus, options?.initialFocus]);
}
