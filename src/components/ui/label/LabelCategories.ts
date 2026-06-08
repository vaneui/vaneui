import {
  TYPOGRAPHY_FULL,
  LAYOUT_FULL,
  VISUAL_CORE,
  BORDER,
  VISUAL_DECORATION_LAYOUT,
  VARIANT,
  CURSOR,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

const LABEL_CATEGORIES_RAW = [
  ...TYPOGRAPHY_FULL,
  ...LAYOUT_FULL,
  ...VISUAL_CORE,
  ...BORDER,
  ...VISUAL_DECORATION_LAYOUT,
  ...VARIANT,
  ...CURSOR,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;

/**
 * Categories for label form components with typography support.
 *
 * Excludes `transparent`: Label has no `bgAppearance` mapper (it never paints a
 * background, see `defaultLabelTheme.ts`), so `transparent` has no meaning here
 * and is filtered out so it can't be passed as an inert prop. Matches MenuLabel.
 */
export const LABEL_CATEGORIES =
  LABEL_CATEGORIES_RAW.filter(c => c !== 'transparent') as readonly Exclude<typeof LABEL_CATEGORIES_RAW[number], 'transparent'>[];
