import { getDescendantOverlays } from './overlayStack';

// Escape closes the TOPMOST overlay. "Topmost" follows the overlay tree, not the
// push order: React runs child effects before parent effects, so a popup opened
// inside a modal pushes its handler BEFORE the modal's — firing by push order
// alone would close the modal instead of the inner popup. We instead fire the
// most-recently-registered handler whose overlay has no open descendant overlay
// that also has a handler.
type EscapeHandler = () => void;
interface EscapeEntry {
  handler: EscapeHandler;
  el: HTMLElement | null;
}

const stack: EscapeEntry[] = [];
let listenerAttached = false;

function handleKeyDown(event: KeyboardEvent) {
  if (event.key !== 'Escape' || stack.length === 0) return;
  event.preventDefault();

  const activeEls = new Set(stack.map((s) => s.el).filter((el): el is HTMLElement => el != null));
  const hasActiveDescendant = (el: HTMLElement | null) =>
    el ? getDescendantOverlays(el).some((d) => activeEls.has(d)) : false;

  let chosen: EscapeEntry | undefined;
  for (let i = stack.length - 1; i >= 0; i--) {
    if (!hasActiveDescendant(stack[i].el)) {
      chosen = stack[i];
      break;
    }
  }
  (chosen ?? stack[stack.length - 1]).handler();
}

export function pushEscapeHandler(handler: EscapeHandler, el: HTMLElement | null = null): () => void {
  if (!listenerAttached && typeof document !== 'undefined') {
    document.addEventListener('keydown', handleKeyDown);
    listenerAttached = true;
  }
  stack.push({ handler, el });
  return () => {
    const idx = stack.findIndex((e) => e.handler === handler);
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
