/** Base state - default appearance */
export const BASE = 'base' as const;
/** Hover state - when cursor is over element */
export const HOVER = 'hover' as const;
/** Active state - when element is being clicked/pressed */
export const ACTIVE = 'active' as const;

/** All mode property values */
export const MODE_VALUES = [BASE, HOVER, ACTIVE] as const;