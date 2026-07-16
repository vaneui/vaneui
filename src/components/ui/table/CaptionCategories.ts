import { VISUAL_CORE, VARIANT, TEXT_ALIGN, RESPONSIVE } from "../props/categoryBuilders";

/** Categories for the Caption (`<caption>`) element. */
export const CAPTION_CATEGORIES = [
  'size',
  ...VISUAL_CORE,
  ...VARIANT,
  ...TEXT_ALIGN,
  ...RESPONSIVE,
] as const;
