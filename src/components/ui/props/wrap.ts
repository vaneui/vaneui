/** Allow flex items to wrap to new lines when container is too narrow */
export const FLEX_WRAP = 'flexWrap' as const;
/** Force flex items to stay on single line (may overflow) */
export const FLEX_NO_WRAP = 'flexNoWrap' as const;
/** Wrap flex items in reverse order (last items wrap first) */
export const FLEX_WRAP_REVERSE = 'flexWrapReverse' as const;

/** All wrap property values */
export const WRAP_VALUES = [FLEX_WRAP, FLEX_NO_WRAP, FLEX_WRAP_REVERSE] as const;