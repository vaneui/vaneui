import { useEffect, type RefObject } from 'react';
import { getActiveOverlayPortals } from './overlayStack';

// While `enabled`, neutralize the page BEHIND a modal dialog: every direct
// child of document.body that is not the dialog's own portal — nor an overlay
// portaled out of it (e.g. an in-modal menu) — gets `inert` + aria-hidden, so
// AT browse-mode and stray focus can't reach background content. The Tab focus
// trap alone only guards the first/last boundary; it does not neutralize the
// background for assistive tech. Prior `inert`/`aria-hidden` values are
// captured and restored on cleanup.
//
// Overlays opened AFTER the dialog (added to body later) are never in the
// snapshot, so they stay reachable; the getActiveOverlayPortals() check also
// excludes any already-open overlay if the effect re-runs.
export function useInertBackground(
  enabled: boolean,
  selfRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return;

    const self = selfRef.current;
    const overlays = getActiveOverlayPortals();
    const isProtected = (child: Element): boolean => {
      if (self && (child === self || child.contains(self) || self.contains(child))) return true;
      return overlays.some((o) => child === o || child.contains(o) || o.contains(child));
    };

    const touched: { el: HTMLElement; hadInert: boolean; prevAriaHidden: string | null }[] = [];
    for (const child of Array.from(document.body.children)) {
      if (!(child instanceof HTMLElement) || isProtected(child)) continue;
      touched.push({
        el: child,
        hadInert: child.hasAttribute('inert'),
        prevAriaHidden: child.getAttribute('aria-hidden'),
      });
      child.setAttribute('inert', '');
      child.setAttribute('aria-hidden', 'true');
    }

    return () => {
      for (const t of touched) {
        if (!t.hadInert) t.el.removeAttribute('inert');
        if (t.prevAriaHidden === null) t.el.removeAttribute('aria-hidden');
        else t.el.setAttribute('aria-hidden', t.prevAriaHidden);
      }
    };
  }, [enabled, selfRef]);
}
