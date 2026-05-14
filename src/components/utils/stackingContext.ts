import { useState, useLayoutEffect } from 'react';

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

// useLayoutEffect prevents a flash where nested elements paint behind parents
export function useStackingContext(open: boolean, layer: ZLayer = 'overlay'): number {
  const baseZ = getLayerBaseZ(layer);
  const [zIndex, setZIndex] = useState(baseZ);

  useLayoutEffect(() => {
    if (!open) {
      setZIndex(baseZ);
      return;
    }

    stackCount++;
    setZIndex(baseZ + stackCount);

    return () => {
      stackCount--;
    };
  }, [open, baseZ]);

  return zIndex;
}
