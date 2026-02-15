import { useState, useEffect, useRef, useCallback } from 'react';

export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

export interface TransitionCallbacks {
  /** Called when enter transition completes (state becomes 'entered') */
  onEnterComplete?: () => void;
  /** Called when exit transition completes (state becomes 'exited') */
  onExitComplete?: () => void;
}

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
 * @param callbacks - Optional lifecycle callbacks (onEnterComplete, onExitComplete)
 */
export function useTransition(
  open: boolean,
  duration = 200,
  disabled = false,
  callbacks?: TransitionCallbacks
): UseTransitionResult {
  const [state, setState] = useState<TransitionState>(open ? 'entered' : 'exited');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prevOpenRef = useRef(open);
  // Use refs for callbacks so we always call the latest version
  const onEnterCompleteRef = useRef(callbacks?.onEnterComplete);
  const onExitCompleteRef = useRef(callbacks?.onExitComplete);
  onEnterCompleteRef.current = callbacks?.onEnterComplete;
  onExitCompleteRef.current = callbacks?.onExitComplete;

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
      if (open) {
        setState('entered');
        onEnterCompleteRef.current?.();
      } else {
        setState('exited');
        onExitCompleteRef.current?.();
      }
      return cleanup;
    }

    if (open) {
      setState('entering');
      timeoutRef.current = setTimeout(() => {
        setState('entered');
        onEnterCompleteRef.current?.();
      }, duration);
    } else {
      setState('exiting');
      timeoutRef.current = setTimeout(() => {
        setState('exited');
        onExitCompleteRef.current?.();
      }, duration);
    }

    return cleanup;
  }, [open, duration, disabled, cleanup]);

  const mounted = open || state === 'entering' || state === 'exiting';

  return { mounted, state };
}
