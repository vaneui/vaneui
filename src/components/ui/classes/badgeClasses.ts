import { SizeKey } from "../props/keys";

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
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl"
};
