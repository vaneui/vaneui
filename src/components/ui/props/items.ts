/** Align items to the start of the cross axis */
export const ITEMS_START = 'itemsStart' as const;
/** Align items to the end of the cross axis */
export const ITEMS_END = 'itemsEnd' as const;
/** Center items along the cross axis */
export const ITEMS_CENTER = 'itemsCenter' as const;
/** Align items along their baseline */
export const ITEMS_BASELINE = 'itemsBaseline' as const;
/** Stretch items to fill the cross axis */
export const ITEMS_STRETCH = 'itemsStretch' as const;

/** All items property values */
export const ITEMS_VALUES = [ITEMS_START, ITEMS_END, ITEMS_CENTER, ITEMS_BASELINE, ITEMS_STRETCH] as const;