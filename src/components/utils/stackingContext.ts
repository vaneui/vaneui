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

let stackCount = 0;

// test cleanup
export function resetStackCount() {
  stackCount = 0;
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

    stackCount++;
    setZIndex(baseZ + stackCount);

    return () => {
      stackCount--;
    };
  }, [open, layer]);

  return zIndex;
}
