import {
  VISUAL_FULL,
  PADDING,
  VARIANT,
  CURSOR,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Categories for ModalCloseButton theme defaults */
export const MODAL_CLOSE_BUTTON_CATEGORIES = [
  'size',
  ...VISUAL_FULL,
  ...PADDING,
  ...VARIANT,
  ...CURSOR,
  ...COMMON_MODIFIERS,
] as const;
