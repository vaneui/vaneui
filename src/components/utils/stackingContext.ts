import { useState } from 'react';
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

// Monotonic acquisition counter: every newly opened element gets a strictly
// higher offset than any element opened before it. Decrementing on close
// would hand a new element the same z-index as a still-open one (open A →
// open B → close A → open C left C colliding with B). The counter only
// resets when nothing is open, so values don't grow unbounded.
let stackCounter = 0;
let openCount = 0;

// test cleanup
export function resetStackCount() {
  stackCounter = 0;
  openCount = 0;
}

// The layout effect prevents a flash where nested elements paint behind
// parents. The getComputedStyle read lives INSIDE the effect: reading it
// during render is impure, and a consumer-customized --z-* value would make
// the server-rendered style attribute (static fallback) differ from the
// client render — a hydration mismatch. Render-time value is always the
// static fallback; the effect corrects it before paint.
export function useStackingContext(open: boolean, layer: ZLayer = 'overlay'): number {
  const [zIndex, setZIndex] = useState(LAYER_DEFAULTS[layer]);

  useIsomorphicLayoutEffect(() => {
    const baseZ = getLayerBaseZ(layer);

    if (!open) {
      setZIndex(baseZ);
      return;
    }

    openCount++;
    stackCounter++;
    setZIndex(baseZ + stackCounter);

    return () => {
      openCount--;
      if (openCount === 0) {
        stackCounter = 0;
      }
    };
  }, [open, layer]);

  return zIndex;
}
