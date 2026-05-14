// only the topmost handler fires on Escape — prevents nested modals from all closing at once
type EscapeHandler = () => void;

const stack: EscapeHandler[] = [];
let listenerAttached = false;

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && stack.length > 0) {
    event.preventDefault();
    stack[stack.length - 1]();
  }
}

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

// test cleanup
export function resetEscapeStack() {
  stack.length = 0;
  if (listenerAttached && typeof document !== 'undefined') {
    document.removeEventListener('keydown', handleKeyDown);
    listenerAttached = false;
  }
}
