import { gapMap, pxMap, pyMap, textSizeMap } from "../classes/buttonClasses";
import { TypographyTheme } from "./typography/typographyTheme";
import { SizeTheme } from "./size/sizeTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { BaseLayoutTheme } from "./layout/baseLayoutTheme";
import { roundedMap } from "../classes/buttonClasses";
import { textSizeClasses } from "../classes/typographyClasses";
import { StyleAppearanceTheme } from "./appearance/styleAppearanceTheme";
import { StyleVariantComponentTheme } from "./common/styleVariantComponentTheme";
import { RadiusLayoutTheme } from "./layout/radiusLayoutTheme";

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
  StyleAppearanceTheme.createDefault(),

  // Typography theme
  TypographyTheme.createDefaultTypographyTheme(),

  RadiusLayoutTheme.createBaseLayoutTheme(roundedMap),

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
