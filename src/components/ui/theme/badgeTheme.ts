import { pxMap, pyMap, gapMap, roundedMap } from "../classes/badgeClasses";
import { filledTextAppearanceClasses, textAppearanceClasses, textSizeClasses } from "../classes/typographyClasses";
import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
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

export interface BadgeTheme<P> extends BaseComponentTheme<P> {
  size: {
    px: PxTheme;
    py: PyTheme;
    text: SizeTheme;
    gap: GapTheme;
    shadow: ShadowTheme;
  };
  appearance: {
    background: VariantTheme;
    text: VariantTheme;
    border: VariantTheme;
    ring: VariantTheme;
  };
  layout: DefaultLayoutThemes<P> & {
    border: BorderTheme;
    ring: RingTheme;
    radius: RadiusTheme;
  };
}

export const defaultBadgeTheme = new ComponentTheme<BadgeProps, BadgeTheme<BadgeProps>>(
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
      background: VariantTheme.createDefaultBackground(),
      text: VariantTheme.createDefaultText(),
      border: VariantTheme.createDefaultBorder(),
      ring: VariantTheme.createDefaultRing(),
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
