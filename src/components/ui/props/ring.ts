/** Show ring - adds decorative ring/outline border around element */
export const RING = 'ring' as const;
/** Hide ring - removes ring/outline border styling */
export const NO_RING = 'noRing' as const;

/** All ring property values */
export const RING_VALUES = [RING, NO_RING] as const;