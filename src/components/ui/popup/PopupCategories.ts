import {
  TYPOGRAPHY_FULL,
  LAYOUT_FULL,
  ALIGN_SELF,
  JUSTIFY_SELF,
  VISUAL_LAYOUT,
  PADDING,
  SHAPE,
  VARIANT,
  TRANSITION,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
  PLACEMENT,
  MIN_WIDTH,
  MAX_HEIGHT,
} from "../props/categoryBuilders";

/** Pointer events property for controlling element interactivity */
const POINTER_EVENTS = ['pointerEvents'] as const;
/** Categories for popup floating components (dropdowns, menus, tooltips).
 *  Includes alignSelf/justifySelf so the popup can pin itself within the CSS
 *  anchor-positioning grid (see Popup.tsx placement handling). */
export const POPUP_CATEGORIES = [...TYPOGRAPHY_FULL, ...LAYOUT_FULL, ...ALIGN_SELF, ...JUSTIFY_SELF, ...VISUAL_LAYOUT, ...PADDING, ...SHAPE, ...VARIANT, ...TRANSITION, ...WIDTH, ...HEIGHT, ...COMMON_MODIFIERS, ...PLACEMENT, ...POINTER_EVENTS, ...MIN_WIDTH, ...MAX_HEIGHT] as const;
