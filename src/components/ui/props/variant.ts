/** Filled variant - solid background with contrasting text color */
export const FILLED = 'filled' as const;
/** Outline variant - transparent background with border and colored text (default) */
export const OUTLINE = 'outline' as const;

/** All variant property values */
export const VARIANT_VALUES = [FILLED, OUTLINE] as const;