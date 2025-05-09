import { SizeKey } from "../props/propKeys";
import { TypographyComponentProps, ButtonStyleProps, ShapeProps, NoShadowProps } from "../props/props";
import {
  VariantAppearance,
  createVariantAppearance,
  makeStyleVariants,
  defaultTypographyTheme,
  makeSizeVariant
} from "./componentTheme";
import { StyleVariantComponentThemeClass } from "./componentThemeClass";
import { SizeTheme } from "./sizeThemeClass";
import { StyleVariantAppearanceTheme, VariantAppearanceTheme } from "./appearanceThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";

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

// Helper function to convert VariantAppearance to VariantAppearanceTheme
function convertToVariantAppearanceTheme(variant: VariantAppearance): VariantAppearanceTheme {
  return new VariantAppearanceTheme(
    variant.background,
    variant.textColor,
    variant.borderColor,
    variant.ringColor
  );
}

// Helper function to convert makeStyleVariants result to StyleVariantAppearanceTheme input
function convertStyleVariants(
  styleVariants: Record<string, Record<string, VariantAppearance>>
): Partial<Record<string, Partial<Record<string, VariantAppearanceTheme>>>> {
  const result: Partial<Record<string, Partial<Record<string, VariantAppearanceTheme>>>> = {};

  for (const style in styleVariants) {
    result[style] = {};
    for (const appearance in styleVariants[style]) {
      result[style]![appearance] = convertToVariantAppearanceTheme(styleVariants[style][appearance]);
    }
  }

  return result;
}

// Chip-specific theme type
export type ChipTheme = StyleVariantComponentThemeClass;

// Default chip theme
export const defaultChipTheme: ChipTheme = new StyleVariantComponentThemeClass(
  // Chip-specific base classes
  "w-fit h-fit inline-flex gap-2 items-center transition-all duration-200 whitespace-nowrap",

  // Size theme
  new SizeTheme(
    makeSizeVariant(pxMap),
    makeSizeVariant(pyMap),
    makeSizeVariant(textSizeMap),
    makeSizeVariant(gapMap)
  ),

  // Style theme
  new StyleVariantAppearanceTheme(convertStyleVariants(makeStyleVariants(createVariantAppearance))),

  // Typography theme
  defaultTypographyTheme,

  // Layout theme
  (() => {
    const baseLayout = BaseLayoutThemeClass.createBaseLayoutTheme();
    baseLayout.radius = roundedMap;
    return baseLayout;
  })(),

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
