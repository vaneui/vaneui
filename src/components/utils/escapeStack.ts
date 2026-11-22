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
  const entry = chosen ?? stack[stack.length - 1];
  // a layer that does not close on Escape only keeps it from the layers beneath; what the key
  // does by default (clearing a search field in the dialog) is left alone
  if (entry.handler === ignoreEscape) return;
  event.preventDefault();
  entry.handler();
}

/**
 * The handler of a layer that does not close on Escape (a Modal with closeOnEscape off, an
 * Overlay without onClose). It still joins the stack: while it is the topmost layer, Escape stops
 * there instead of closing the layer beneath it.
 */
export const ignoreEscape: EscapeHandler = () => {};

export function pushEscapeHandler(handler: EscapeHandler, el: HTMLElement | null = null): () => void {
  if (!listenerAttached && typeof document !== 'undefined') {
    document.addEventListener('keydown', handleKeyDown);
    listenerAttached = true;
  }
  // an entry of its own, so two layers that share a handler (ignoreEscape) are removed one at a time
  const entry: EscapeEntry = { handler, el };
  stack.push(entry);
  return () => {
    const idx = stack.indexOf(entry);
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
