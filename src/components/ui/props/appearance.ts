/** Default neutral appearance */
export const DEFAULT = 'default' as const;
/** Accent/brand secondary color */
export const ACCENT = 'accent' as const;
/** Primary brand color */
export const PRIMARY = 'primary' as const;
/** Secondary muted color */
export const SECONDARY = 'secondary' as const;
/** Tertiary subtle color */
export const TERTIARY = 'tertiary' as const;
/** Success/positive state color (green) */
export const SUCCESS = 'success' as const;
/** Danger/error state color (red) */
export const DANGER = 'danger' as const;
/** Warning state color (yellow/amber) */
export const WARNING = 'warning' as const;
/** Info state color (blue/cyan) */
export const INFO = 'info' as const;
/** Link/hyperlink color (blue) */
export const LINK = 'link' as const;

/** All appearance property values */
export const APPEARANCE_VALUES = [DEFAULT, ACCENT, PRIMARY, SECONDARY, TERTIARY, SUCCESS, DANGER, WARNING, INFO, LINK] as const;