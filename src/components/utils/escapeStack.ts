/**
 * Global escape key handler stack for floating elements (modals, popups, etc.).
 *
 * Only the topmost handler fires when Escape is pressed. This prevents
 * nested modals from all closing simultaneously — only the innermost one closes.
 *
 * A single document-level keydown listener is shared across all consumers.
 */
type EscapeHandler = () => void;

const stack: EscapeHandler[] = [];
let listenerAttached = false;

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && stack.length > 0) {
    event.preventDefault();
    stack[stack.length - 1]();
  }
}

/**
 * Push an escape handler onto the stack. Returns a cleanup function
 * that removes it. Use in a useEffect cleanup.
 */
export function pushEscapeHandler(handler: EscapeHandler): () => void {
  if (!listenerAttached && typeof document !== 'undefined') {
    document.addEventListener('keydown', handleKeyDown);
    listenerAttached = true;
  }
  stack.push(handler);
  return () => {
    const idx = stack.indexOf(handler);
    if (idx !== -1) stack.splice(idx, 1);
  };
}

/** Reset state — for test cleanup only */
export function resetEscapeStack() {
  stack.length = 0;
  if (listenerAttached && typeof document !== 'undefined') {
    document.removeEventListener('keydown', handleKeyDown);
    listenerAttached = false;
  }
}
