import {
  LAYOUT_CORE,
  VISUAL_CORE,
  VISUAL_DECORATION_LAYOUT,
  VARIANT,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Blur effect property for backdrop blur */
const BLUR = ['blur'] as const;
/** Pointer events property for controlling element interactivity */
const POINTER_EVENTS = ['pointerEvents'] as const;

/** Categories for overlay backdrop components */
export const OVERLAY_CATEGORIES = [
  ...LAYOUT_CORE,
  ...VISUAL_CORE,
  ...VISUAL_DECORATION_LAYOUT,
  ...VARIANT,
  ...BLUR,
  ...POINTER_EVENTS,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;
