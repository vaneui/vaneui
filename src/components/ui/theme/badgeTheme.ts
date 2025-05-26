import { pxMap, pyMap, gapMap, roundedMap } from "../classes/badgeClasses";
import { filledTextAppearanceClasses, textAppearanceClasses, textSizeClasses } from "../classes/typographyClasses";
import { ComponentTheme } from "./common/ComponentTheme";
import { BadgeProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { ShadowTheme } from "./layout/shadowTheme";
import { RingTheme } from "./layout/ringTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { VariantTheme } from "./appearance/variantTheme";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses, borderAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses, filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses, filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses, ringAppearanceClasses
} from "../classes/appearanceClasses";

export const defaultBadgeTheme = new ComponentTheme<BadgeProps>(
  "span",
  "w-fit h-fit inline-flex transition-all duration-200 whitespace-nowrap",
  {
    size: {
      px: new PxTheme(pxMap),
      py: new PyTheme(pyMap),
      text: new SizeTheme(textSizeClasses),
      gap: new GapTheme(gapMap),
      shadow: new ShadowTheme(),
    },
    appearance: {
      background: VariantTheme.createDefault({
        outline: AppearanceTheme.createDefaultStyle({
          base: backgroundAppearanceClasses,
          hover: hoverBackgroundAppearanceClasses,
          active: activeBackgroundAppearanceClasses
        }),
        filled: AppearanceTheme.createDefaultStyle({
          base: filledBackgroundAppearanceClasses,
          hover: filledHoverBackgroundAppearanceClasses,
          active: filledActiveBackgroundAppearanceClasses
        })
      }),
      text: VariantTheme.createDefault({
        outline: AppearanceTheme.createDefaultStyle({base: textAppearanceClasses}),
        filled: AppearanceTheme.createDefaultStyle({base: filledTextAppearanceClasses})
      }),
      border: VariantTheme.createDefault({
        outline: AppearanceTheme.createDefaultStyle({base: borderAppearanceClasses}),
        filled: AppearanceTheme.createDefaultStyle({base: filledBorderAppearanceClasses})
      }),
      ring: VariantTheme.createDefault({
        outline: AppearanceTheme.createDefaultStyle({base: ringAppearanceClasses}),
        filled: AppearanceTheme.createDefaultStyle({base: filledRingAppearanceClasses})
      }),
    },
    layout: {
      border: new BorderTheme(),
      ring: new RingTheme(),
      radius: new RadiusTheme(roundedMap),
    },
  },
  {
    md: true,
    outline: true,
    secondary: true,
    pill: true,
    sans: true,
    semibold: true,
    uppercase: true,
    noShadow: true,
    itemsCenter: true,
  }
);
