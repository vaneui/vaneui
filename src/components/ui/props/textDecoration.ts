/** Add underline decoration below text */
export const UNDERLINE = 'underline' as const;
/** Add strikethrough/line-through decoration across text */
export const LINE_THROUGH = 'lineThrough' as const;
/** Remove text decoration (no underline, strikethrough, etc.) */
export const NO_UNDERLINE = 'noUnderline' as const;
/** Add overline decoration above text */
export const OVERLINE = 'overline' as const;

/** All text decoration property values */
export const TEXT_DECORATION_VALUES = [UNDERLINE, LINE_THROUGH, NO_UNDERLINE, OVERLINE] as const;