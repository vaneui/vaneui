/* Static markers identifying Modal's sub-components from an element type without rendering it (compound-vs-convenience mode, close-button exclusion); a marker prop survives memo() wrappers where reference equality wouldn't. */
export type ModalPart = 'header' | 'body' | 'footer' | 'closeButton';

// Symbol.for: a registry symbol survives duplicate copies of the library in
// one bundle, where per-module symbols (like reference equality) would not.
const MODAL_PART = Symbol.for('vaneui.modal.part');

/** Tags a component as a Modal structural part. */
export function markModalPart(component: object, part: ModalPart): void {
  (component as Record<symbol, unknown>)[MODAL_PART] = part;
}

function readPart(type: unknown): ModalPart | undefined {
  if (typeof type !== 'function' && (typeof type !== 'object' || type === null)) return undefined;
  return (type as Record<symbol, unknown>)[MODAL_PART] as ModalPart | undefined;
}

/** Resolves the Modal part kind of a React element type, if any. */
export function getModalPart(type: unknown): ModalPart | undefined {
  return readPart(type) ?? readPart((type as { type?: unknown } | null | undefined)?.type);
}
