import { pxMap, pyMap, gapMap, roundedMap } from "../classes/badgeClasses";
import { TypographyTheme } from "./typography/typographyTheme";
import { textSizeClasses } from "../classes/typographyClasses";
import { SizeTheme } from "./sizeTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { BaseLayoutTheme } from "./layout/baseLayoutTheme";
import { StyleAppearanceTheme } from "./appearance/styleAppearanceTheme";
import { StyleVariantComponentTheme } from "./common/styleVariantComponentTheme";

// Badge-specific theme type
export type BadgeTheme = StyleVariantComponentTheme;

// Default badge theme
export const defaultBadgeTheme: BadgeTheme = new StyleVariantComponentTheme(
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
  new StyleAppearanceTheme(StyleAppearanceTheme.makeStyleVariants(AppearanceTheme.createAppearanceTheme)),

  // Typography theme
  TypographyTheme.createDefaultTypographyTheme(),

  // Layout theme
  (() => {
    const baseLayout = BaseLayoutTheme.createBaseLayoutTheme();
    baseLayout.radius = roundedMap;
    return baseLayout;
  })(),

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
