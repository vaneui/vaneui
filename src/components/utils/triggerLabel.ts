import { useState, type RefObject } from 'react';
import { useIsomorphicLayoutEffect } from './isomorphicLayoutEffect';

/**
 * Names a popup after the element that opens it. Returns the id to put in the popup's
 * `aria-labelledby`, or `undefined` when `enabled` is false (the popup has a name of its own).
 *
 * The trigger keeps the id it has; only a trigger without one is given `fallbackId`. The id is read
 * from, and when missing set on, the trigger element itself: the trigger may be wrapped (a Tooltip
 * around a Button), so the props of the element the caller holds do not say what id the real
 * element has. `declaredId` is the id those props do declare, used for the first render.
 */
export function useTriggerLabelId(
  triggerRef: RefObject<HTMLElement | null>,
  declaredId: string | undefined,
  fallbackId: string,
  enabled: boolean,
): string | undefined {
  const [id, setId] = useState(declaredId || fallbackId);

  // after every commit: the trigger element can be replaced, or its id changed, by a later render
  useIsomorphicLayoutEffect(() => {
    const trigger = triggerRef.current;
    if (!enabled || !trigger) return;
    if (!trigger.id) trigger.id = fallbackId;
    if (trigger.id !== id) setId(trigger.id);
  });

  return enabled ? id : undefined;
}
