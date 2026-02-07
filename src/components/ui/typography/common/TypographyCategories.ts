import {
  TYPOGRAPHY_FULL,
  LAYOUT_CORE,
  VISUAL_CORE,
  VARIANT,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
  LIST_STYLE,
  PADDING,
} from "../../props/categoryBuilders";

/** Cursor appearance property */
const CURSOR = ['cursor'] as const;
/** Letter spacing property for text tracking */
const LETTER_SPACING = ['letterSpacing'] as const;

/** Categories for typography components like Text, Title, Link */
export const TYPOGRAPHY_CATEGORIES = [
  ...TYPOGRAPHY_FULL,
  ...LAYOUT_CORE,
  ...VISUAL_CORE,
  ...VARIANT,
  ...CURSOR,
  ...LETTER_SPACING,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;

/** Categories for list components with typography and list-specific styling */
export const LIST_CATEGORIES = [
  ...TYPOGRAPHY_FULL,
  ...LIST_STYLE,
  ...LAYOUT_CORE,
  ...VISUAL_CORE,
  ...PADDING,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;
