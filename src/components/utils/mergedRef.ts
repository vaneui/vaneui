import { useCallback } from 'react';
import type React from 'react';

export function useMergedRef<T extends HTMLElement>(
  forwardedRef: React.ForwardedRef<T>,
  internalRef: React.MutableRefObject<T | null>
): (node: T | null) => void {
  return useCallback(
    (node: T | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef, internalRef]
  );
}
