import { pxMap, pyMap, gapMap, roundedMap } from "../classes/badgeClasses";
import { TypographyTheme } from "./typography/typographyTheme";
import { textSizeClasses } from "../classes/typographyClasses";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { TextTheme } from "./size/textTheme";
import { GapSizeTheme } from "./size/gapSizeTheme";
import { VariantAppearanceTheme } from "./appearance/variantAppearanceTheme";
import { RadiusLayoutTheme } from "./layout/radiusLayoutTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { BadgeProps } from "../props/props";

export const defaultBadgeTheme = new ComponentTheme<BadgeProps>(
  "span",
  "w-fit h-fit inline-flex items-center transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme(pxMap),
      py: new PyTheme(pyMap),
      text: new TextTheme(textSizeClasses),
      gap: new GapSizeTheme(gapMap),
    },
    appearance: VariantAppearanceTheme.createDefault(),
    typography: TypographyTheme.createDefaultTypographyTheme(),
    radius: RadiusLayoutTheme.createBaseLayoutTheme(roundedMap),
  },
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
