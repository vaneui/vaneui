import { LAYOUT_CORE, VISUAL_CORE, VARIANT, MARGIN, FONT_FAMILY } from "../props/categoryBuilders";

/** Categories for the Breadcrumb root (`<nav>`): its size and appearance reach the trail */
export const BREADCRUMB_CATEGORIES = [
  ...LAYOUT_CORE,
  ...VISUAL_CORE,
  ...VARIANT,
  ...MARGIN,
  ...FONT_FAMILY,
  'fontWeight',
] as const;

/** Categories for the trail list (`<ol>`) */
export const BREADCRUMB_LIST_CATEGORIES = ['display', 'items', 'justify', 'wrap', 'gap'] as const;

/** Categories for a trail item's link or current-page text */
export const BREADCRUMB_ITEM_CATEGORIES = ['fontWeight', 'focusVisible', 'transition', 'whitespace', 'cursor'] as const;

/** Categories for the separator between items */
export const BREADCRUMB_SEPARATOR_CATEGORIES = ['display', 'items', 'shrink'] as const;
