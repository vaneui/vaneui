import { pxMap, pyMap, gapMap, roundedMap } from "../classes/badgeClasses";
import { TypographyTheme } from "./typography/typographyTheme";
import { textSizeClasses } from "../classes/typographyClasses";
import { SizeTheme } from "./size/sizeTheme";
import { VariantAppearanceTheme } from "./appearance/variantAppearanceTheme";
import { StyleVariantComponentTheme } from "./common/styleVariantComponentTheme";
import { RadiusLayoutTheme } from "./layout/radiusLayoutTheme";
import { BadgeProps, TypographyComponentProps } from "../props/props";

export const defaultBadgeTheme: StyleVariantComponentTheme<BadgeProps> = StyleVariantComponentTheme.createStyleVariantComponentTheme<BadgeProps>(
  "span",
  "w-fit h-fit inline-flex items-center transition-all duration-200 whitespace-nowrap",
  new SizeTheme(
    pxMap,
    pyMap,
    textSizeClasses,
    gapMap
  ),
  VariantAppearanceTheme.createDefault(),
  TypographyTheme.createDefaultTypographyTheme(),
  RadiusLayoutTheme.createBaseLayoutTheme(roundedMap),
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
