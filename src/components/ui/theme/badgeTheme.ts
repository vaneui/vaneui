import { pxMap, pyMap, gapMap, roundedMap } from "../classes/badgeClasses";
import { TypographyTheme } from "./typography/typographyTheme";
import { textSizeClasses } from "../classes/typographyClasses";
import { VariantAppearanceTheme } from "./appearance/variantAppearanceTheme";
import { RadiusLayoutTheme } from "./layout/radiusLayoutTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { BadgeProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";

export const defaultBadgeTheme = new ComponentTheme<BadgeProps>(
  "span",
  "w-fit h-fit inline-flex items-center transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new SizeTheme(pxMap),
      py: new SizeTheme(pyMap),
      text: new SizeTheme(textSizeClasses),
      gap: new GapTheme(gapMap),
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
