import { pxMap, pyMap, gapMap, roundedMap } from "../classes/badgeClasses";
import { TypographyThemeClass } from "./typographyThemeClass";
import { StyleVariantComponentThemeClass } from "./componentThemeClass";
import { textSizeClasses } from "../classes/typographyClasses";
import { SizeTheme } from "./sizeThemeClass";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";
import { StyleAppearanceTheme } from "./appearance/styleAppearanceTheme";

// Badge-specific theme type
export type BadgeTheme = StyleVariantComponentThemeClass;

// Default badge theme
export const defaultBadgeTheme: BadgeTheme = new StyleVariantComponentThemeClass(
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
  new StyleAppearanceTheme(StyleAppearanceTheme.makeStyleVariants(AppearanceTheme.createVariantAppearanceTheme)),

  // Typography theme
  TypographyThemeClass.createDefaultTypographyTheme(),

  // Layout theme
  (() => {
    const baseLayout = BaseLayoutThemeClass.createBaseLayoutTheme();
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
