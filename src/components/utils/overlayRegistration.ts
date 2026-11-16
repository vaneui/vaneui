import { useCallback, useEffect, useRef } from 'react';
import { registerOverlay } from './overlayStack';

/** The ref callback {@link useOverlayRegistration} returns: pass it the overlay's element, or `null` when it is gone. */
export type OverlayRegistrationRef = (element: HTMLElement | null) => void;

/**
 * Tells VaneUI about an overlay it did not render: a popover, dropdown or toast container that
 * another library portals to `document.body`.
 *
 * An open `Modal` makes the rest of the page inert and only spares overlays it knows about. Attach
 * the returned ref to the other library's element and it is treated like one of VaneUI's own
 * overlays for as long as it is mounted: the Modal leaves it, and the body-level container it sits
 * in, usable.
 *
 * ```tsx
 * const overlayRef = useOverlayRegistration();
 * return <ThirdPartyPopover ref={overlayRef}>...</ThirdPartyPopover>;
 * ```
 *
 * When the element is a direct child of `<body>` and takes attributes, `data-vane-overlay` on it
 * does the same without a hook.
 */
export function useOverlayRegistration(): OverlayRegistrationRef {
  const elementRef = useRef<HTMLElement | null>(null);
  const unregisterRef = useRef<(() => void) | null>(null);

  // Unmounting drops the registration even when the ref was called by hand and never with null.
  // Re-registering on mount covers an effect re-run that does not call the ref again (Strict Mode).
  useEffect(() => {
    if (elementRef.current && !unregisterRef.current) {
      unregisterRef.current = registerOverlay(elementRef.current);
    }
    return () => {
      unregisterRef.current?.();
      unregisterRef.current = null;
    };
  }, []);

  return useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
    unregisterRef.current?.();
    unregisterRef.current = element ? registerOverlay(element) : null;
  }, []);
}
