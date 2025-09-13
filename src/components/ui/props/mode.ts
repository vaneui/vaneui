/** Base state - default resting appearance */
export const BASE = 'base' as const;
/** Hover state - appearance when cursor hovers over element */
export const HOVER = 'hover' as const;
/** Active state - appearance when element is being pressed/clicked */
export const ACTIVE = 'active' as const;
/** Focus state - appearance when element receives focus */
export const FOCUS = 'focus' as const;
/** Focus visible state - appearance when element has visible focus indicator */
export const FOCUS_VISIBLE = 'focusVisible' as const;

/** All mode property values */
export const MODE_VALUES = [BASE, HOVER, ACTIVE, FOCUS, FOCUS_VISIBLE] as const;

/** Styling mode keys for different interaction states */
export const ModeKeys = {
  /** Interaction states for styling: base, hover, active, focus, focusVisible */
  mode: MODE_VALUES,
} as const;

/** Type for mode keys */
export type ModeKey = typeof ModeKeys.mode[number];

/** Type for all mode category keys */
export type ModeCategoryKey = keyof typeof ModeKeys;