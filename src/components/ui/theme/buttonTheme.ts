import { gapMap, pxMap, pyMap, textSizeMap } from "../classes/buttonClasses";
import { ButtonProps } from "../props/props";
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
import { roundedMap } from "../classes/buttonClasses";

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

// Button-specific theme type
export type ButtonTheme = StyleVariantComponentThemeClass;

// Default button theme
export const defaultButtonTheme: ButtonTheme = new StyleVariantComponentThemeClass(
  // Button-specific base classes
  "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",

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

  // Button-specific defaults
  {
    md: true,
    outline: true,
    default: true,
    rounded: true,
    sans: true,
    semibold: true,
    textCenter: true,
    noBorder: true,
  }
);
