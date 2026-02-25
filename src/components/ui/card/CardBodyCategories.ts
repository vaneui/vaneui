import {
  LAYOUT_FULL,
  VISUAL_LAYOUT,
  PADDING,
  VARIANT,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Categories for CardBody components */
export const CARD_BODY_CATEGORIES = [
  ...LAYOUT_FULL,
  ...VISUAL_LAYOUT,
  ...PADDING,
  ...VARIANT,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;
