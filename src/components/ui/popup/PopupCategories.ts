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

/** Pointer events property for controlling element interactivity */
const POINTER_EVENTS = ['pointerEvents'] as const;
/** Categories for popup floating components (dropdowns, menus, tooltips) */
export const POPUP_CATEGORIES = [...TYPOGRAPHY_FULL, ...LAYOUT_FULL, ...VISUAL_LAYOUT, ...PADDING, ...SHAPE, ...VARIANT, ...TRANSITION, ...WIDTH, ...HEIGHT, ...COMMON_MODIFIERS, ...PLACEMENT, ...POINTER_EVENTS] as const;
