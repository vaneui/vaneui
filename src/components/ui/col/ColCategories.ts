import {
  LAYOUT_FULL,
  PADDING,
  VISUAL_LAYOUT,
  VARIANT,
  BREAKPOINT,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
  TEXT_ALIGN,
} from "../props/categoryBuilders";

/** Categories for column layout components. Adds `focusVisible` so Col can
 * render a keyboard focus ring when href turns the tag into <a>. */
export const COL_CATEGORIES = [
  ...LAYOUT_FULL,
  ...PADDING,
  ...VISUAL_LAYOUT,
  ...VARIANT,
  ...BREAKPOINT,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
  ...TEXT_ALIGN,
  'focusVisible',
] as const;
