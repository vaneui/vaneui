import { useState, useCallback, useRef, useEffect } from 'react';

interface UseControllableStateOptions<T> {
  /** Controlled value (if provided, component is controlled) */
  value?: T;
  /** Default value for uncontrolled mode */
  defaultValue: T;
  /** Called when value changes (both controlled and uncontrolled modes) */
  onChange?: (value: T) => void;
}

/**
 * Hook for creating components that support both controlled and uncontrolled modes.
 *
 * - If `value` is provided (not undefined), the component is controlled.
 * - If `value` is undefined, the component manages its own internal state
 *   initialized to `defaultValue`.
 * - `onChange` fires in both modes when the setter is called.
 *
 * Pattern from Radix UI / Chakra UI.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, (nextValue: T) => void] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Keep onChange ref stable to avoid re-creating the setter
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChangeRef.current?.(nextValue);
    },
    [isControlled]
  );

  return [currentValue, setValue];
}
