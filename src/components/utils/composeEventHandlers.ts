/* Composes a consumer handler with an internal one so a consumer prop never silently replaces internal behavior. Consumer runs first; internal always runs (but respects event.defaultPrevented to opt out). */
export function composeEventHandlers<E>(
  consumer: ((event: E) => void) | undefined,
  internal: (event: E) => void
): (event: E) => void {
  return (event: E) => {
    consumer?.(event);
    internal(event);
  };
}
