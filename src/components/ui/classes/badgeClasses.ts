import { SizeKey } from "../props/propKeys";
import { textSizeClasses } from "../classes/typographyClasses";

/**
 * Maps for badge size-related classes
 */
export const pxMap: Record<SizeKey, string> = {
  xs: "px-2",
  sm: "px-2.5",
  md: "px-3.5",
  lg: "px-5",
  xl: "px-6"
};

export const pyMap: Record<SizeKey, string> = {
  xs: "py-1",
  sm: "py-1.5",
  md: "py-2",
  lg: "py-3",
  xl: "py-4"
};

export const gapMap: Record<SizeKey, string> = {
  xs: "gap-1",
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5",
  xl: "gap-3"
};

export const roundedMap: Record<SizeKey, string> = {
  xs: "rounded",
  sm: "rounded",
  md: "rounded",
  lg: "rounded-md",
  xl: "rounded-md"
};

export const textSizeMap: Record<SizeKey, string> = {
  xs: textSizeClasses.xs,
  sm: textSizeClasses.sm,
  md: textSizeClasses.md,
  lg: textSizeClasses.lg,
  xl: textSizeClasses.xl
};