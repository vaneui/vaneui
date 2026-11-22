import { useEffect, type RefObject } from 'react';
import { getActiveOverlayPortals, subscribeOverlayStack } from './overlayStack';

interface PrevState {
  hadInert: boolean;
  prevAriaHidden: string | null;
}

// Every open dialog that neutralizes a child of <body> holds it here. Dialogs open and close in
// any order (a nested one unmounts after its parent's exit, siblings close in one commit), so the
// state to restore is recorded once, by the first dialog that holds the element, and put back
// only when the last one lets go. A per-dialog snapshot would record what an earlier dialog wrote
// as the page's own state, and a later cleanup would "restore" aria-hidden after every dialog closed.
interface Hold {
  original: PrevState;
  holders: Set<object>;
}

const holds = new Map<HTMLElement, Hold>();

function acquire(el: HTMLElement, holder: object): void {
  let hold = holds.get(el);
  if (!hold) {
    hold = {
      original: { hadInert: el.hasAttribute('inert'), prevAriaHidden: el.getAttribute('aria-hidden') },
      holders: new Set(),
    };
    holds.set(el, hold);
  }
  hold.holders.add(holder);
  el.setAttribute('inert', '');
  el.setAttribute('aria-hidden', 'true');
}

function release(el: HTMLElement, holder: object): void {
  const hold = holds.get(el);
  if (!hold || !hold.holders.delete(holder) || hold.holders.size > 0) return;
  holds.delete(el);
  const { original } = hold;
  if (!original.hadInert) el.removeAttribute('inert');
  if (original.prevAriaHidden === null) el.removeAttribute('aria-hidden');
  else el.setAttribute('aria-hidden', original.prevAriaHidden);
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
// inert. Prior `inert`/`aria-hidden` values are captured and restored once no
// open dialog holds the element any more (see `holds` above).
//
// Portals VaneUI did not render (another library's popover, a toast container)
// are not in the overlay stack. Two ways keep them live:
//  - the `data-vane-overlay` attribute on the portal's own element, when that
//    element is a direct child of document.body;
//  - `useOverlayRegistration()`, which registers any element (its body-level
//    container is then left alone, as for VaneUI's own overlays).

/** A direct child of document.body carrying this attribute is never made inert by a Modal. */
export const OVERLAY_ATTRIBUTE = 'data-vane-overlay';

export function useInertBackground(
  enabled: boolean,
  selfRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;

    // the body children this dialog holds; the set itself is its token in `holds`
    const held = new Set<HTMLElement>();

    const reconcile = (): void => {
      const self = selfRef.current;
      const overlays = getActiveOverlayPortals();
      const isProtected = (child: Element): boolean => {
        if (self && (child === self || child.contains(self) || self.contains(child))) return true;
        if (child.hasAttribute(OVERLAY_ATTRIBUTE)) return true;
        return overlays.some((o) => child === o || child.contains(o) || o.contains(child));
      };

      for (const child of Array.from(document.body.children)) {
        if (!(child instanceof HTMLElement)) continue;
        if (isProtected(child)) {
          // a child we previously neutralized has since become a protected
          // overlay (e.g. it just registered) → release it
          if (held.delete(child)) release(child, held);
          continue;
        }
        if (held.has(child)) continue; // already neutralized
        held.add(child);
        acquire(child, held);
      }
    };

    reconcile();
    const unsubscribe = subscribeOverlayStack(reconcile);
    // observe only direct-child add/remove on body; our own setAttribute calls
    // don't mutate childList, so this never feeds back into itself
    const observer = new MutationObserver(reconcile);
    observer.observe(document.body, { childList: true });
    // and the marker attribute being set or removed after the dialog opened; the filter keeps
    // this to that one attribute, so the `inert`/`aria-hidden` written above do not come back here
    const markerObserver = new MutationObserver(reconcile);
    markerObserver.observe(document.body, { attributes: true, attributeFilter: [OVERLAY_ATTRIBUTE], subtree: true });

    return () => {
      unsubscribe();
      observer.disconnect();
      markerObserver.disconnect();
      for (const el of held) release(el, held);
      held.clear();
    };
  }, [enabled, selfRef]);
}
