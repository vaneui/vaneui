import { useState, useLayoutEffect } from 'react';

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
 * @param baseZ - Base z-index value (default: 50)
 * @returns The computed z-index for this stacking level
 */
export function useStackingContext(open: boolean, baseZ = 50): number {
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
