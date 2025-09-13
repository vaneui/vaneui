/** Default neutral appearance - uses default color variables */
export const DEFAULT = 'default' as const;
/** Accent appearance - uses accent/rose color variables for brand secondary styling */
export const ACCENT = 'accent' as const;
/** Primary appearance - uses primary/blue color variables for main brand styling */
export const PRIMARY = 'primary' as const;
/** Secondary appearance - uses secondary/gray color variables for muted styling */
export const SECONDARY = 'secondary' as const;
/** Tertiary appearance - uses tertiary/gray color variables for subtle styling */
export const TERTIARY = 'tertiary' as const;
/** Success appearance - uses success/emerald color variables for positive states */
export const SUCCESS = 'success' as const;
/** Danger appearance - uses danger/red color variables for error/destructive states */
export const DANGER = 'danger' as const;
/** Warning appearance - uses warning/amber color variables for caution states */
export const WARNING = 'warning' as const;
/** Info appearance - uses info/cyan color variables for informational states */
export const INFO = 'info' as const;
/** Link appearance - uses link/blue color variables for hyperlinks and navigation */
export const LINK = 'link' as const;

/** All appearance property values */
export const APPEARANCE_VALUES = [DEFAULT, ACCENT, PRIMARY, SECONDARY, TERTIARY, SUCCESS, DANGER, WARNING, INFO, LINK] as const;