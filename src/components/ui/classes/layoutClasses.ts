import { SizeKey } from "../props";

export const layoutGapClasses: Record<SizeKey, string> = {
  xs: "[--gap-unit:2]",
  sm: "[--gap-unit:3]",
  md: "[--gap-unit:4]",
  lg: "[--gap-unit:5]",
  xl: "[--gap-unit:6]",
};

export const layoutPaddingClasses: Record<SizeKey, string> = {
  xs: "[--h-unit:2]",
  sm: "[--h-unit:3]",
  md: "[--h-unit:4]",
  lg: "[--h-unit:5]",
  xl: "[--h-unit:6]",
};

export const sectionAspectRatioClasses: Record<SizeKey, string> = {
  xs: "[--aspect-ratio:2.5]",
  sm: "[--aspect-ratio:2]",
  md: "[--aspect-ratio:1.75]",
  lg: "[--aspect-ratio:1.6]",
  xl: "[--aspect-ratio:1.5]",
};
