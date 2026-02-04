import {
  LAYOUT_FULL,
  VISUAL_LAYOUT,
  PADDING,
  BREAKPOINT,
  VARIANT,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Categories for section layout components with full responsive support */
export const SECTION_CATEGORIES = [...LAYOUT_FULL, ...VISUAL_LAYOUT, ...PADDING, ...BREAKPOINT, ...VARIANT, ...COMMON_MODIFIERS] as const;
