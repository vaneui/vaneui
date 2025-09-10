/** Pill shape - fully rounded corners (rounded-full) */
export const PILL = 'pill' as const;
/** Sharp shape - no border radius (rounded-none) */
export const SHARP = 'sharp' as const;
/** Rounded shape - size-responsive border radius (varies by component size) */
export const ROUNDED = 'rounded' as const;

/** All shape property values */
export const SHAPE_VALUES = [PILL, SHARP, ROUNDED] as const;