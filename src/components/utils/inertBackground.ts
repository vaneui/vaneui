import { useEffect, type RefObject } from 'react';
import { getActiveOverlayPortals, subscribeOverlayStack } from './overlayStack';

interface PrevState {
  hadInert: boolean;
  prevAriaHidden: string | null;
}

// While `enabled`, neutralize the page BEHIND a modal dialog: every direct
// child of document.body that is not the dialog's own portal — nor an overlay
// portaled out of it (e.g. an in-modal menu) — gets `inert` + aria-hidden, so
// AT browse-mode and stray focus can't reach background content. The Tab focus
// trap alone only guards the first/last boundary; it does not neutralize the
// background for assistive tech.
//
// The set is reconciled REACTIVELY, not snapshotted once: a MutationObserver
// catches body children added after the dialog opens (late toasts/portals),
// and an overlay-stack subscription re-runs the pass when another overlay
// registers/unregisters — so a sibling overlay (a stacked modal, or an in-modal
// popup that registers after this effect ran) is released rather than left
// inert. Prior `inert`/`aria-hidden` values are captured and restored.
export function useInertBackground(
  enabled: boolean,
  selfRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;

    // body children we have neutralized, with their pre-existing state to restore
    const touched = new Map<HTMLElement, PrevState>();

    const restore = (el: HTMLElement, prev: PrevState): void => {
      if (!prev.hadInert) el.removeAttribute('inert');
      if (prev.prevAriaHidden === null) el.removeAttribute('aria-hidden');
      else el.setAttribute('aria-hidden', prev.prevAriaHidden);
    };

    const reconcile = (): void => {
      const self = selfRef.current;
      const overlays = getActiveOverlayPortals();
      const isProtected = (child: Element): boolean => {
        if (self && (child === self || child.contains(self) || self.contains(child))) return true;
        return overlays.some((o) => child === o || child.contains(o) || o.contains(child));
      };

      for (const child of Array.from(document.body.children)) {
        if (!(child instanceof HTMLElement)) continue;
        if (isProtected(child)) {
          // a child we previously neutralized has since become a protected
          // overlay (e.g. it just registered) → release it
          const prev = touched.get(child);
          if (prev) {
            restore(child, prev);
            touched.delete(child);
          }
          continue;
        }
        if (touched.has(child)) continue; // already neutralized
        touched.set(child, {
          hadInert: child.hasAttribute('inert'),
          prevAriaHidden: child.getAttribute('aria-hidden'),
        });
        child.setAttribute('inert', '');
        child.setAttribute('aria-hidden', 'true');
      }
    };

    reconcile();
    const unsubscribe = subscribeOverlayStack(reconcile);
    // observe only direct-child add/remove on body; our own setAttribute calls
    // don't mutate childList, so this never feeds back into itself
    const observer = new MutationObserver(reconcile);
    observer.observe(document.body, { childList: true });

    return () => {
      unsubscribe();
      observer.disconnect();
      for (const [el, prev] of touched) restore(el, prev);
    };
  }, [enabled, selfRef]);
}
