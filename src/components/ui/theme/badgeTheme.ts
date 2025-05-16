import { pxMap, pyMap, gapMap, roundedMap } from "../classes/badgeClasses";
import { TypographyTheme } from "./typography/typographyTheme";
import { textSizeClasses } from "../classes/typographyClasses";
import { SizeTheme } from "./size/sizeTheme";
import { StyleAppearanceTheme } from "./appearance/styleAppearanceTheme";
import { StyleVariantComponentTheme } from "./common/styleVariantComponentTheme";
import { RadiusLayoutTheme } from "./layout/radiusLayoutTheme";

// Badge-specific theme type
export type BadgeTheme = StyleVariantComponentTheme;

// Default badge theme
export const defaultBadgeTheme: StyleVariantComponentTheme = new StyleVariantComponentTheme(
  // Badge-specific base classes
  "w-fit h-fit inline-flex items-center transition-all duration-200 whitespace-nowrap",

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

  // Badge-specific defaults
  {
    md: true,
    outline: true,
    secondary: true,
    rounded: true,
    sans: true,
    semibold: true,
    uppercase: true,
    noShadow: true,
  }
);
