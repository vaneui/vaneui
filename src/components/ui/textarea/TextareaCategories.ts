import { INPUT_CATEGORIES } from "../input/InputCategories";
import { RESIZE, AUTOSIZE } from "../props/categoryBuilders";

/** Categories for the Textarea: the input's, plus the resize handle and autosize */
export const TEXTAREA_CATEGORIES = [
  ...INPUT_CATEGORIES,
  ...RESIZE,
  ...AUTOSIZE,
] as const;
