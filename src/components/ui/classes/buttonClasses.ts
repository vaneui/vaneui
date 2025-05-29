import { SizeKey } from "../props/keys";

/**
 * Maps for size-related classes
 */
export const pxMap: Record<SizeKey, string> = {
  xs: 'px-2',
  sm: 'px-2.5',
  md: 'px-3.5',
  lg: 'px-5',
  xl: 'px-6',
};

export const pyMap: Record<SizeKey, string> = {
  xs: 'py-1',
  sm: 'py-1.5',
  md: 'py-2',
  lg: 'py-3',
  xl: 'py-4',
};

export const textSizeMap: Record<SizeKey, string> = {
  xs: 'text-xs/5',
  sm: 'text-sm/5',
  md: 'text-base',
  lg: 'text-lg/6',
  xl: 'text-xl/6',
};

export const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-sm',
  sm: 'rounded-md',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
};

export const gapMap: Record<SizeKey, string> = {
  xs: 'gap-1.5',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-5',
};
