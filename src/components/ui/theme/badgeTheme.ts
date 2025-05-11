import { pxMap, pyMap, gapMap, roundedMap } from "../classes/badgeClasses";
import { TypographyComponentProps, ButtonStyleProps, ShapeProps, NoShadowProps } from "../props/props";
import { defaultTypographyTheme } from "./typographyThemeClass";
import { makeSizeVariant } from "./sizeTheme";
import { StyleVariantComponentThemeClass } from "./componentThemeClass";
import { textSizeClasses } from "../classes/typographyClasses";
import { SizeTheme } from "./sizeThemeClass";
import { StyleVariantAppearanceTheme, VariantAppearanceTheme } from "./appearanceThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";

// Badge-specific theme type
export type BadgeTheme = StyleVariantComponentThemeClass;

// Default badge theme
export const defaultBadgeTheme: BadgeTheme = new StyleVariantComponentThemeClass(
  // Badge-specific base classes
  "w-fit h-fit inline-flex items-center transition-all duration-200 whitespace-nowrap",

  // Size theme
  new SizeTheme(
    makeSizeVariant(pxMap),
    makeSizeVariant(pyMap),
    makeSizeVariant(textSizeClasses),
    makeSizeVariant(gapMap)
  ),

  // Style theme
  new StyleVariantAppearanceTheme(StyleVariantAppearanceTheme.makeStyleVariants(VariantAppearanceTheme.createVariantAppearanceTheme)),

  // Typography theme
  defaultTypographyTheme,

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
