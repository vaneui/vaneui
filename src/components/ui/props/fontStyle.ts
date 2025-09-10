/** Italic font style - slanted text styling */
export const ITALIC = 'italic' as const;
/** Normal font style - upright text styling (not italic) */
export const NOT_ITALIC = 'notItalic' as const;

/** All font style property values */
export const FONT_STYLE_VALUES = [ITALIC, NOT_ITALIC] as const;