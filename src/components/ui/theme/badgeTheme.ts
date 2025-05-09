import { pxMap, pyMap, gapMap, roundedMap } from "../classes/badgeClasses";
import { TypographyComponentProps, ButtonStyleProps, ShapeProps, NoShadowProps } from "../props/props";
import {
  VariantAppearance,
  createVariantAppearance,
  makeStyleVariants,
  defaultTypographyTheme,
  makeSizeVariant
} from "./componentTheme";
import { StyleVariantComponentThemeClass } from "./componentThemeClass";
import { textSizeClasses } from "../classes/typographyClasses";
import { SizeTheme } from "./sizeThemeClass";
import { StyleVariantAppearanceTheme, VariantAppearanceTheme } from "./appearanceThemeClass";
import { BaseLayoutThemeClass } from "./baseLayoutThemeClass";

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
  new StyleVariantAppearanceTheme(convertStyleVariants(makeStyleVariants(createVariantAppearance))),

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
