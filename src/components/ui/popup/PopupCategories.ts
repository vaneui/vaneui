import {
  TYPOGRAPHY_FULL,
  LAYOUT_FULL,
  VISUAL_LAYOUT,
  PADDING,
  SHAPE,
  VARIANT,
  TRANSITION,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
  PLACEMENT,
} from "../props/categoryBuilders";

/** Categories for popup floating components (dropdowns, menus, tooltips) */
export const POPUP_CATEGORIES = [...TYPOGRAPHY_FULL, ...LAYOUT_FULL, ...VISUAL_LAYOUT, ...PADDING, ...SHAPE, ...VARIANT, ...TRANSITION, ...WIDTH, ...HEIGHT, ...COMMON_MODIFIERS, ...PLACEMENT] as const;
