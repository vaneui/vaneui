import { useState, useLayoutEffect } from 'react';

/** Z-index layer type for floating components */
export type ZLayer = 'overlay' | 'modal' | 'popup';

/** Default base z-index per layer */
const LAYER_DEFAULTS: Record<ZLayer, number> = {
  overlay: 200,
  modal: 200,
  popup: 300,
};

/**
 * Get the base z-index for a given layer.
 * Reads from CSS custom properties when available, falls back to LAYER_DEFAULTS for SSR/JSDOM.
 */
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

/** Global stacking counter — increments for each mounted overlay/modal/popup */
let stackCount = 0;

/** Reset stacking counter — for test cleanup only */
export function resetStackCount() {
  stackCount = 0;
}

/**
 * Hook for managing z-index stacking of overlapping floating elements.
 *
 * Each active instance gets a unique z-index that increments with nesting depth.
 * This ensures nested modals, popups inside modals, etc. stack correctly.
 *
 * Uses useLayoutEffect so the z-index is computed before the browser paints,
 * preventing a flash where nested elements appear behind their parents.
 *
 * @param open - Whether this element is currently active/visible
 * @param layer - The z-index layer type (default: 'overlay')
 * @returns The computed z-index for this stacking level
 */
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
