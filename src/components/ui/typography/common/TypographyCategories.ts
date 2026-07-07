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
  LIST_POSITION,
  GAP,
  PADDING,
  MARGIN,
  INHERIT_SIZE,
  INHERIT_COLOR,
  INHERIT_BG,
  BORDER,
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
  ...MARGIN,
  ...VARIANT,
  ...CURSOR,
  ...LETTER_SPACING,
  ...WIDTH,
  ...HEIGHT,
  ...RESPONSIVE,
  ...INHERIT_SIZE,
  ...INHERIT_COLOR,
] as const;

/**
 * Blockquote = typography categories plus the `border` category, so its
 * inline-start accent is a real, prop-driven `borderS` (toggleable via
 * `noBorder`, colored by the appearance system) rather than a hardcoded base
 * class. Paired with the per-side border mapper in defaultBlockquoteTheme.
 */
export const BLOCKQUOTE_CATEGORIES = [
  ...TYPOGRAPHY_CATEGORIES,
  ...BORDER,
] as const;

/**
 * Categories for the List component — typography plus list-specific styling
 * (marker style/position, inter-item gap, marker-indent padding) and the
 * filled/transparent background pair.
 *
 * ListItem does NOT use this array — it registers the narrower
 * `LIST_ITEM_CATEGORIES` (see `../listItem/ListItemCategories.ts`), because
 * its theme has no mappers for the List-only deltas and `ListItemProps`
 * cannot express them.
 */
export const LIST_CATEGORIES = [
  ...TYPOGRAPHY_FULL,
  ...LIST_STYLE,
  ...LIST_POSITION,
  ...GAP,
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
