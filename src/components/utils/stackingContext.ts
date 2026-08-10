import { useState, type RefObject } from 'react';
import { useIsomorphicLayoutEffect } from './isomorphicLayoutEffect';

export type ZLayer = 'overlay' | 'modal' | 'popup';

// fallbacks for SSR/JSDOM where CSS custom props aren't available
const LAYER_DEFAULTS: Record<ZLayer, number> = {
  overlay: 200,
  modal: 200,
  popup: 300,
};

function getLayerBaseZ(layer: ZLayer): number {
  if (typeof document !== 'undefined') {
    const value = getComputedStyle(document.documentElement).getPropertyValue(`--z-${layer}`).trim();
    if (value) {
      const parsed = parseInt(value, 10);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return LAYER_DEFAULTS[layer];
}

// Every currently-open overlay. `baseZ` is the open-order value (max + 1, keeping
// the newest overlay on top — see below); `z` is that value after a corrective
// pass that lifts a NESTED overlay above the ancestor it is opened from. React
// runs child effects before parent effects, so a popup rendered inside a modal
// registers FIRST and would otherwise sit UNDER the modal's own backdrop; the
// pass (re-run reactively whenever the set changes) repairs that regardless of
// effect order. Closed entries are removed rather than reused so a new element
// still takes max + 1.
interface StackEntry {
  id: number;
  el: HTMLElement | null;
  getParent: () => HTMLElement | null;
  baseZ: number;
  z: number;
}
let entries: StackEntry[] = [];
let nextId = 1;
const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
}

function recompute(): void {
  for (const e of entries) e.z = e.baseZ;
  // Fixpoint: a nested overlay must sit above the entry whose element contains
  // its resolved parent (its opener). Bounded by the entry count.
  let changed = true;
  let guard = 0;
  while (changed && guard++ <= entries.length + 1) {
    changed = false;
    for (const e of entries) {
      const parentEl = e.getParent();
      if (!parentEl) continue;
      const p = entries.find((x) => x.el && (x.el === parentEl || x.el.contains(parentEl)));
      if (p && p.id !== e.id && e.z <= p.z) {
        e.z = p.z + 1;
        changed = true;
      }
    }
  }
}

// test cleanup
export function resetStackCount() {
  entries = [];
  nextId = 1;
}

export function useStackingContext(
  open: boolean,
  layer: ZLayer = 'overlay',
  elRef?: RefObject<HTMLElement | null>,
  getParent: () => HTMLElement | null = () => null,
): number {
  const [zIndex, setZIndex] = useState(LAYER_DEFAULTS[layer]);

  useIsomorphicLayoutEffect(() => {
    if (!open) {
      setZIndex(getLayerBaseZ(layer));
      return;
    }

    const currentMax = entries.length ? Math.max(...entries.map((e) => e.z)) : 0;
    const baseZ = Math.max(getLayerBaseZ(layer) + 1, currentMax + 1);
    const id = nextId++;
    entries.push({ id, el: elRef?.current ?? null, getParent, baseZ, z: baseZ });
    recompute();

    const update = () => {
      const me = entries.find((e) => e.id === id);
      if (me) setZIndex(me.z);
    };
    listeners.add(update);
    update();
    notify();

    return () => {
      listeners.delete(update);
      entries = entries.filter((e) => e.id !== id);
      recompute();
      notify();
    };
    // getParent/elRef read stable refs inside the effect; re-run only on open/layer.
  }, [open, layer]);

  return zIndex;
}
