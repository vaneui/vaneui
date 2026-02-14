import { useState, useEffect, useRef, useCallback } from 'react';

export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

interface UseTransitionResult {
  /** Whether the component should be in the DOM */
  mounted: boolean;
  /** Current transition state for data-state attribute */
  state: TransitionState;
}

/**
 * Hook for managing enter/exit transition lifecycle.
 *
 * Returns `mounted` (whether to render) and `state` (for CSS targeting via data-state).
 *
 * Lifecycle: exited → entering → entered → exiting → exited
 *
 * @param open - Whether the element should be visible
 * @param duration - Transition duration in ms (default: 150)
 * @param disabled - Skip transitions entirely (for noAnimation prop)
 */
export function useTransition(
  open: boolean,
  duration = 200,
  disabled = false
): UseTransitionResult {
  const [state, setState] = useState<TransitionState>(open ? 'entered' : 'exited');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prevOpenRef = useRef(open);

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    // Only animate when `open` actually changes.
    // This skips the initial mount (prevOpenRef matches open) and
    // React StrictMode double-invocations (same value on re-run).
    if (prevOpenRef.current === open) {
      return cleanup;
    }
    prevOpenRef.current = open;

    cleanup();

    if (disabled) {
      setState(open ? 'entered' : 'exited');
      return cleanup;
    }

    if (open) {
      setState('entering');
      timeoutRef.current = setTimeout(() => {
        setState('entered');
      }, duration);
    } else {
      setState('exiting');
      timeoutRef.current = setTimeout(() => {
        setState('exited');
      }, duration);
    }

    return cleanup;
  }, [open, duration, disabled, cleanup]);

  const mounted = open || state === 'entering' || state === 'exiting';

  return { mounted, state };
}
