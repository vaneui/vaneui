import { SizeKey } from "../props";

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

export const sectionAspectRatioClasses: Record<SizeKey, string> = {
  xs: "[--aspect-ratio:2.5]",
  sm: "[--aspect-ratio:2]",
  md: "[--aspect-ratio:1.75]",
  lg: "[--aspect-ratio:1.6]",
  xl: "[--aspect-ratio:1.5]",
};

// UI component classes
export const uiPaddingClasses: Record<SizeKey, string> = {
  xs: "[--py-unit:1]",
  sm: "[--py-unit:1.5]", 
  md: "[--py-unit:2]",
  lg: "[--py-unit:2.5]",
  xl: "[--py-unit:3]",
};

// Button-specific aspect ratios (px-2,3,4,5,6 vs py-1,1.5,2,2.5,3)
export const buttonAspectRatioClasses: Record<SizeKey, string> = {
  xs: "[--aspect-ratio:2]",    // px-2 vs py-1 = 2
  sm: "[--aspect-ratio:2]",    // px-3 vs py-1.5 = 2
  md: "[--aspect-ratio:2]",    // px-4 vs py-2 = 2
  lg: "[--aspect-ratio:2]",    // px-5 vs py-2.5 = 2
  xl: "[--aspect-ratio:2]",    // px-6 vs py-3 = 2
};

// Badge aspect ratios (same as button)
export const badgeAspectRatioClasses: Record<SizeKey, string> = {
  xs: "[--aspect-ratio:2]",
  sm: "[--aspect-ratio:2]", 
  md: "[--aspect-ratio:2]",
  lg: "[--aspect-ratio:2]",
  xl: "[--aspect-ratio:2]",
};

// Input aspect ratios (same as button)
export const inputAspectRatioClasses: Record<SizeKey, string> = {
  xs: "[--aspect-ratio:2]",
  sm: "[--aspect-ratio:2]",
  md: "[--aspect-ratio:2]",
  lg: "[--aspect-ratio:2]",
  xl: "[--aspect-ratio:2]",
};

// Code-specific classes (px-1,1.5,1.5,2,2 vs py-0,0.5,1,1,1)
export const codeAspectRatioClasses: Record<SizeKey, string> = {
  xs: "[--aspect-ratio:1]",    // px-1 vs py-0 (but py-0 is 0, so use py-unit but ratio for px)
  sm: "[--aspect-ratio:3]",    // px-1.5 vs py-0.5 = 3  
  md: "[--aspect-ratio:1.5]",  // px-1.5 vs py-1 = 1.5
  lg: "[--aspect-ratio:2]",    // px-2 vs py-1 = 2
  xl: "[--aspect-ratio:2]",    // px-2 vs py-1 = 2
};

export const codePyClasses: Record<SizeKey, string> = {
  xs: "[--py-unit:0]",
  sm: "[--py-unit:0.5]",
  md: "[--py-unit:1]", 
  lg: "[--py-unit:1]",
  xl: "[--py-unit:1]",
};

// Chip-specific classes (px-2,2.5,3,3.5,4 vs py-0.5,1,1.5,2,2.5)
export const chipAspectRatioClasses: Record<SizeKey, string> = {
  xs: "[--aspect-ratio:4]",    // px-2 vs py-0.5 = 4
  sm: "[--aspect-ratio:2.5]",  // px-2.5 vs py-1 = 2.5
  md: "[--aspect-ratio:2]",    // px-3 vs py-1.5 = 2
  lg: "[--aspect-ratio:1.75]", // px-3.5 vs py-2 = 1.75
  xl: "[--aspect-ratio:1.6]",  // px-4 vs py-2.5 = 1.6
};

export const chipPyClasses: Record<SizeKey, string> = {
  xs: "[--py-unit:0.5]",
  sm: "[--py-unit:1]",
  md: "[--py-unit:1.5]",
  lg: "[--py-unit:2]",
  xl: "[--py-unit:2.5]",
};
