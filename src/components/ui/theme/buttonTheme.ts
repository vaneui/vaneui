import { gapMap, pxMap, pyMap, textSizeMap } from "../classes/buttonClasses";
import { TypographyThemeClass } from "./typographyThemeClass";
import { makeSizeVariant } from "./sizeTheme";
import { StyleVariantComponentThemeClass } from "./componentThemeClass";
import { SizeTheme } from "./sizeThemeClass";
import { StyleVariantAppearanceTheme, VariantAppearanceTheme } from "./appearanceThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { roundedMap } from "../classes/buttonClasses";

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
  new StyleVariantAppearanceTheme(StyleVariantAppearanceTheme.makeStyleVariants(VariantAppearanceTheme.createVariantAppearanceTheme)),

  // Typography theme
  TypographyThemeClass.createDefaultTypographyTheme(),

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
