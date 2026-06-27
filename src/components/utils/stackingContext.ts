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

// Currently-open z-indexes. A newly opened element always sits one above the
// highest element already open (max + 1), while never dropping below its own
// layer floor. This keeps the NEWEST overlay on top regardless of layer —
// fixing the inversion where a popup (floor 300) opened before a modal
// (floor 200) stayed visually above the later modal. Decrementing/reusing
// values on close would let a new element collide with a still-open one, so
// closed entries are simply removed and the next element still takes max + 1.
let openZIndexes: number[] = [];

// test cleanup
export function resetStackCount() {
  openZIndexes = [];
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

    const currentMax = openZIndexes.length ? Math.max(...openZIndexes) : 0;
    const z = Math.max(baseZ + 1, currentMax + 1);
    openZIndexes.push(z);
    setZIndex(z);

    return () => {
      const idx = openZIndexes.indexOf(z);
      if (idx !== -1) openZIndexes.splice(idx, 1);
    };
  }, [open, layer]);

  return zIndex;
}
