import { useState, useCallback, useRef, useEffect } from 'react';

interface UseControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}

// passing `value` makes the component controlled; onChange fires in both modes
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, (nextValue: T) => void] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // stable ref to avoid re-creating the setter
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      } else if (process.env.NODE_ENV !== 'production' && !onChangeRef.current) {
        // controlled with no handler wired: the change can't take effect (e.g.
        // a `open`/`value` set without onOpenChange/onChange/onClose) — a silent
        // no-op that leaves a Modal stuck open. Mirror React's controlled-input
        // warning so the mistake is visible.
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
