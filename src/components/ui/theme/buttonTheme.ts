import { gapMap, pxMap, pyMap, textSizeMap } from "../classes/buttonClasses";
import { TypographyThemeClass } from "./typographyThemeClass";
import { StyleVariantComponentTheme } from "./componentTheme";
import { SizeTheme } from "./sizeThemeClass";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { roundedMap } from "../classes/buttonClasses";
import { textSizeClasses } from "../classes/typographyClasses";
import { StyleAppearanceTheme } from "./appearance/styleAppearanceTheme";

// Button-specific theme type
export type ButtonTheme = StyleVariantComponentTheme;

// Default button theme
export const defaultButtonTheme: ButtonTheme = new StyleVariantComponentTheme(
  // Button-specific base classes
  "w-fit h-fit cursor-pointer inline-flex items-center justify-center transition-all duration-200 whitespace-nowrap",

  // Size theme
  new SizeTheme(
    pxMap,
    pyMap,
    textSizeClasses,
    gapMap
  ),

  // Style theme
  new StyleAppearanceTheme(StyleAppearanceTheme.makeStyleVariants(AppearanceTheme.createAppearanceTheme)),

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
