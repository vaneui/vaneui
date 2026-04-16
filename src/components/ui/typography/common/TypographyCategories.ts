import {
  TYPOGRAPHY_FULL,
  LAYOUT_CORE,
  VISUAL_CORE,
  VARIANT,
  WIDTH,
  HEIGHT,
  RESPONSIVE,
  COMMON_MODIFIERS,
  LIST_STYLE,
  PADDING,
  INHERIT_SIZE,
  INHERIT_COLOR,
  INHERIT_BG,
} from "../../props/categoryBuilders";

/** Cursor appearance property */
const CURSOR = ['cursor'] as const;
/** Letter spacing property for text tracking */
const LETTER_SPACING = ['letterSpacing'] as const;

/**
 * Categories for typography components like Text, Title, Link.
 *
 * Intentionally uses `RESPONSIVE` instead of the broader `COMMON_MODIFIERS`
 * (which would also pull in `transparent`). Typography components are
 * background-less by design — see `typographyClassMappers.ts` and
 * `defaultLinkTheme.ts` — so the `transparent` prop has no meaning here.
 */
export const TYPOGRAPHY_CATEGORIES = [
  ...TYPOGRAPHY_FULL,
  ...LAYOUT_CORE,
  ...VISUAL_CORE,
  ...VARIANT,
  ...CURSOR,
  ...LETTER_SPACING,
  ...WIDTH,
  ...HEIGHT,
  ...RESPONSIVE,
  ...INHERIT_SIZE,
  ...INHERIT_COLOR,
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
  ...INHERIT_SIZE,
  ...INHERIT_COLOR,
  ...INHERIT_BG,
] as const;
