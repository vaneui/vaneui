import { BaseLayoutTheme, createBaseLayoutTheme } from "./baseLayoutTheme";
import { SizeKey } from "../props/propKeys";

export type ChipLayoutTheme = BaseLayoutTheme & {
  radius?: Record<SizeKey, string>;
};

// Chip-specific rounded classes
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-sm',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
};

export const createChipLayoutTheme = (): ChipLayoutTheme => {
  const baseTheme = createBaseLayoutTheme();

  return {
    ...baseTheme,
    radius: roundedMap
  };
};