/** Relative positioning - offset from normal position */
export const RELATIVE = 'relative' as const;
/** Absolute positioning - removed from normal flow */
export const ABSOLUTE = 'absolute' as const;
/** Fixed positioning - positioned relative to viewport */
export const FIXED = 'fixed' as const;
/** Sticky positioning - toggles between relative and fixed */
export const STICKY = 'sticky' as const;
/** Static positioning - normal document flow (default) */
export const STATIC = 'static' as const;

/** All position property values */
export const POSITION_VALUES = [RELATIVE, ABSOLUTE, FIXED, STICKY, STATIC] as const;