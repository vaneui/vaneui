import { useState, useEffect, useRef, useCallback } from 'react';

export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

export interface TransitionCallbacks {
  onEnterComplete?: () => void;
  onExitComplete?: () => void;
}

interface UseTransitionResult {
  mounted: boolean;
  state: TransitionState;
}

// Lifecycle: exited → entering → entered → exiting → exited
export function useTransition(
  open: boolean,
  duration = 200,
  disabled = false,
  callbacks?: TransitionCallbacks
): UseTransitionResult {
  const [state, setState] = useState<TransitionState>(open ? 'entered' : 'exited');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prevOpenRef = useRef(open);
  // refs so we always call the latest callbacks
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
    // skip initial mount and React StrictMode double-invocations (same value on re-run)
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
