import { SizeKey } from "../props";

// Reusable layout classes used by multiple components
export const layoutGapClasses: Record<SizeKey, string> = {
  xs: "[--gap-unit:2]",
  sm: "[--gap-unit:3]",
  md: "[--gap-unit:4]",
  lg: "[--gap-unit:5]",
  xl: "[--gap-unit:6]",
};

export const layoutPaddingClasses: Record<SizeKey, string> = {
  xs: "[--py-unit:2]",
  sm: "[--py-unit:3]",
  md: "[--py-unit:4]",
  lg: "[--py-unit:5]",
  xl: "[--py-unit:6]",
};

// Reusable UI component classes used by multiple components
export const uiPaddingClasses: Record<SizeKey, string> = {
  xs: "[--py-unit:1]",
  sm: "[--py-unit:1.5]", 
  md: "[--py-unit:2]",
  lg: "[--py-unit:2.5]",
  xl: "[--py-unit:3]",
};

export const uiGapClasses: Record<SizeKey, string> = {
  xs: "[--gap-unit:1]",
  sm: "[--gap-unit:1.5]",
  md: "[--gap-unit:2]",
  lg: "[--gap-unit:2.5]",
  xl: "[--gap-unit:3]",
};
