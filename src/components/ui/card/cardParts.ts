/* Static marker identifying Card's structural parts (CardHeader, CardBody, CardFooter) from an element type without rendering it; a marker survives memo() wrappers where reference equality would not. */

// Symbol.for: a registry symbol survives duplicate copies of the library in
// one bundle, where per-module symbols (like reference equality) would not.
const CARD_PART = Symbol.for('vaneui.card.part');

/** Tags a component as a Card structural part. */
export function markCardPart(component: object): void {
  (component as Record<symbol, unknown>)[CARD_PART] = true;
}

function hasMarker(type: unknown): boolean {
  if (typeof type !== 'function' && (typeof type !== 'object' || type === null)) return false;
  return (type as Record<symbol, unknown>)[CARD_PART] === true;
}

/** Whether a React element type is a Card structural part (directly or through a memo() wrapper). */
export function isCardPart(type: unknown): boolean {
  return hasMarker(type) || hasMarker((type as { type?: unknown } | null | undefined)?.type);
}
