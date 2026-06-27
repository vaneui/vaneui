// Central registry of currently-open overlays (Popup / Menu / Modal / Overlay)
// and their parent → child relationships. Several overlay behaviors break
// without a shared view of the open set because each overlay portals its
// content to document.body as a sibling, so DOM ancestry alone can't tell that
// a child popup "belongs to" the popup that opened it:
//
//  - close-on-click-outside: a click inside a portaled child popup must NOT
//    count as "outside" its parent (otherwise interacting with a submenu
//    closes the menu).
//  - background inert: a Modal must inert the page behind it, but NOT the
//    overlays portaled to body that belong to it (e.g. an in-modal menu).
//  - focus traversal: a Modal's focus trap needs to see focusables in the
//    overlays portaled out of it.
//
// The registry is module-global (one document = one overlay tree), mirroring
// escapeStack / scrollLock.

export interface OverlayStackEntry {
  /** The overlay's outermost rendered element (its portal root). */
  el: HTMLElement;
  /** The parent overlay's element, if this overlay was opened from inside another. */
  parent: HTMLElement | null;
}

const entries: OverlayStackEntry[] = [];

/**
 * Register an open overlay. Returns an unregister function.
 * `parent` is the element of the overlay this one was opened from (or null for
 * a top-level overlay) — typically resolved via {@link findOverlayContaining}
 * on the new overlay's anchor/trigger.
 */
export function registerOverlay(el: HTMLElement, parent: HTMLElement | null = null): () => void {
  entries.push({ el, parent });
  return () => unregisterOverlay(el);
}

export function unregisterOverlay(el: HTMLElement): void {
  const idx = entries.findIndex((e) => e.el === el);
  if (idx !== -1) entries.splice(idx, 1);
}

/** Every currently-open overlay root element. Used to exclude them from background inert. */
export function getActiveOverlayPortals(): HTMLElement[] {
  return entries.map((e) => e.el);
}

/**
 * The innermost registered overlay whose element contains `node`, or null.
 * Used to resolve a new overlay's parent from its anchor/trigger element.
 */
export function findOverlayContaining(node: Node | null): HTMLElement | null {
  if (!node) return null;
  let best: HTMLElement | null = null;
  for (const entry of entries) {
    if (entry.el.contains(node)) {
      // pick the deepest match (an ancestor overlay contains the inner one)
      if (!best || best.contains(entry.el)) best = entry.el;
    }
  }
  return best;
}

/**
 * True if `target` is inside `rootEl` OR inside any overlay that descends from
 * `rootEl` through the registered parent chain. This is the "family" test for
 * close-on-click-outside: a click in a child/grandchild popup is inside the
 * family of its ancestor, even though the DOM portals make them body siblings.
 */
export function isInOverlayFamily(target: Node, rootEl: HTMLElement): boolean {
  if (rootEl.contains(target)) return true;
  for (const entry of entries) {
    if (!entry.el.contains(target)) continue;
    // walk this overlay's parent chain looking for rootEl
    let parent = entry.parent;
    const seen = new Set<HTMLElement>();
    while (parent) {
      if (parent === rootEl) return true;
      if (seen.has(parent)) break;
      seen.add(parent);
      const parentEntry = entries.find((e) => e.el === parent);
      parent = parentEntry ? parentEntry.parent : null;
    }
  }
  return false;
}

/** All focusable-relevant descendant overlay roots of `rootEl` (direct + transitive children). */
export function getDescendantOverlays(rootEl: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  for (const entry of entries) {
    if (entry.el === rootEl) continue;
    let parent = entry.parent;
    const seen = new Set<HTMLElement>();
    while (parent) {
      if (parent === rootEl) {
        out.push(entry.el);
        break;
      }
      if (seen.has(parent)) break;
      seen.add(parent);
      const parentEntry = entries.find((e) => e.el === parent);
      parent = parentEntry ? parentEntry.parent : null;
    }
  }
  return out;
}

/** test cleanup */
export function resetOverlayStack(): void {
  entries.length = 0;
}
