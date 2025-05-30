import { pxMap, pyMap, gapMap, roundedMap } from "../classes/badgeClasses";
import { filledTextAppearanceClasses, textAppearanceClasses, textSizeClasses } from "../classes/typographyClasses";
import { ComponentTheme } from "./common/ComponentTheme";
import { BadgeProps, TagProps } from "../props/props";
import { SizeTheme } from "./size/sizeTheme";
import { GapTheme } from "./size/gapTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { BorderTheme } from "./layout/borderTheme";
import { ShadowTheme } from "./layout/shadowTheme";
import { RingTheme } from "./layout/ringTheme";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { VariantTheme } from "./appearance/variantTheme";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses, borderAppearanceClasses,
  filledActiveBackgroundAppearanceClasses,
  filledBackgroundAppearanceClasses, filledBorderAppearanceClasses,
  filledHoverBackgroundAppearanceClasses, filledRingAppearanceClasses,
  hoverBackgroundAppearanceClasses, ringAppearanceClasses
} from "../classes/appearanceClasses";
import { BADGE_KEYS } from "../props/keys";
import React from "react";

export const defaultBadgeTheme = new ComponentTheme<{ [K in typeof BADGE_KEYS[number]]?: boolean; } & TagProps & React.HTMLProps<HTMLElement>>(
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
        outline: TextAppearanceTheme.createDefaultStyle({
          base: backgroundAppearanceClasses,
          hover: hoverBackgroundAppearanceClasses,
          active: activeBackgroundAppearanceClasses
        }),
        filled: TextAppearanceTheme.createDefaultStyle({
          base: filledBackgroundAppearanceClasses,
          hover: filledHoverBackgroundAppearanceClasses,
          active: filledActiveBackgroundAppearanceClasses
        })
      }),
      text: VariantTheme.createDefault({
        outline: TextAppearanceTheme.createDefaultStyle({base: textAppearanceClasses}),
        filled: TextAppearanceTheme.createDefaultStyle({base: filledTextAppearanceClasses})
      }),
      border: VariantTheme.createDefault({
        outline: TextAppearanceTheme.createDefaultStyle({base: borderAppearanceClasses}),
        filled: TextAppearanceTheme.createDefaultStyle({base: filledBorderAppearanceClasses})
      }),
      ring: VariantTheme.createDefault({
        outline: TextAppearanceTheme.createDefaultStyle({base: ringAppearanceClasses}),
        filled: TextAppearanceTheme.createDefaultStyle({base: filledRingAppearanceClasses})
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
