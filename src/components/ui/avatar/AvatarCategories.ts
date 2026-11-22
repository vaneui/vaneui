import { LAYOUT_CORE, VISUAL_CORE, VARIANT, BORDER, SHAPE, MARGIN } from "../props/categoryBuilders";

/** Categories for the Avatar: a fixed-size picture of a person or thing (image, initials or icon) */
export const AVATAR_CATEGORIES = [
  ...LAYOUT_CORE,
  'shrink',
  ...VISUAL_CORE,
  ...VARIANT,
  ...BORDER,
  'ring',
  ...SHAPE,
  'fontWeight',
  ...MARGIN,
] as const;
