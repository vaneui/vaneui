/** Show focus-visible outline - adds visible focus indicator for keyboard navigation */
export const FOCUS_VISIBLE_OUTLINE = 'focusVisible' as const;
/** Hide focus-visible outline - removes focus-visible outline styling */
export const NO_FOCUS_VISIBLE_OUTLINE = 'noFocusVisible' as const;

/** All focusVisible property values */
export const FOCUS_VISIBLE_VALUES = [FOCUS_VISIBLE_OUTLINE, NO_FOCUS_VISIBLE_OUTLINE] as const;