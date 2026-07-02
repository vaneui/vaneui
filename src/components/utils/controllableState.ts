import { useState, useCallback, useRef, useEffect } from 'react';

interface UseControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
  /**
   * Set when the component also propagates changes through a separate channel
   * this hook can't observe — e.g. an `onClose` callback that the component
   * invokes alongside the setter. Suppresses the dev "controlled but no handler"
   * warning, which would otherwise false-fire on the common controlled
   * `open` + `onClose` pattern (the setter genuinely no-ops, but the close was
   * already handled via onClose).
   */
  hasExternalHandler?: boolean;
}

// passing `value` makes the component controlled; onChange fires in both modes
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
  hasExternalHandler,
}: UseControllableStateOptions<T>): [T, (nextValue: T) => void] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // stable refs to avoid re-creating the setter when handlers/flags change
  const onChangeRef = useRef(onChange);
  const hasExternalHandlerRef = useRef(hasExternalHandler);
  useEffect(() => {
    onChangeRef.current = onChange;
    hasExternalHandlerRef.current = hasExternalHandler;
  });

  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      } else if (
        process.env.NODE_ENV !== 'production' &&
        !onChangeRef.current &&
        !hasExternalHandlerRef.current
      ) {
        // controlled with NO handler of any kind wired: the change can't take
        // effect (e.g. `open`/`value` set without onOpenChange/onChange/onClose)
        // — a silent no-op that leaves a Modal stuck open. Mirror React's
        // controlled-input warning so the mistake is visible.
        console.warn(
          'VaneUI: a controlled value changed but no onChange handler is wired, so the change is a no-op. ' +
          'Provide the handler (e.g. onClose / onOpenChange / onChange), or omit `open`/`value` for uncontrolled mode.'
        );
      }
      onChangeRef.current?.(nextValue);
    },
    [isControlled]
  );

  return [currentValue, setValue];
}
