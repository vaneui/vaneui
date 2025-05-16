import { SizeKey } from "../props/propKeys";
import { TypographyTheme } from "./typography/typographyTheme";
import { SizeTheme } from "./size/sizeTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { BaseLayoutTheme } from "./layout/baseLayoutTheme";
import { StyleAppearanceTheme } from "./appearance/styleAppearanceTheme";
import { StyleVariantComponentTheme } from "./common/styleVariantComponentTheme";
import { RadiusLayoutTheme } from "./layout/radiusLayoutTheme";

// Chip-specific size maps
const pxMap: Record<SizeKey, string> = {
  xs: 'px-2',
  sm: 'px-2.5',
  md: 'px-3.5',
  lg: 'px-5',
  xl: 'px-6',
};

const pyMap: Record<SizeKey, string> = {
  xs: 'py-1',
  sm: 'py-1.5',
  md: 'py-2',
  lg: 'py-3',
  xl: 'py-4',
};

const textSizeMap: Record<SizeKey, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-base',
};

const gapMap: Record<SizeKey, string> = {
  xs: 'gap-1',
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2.5',
  xl: 'gap-3',
};

// Chip-specific rounded classes
const roundedMap: Record<SizeKey, string> = {
  xs: 'rounded-sm',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
};


// Chip-specific theme type
export type ChipTheme = StyleVariantComponentTheme;

// Default chip theme
export const defaultChipTheme: ChipTheme = new StyleVariantComponentTheme(
  // Chip-specific base classes
  "w-fit h-fit inline-flex gap-2 items-center transition-all duration-200 whitespace-nowrap",

  // Size theme
  new SizeTheme(
    pxMap,
    pyMap,
    textSizeMap,
    gapMap
  ),

  // Style theme
  StyleAppearanceTheme.createDefault(),

  // Typography theme
  TypographyTheme.createDefaultTypographyTheme(),

  RadiusLayoutTheme.createBaseLayoutTheme(roundedMap),

  // Chip-specific defaults
  {
    md: true,
    outline: true,
    secondary: true,
    rounded: true,
    mono: true,
    normal: true,
    noShadow: true,
  }
);
