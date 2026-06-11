/**
 * Static markers that identify Modal's structural sub-components
 * (ModalHeader / ModalBody / ModalFooter / ModalCloseButton) from a React
 * element type WITHOUT rendering it. Modal uses them to decide compound vs
 * convenience mode; ModalHeader uses them to keep the close button out of
 * the dialog's accessible name. A marker property (instead of reference
 * equality) keeps identification working for memo()-style wrappers, where
 * the original component stays reachable via the wrapper's `type` field.
 * A consumer component that merely RENDERS a sub-component cannot be
 * identified without rendering it — such children take the non-marked path.
 */
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
