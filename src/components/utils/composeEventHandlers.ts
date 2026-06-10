/**
 * Composes a consumer-supplied event handler with an internal one so a
 * consumer prop never silently replaces internal behavior (click-to-close,
 * stopPropagation, ...). The consumer handler runs first; the internal
 * handler always runs. Internal close handlers check event.defaultPrevented
 * themselves, so a consumer can call event.preventDefault() to opt out of
 * closing without losing their own handler.
 */
export function composeEventHandlers<E>(
  consumer: ((event: E) => void) | undefined,
  internal: (event: E) => void
): (event: E) => void {
  return (event: E) => {
    consumer?.(event);
    internal(event);
  };
}
