/** Base state - default resting appearance */
export const BASE = 'base' as const;
/** Hover state - appearance when cursor hovers over element */
export const HOVER = 'hover' as const;
/** Active state - appearance when element is being pressed/clicked */
export const ACTIVE = 'active' as const;

/** All mode property values */
export const MODE_VALUES = [BASE, HOVER, ACTIVE] as const;