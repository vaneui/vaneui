import { DirectionTheme } from "./layout/directionTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { CardProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { ShadowTheme } from "./layout/shadowTheme";
import { BorderTheme } from "./layout/borderTheme";
import { RadiusTheme } from "./layout/radiusTheme";
import { roundedMap } from "../classes/badgeClasses";
import { PxTheme } from "./size/pxTheme";
import { PyTheme } from "./size/pyTheme";
import { commonGaps } from "../classes/spacingClasses";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses, borderAppearanceClasses,
  hoverBackgroundAppearanceClasses, ringAppearanceClasses
} from "../classes/appearanceClasses";
import { textAppearanceClasses } from "../classes/typographyClasses";

export const defaultCardTheme = new ComponentTheme<CardProps>(
  "div",
  "flex overflow-hidden",
  {
    size: {
      px: new PxTheme({
        xs: 'px-3',
        sm: 'px-4',
        md: 'px-5',
        lg: 'px-6',
        xl: 'px-8',
      }),
      py: new PyTheme({
        xs: 'py-2',
        sm: 'py-3',
        md: 'py-4',
        lg: 'py-5',
        xl: 'py-6',
      }),
      gap: new GapTheme(commonGaps),
      shadow: new ShadowTheme(),
    },
    layout: {
      border: new BorderTheme(),
      radius: new RadiusTheme(roundedMap),
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
    },
    appearance: {
      background: AppearanceTheme.createDefaultStyle({
        base: backgroundAppearanceClasses,
        hover: hoverBackgroundAppearanceClasses,
        active: activeBackgroundAppearanceClasses
      }),
      text: AppearanceTheme.createDefaultStyle({base: textAppearanceClasses}),
      border: AppearanceTheme.createDefaultStyle({
        base: borderAppearanceClasses,
      }),
      ring: AppearanceTheme.createDefaultStyle({
        base: ringAppearanceClasses,
      }),
    }
  },
  {
    md: true,
    default: true,
    rounded: true,
    normal: true,
    column: true,
  }
);
