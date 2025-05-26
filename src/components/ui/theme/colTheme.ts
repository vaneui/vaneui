import { DirectionTheme } from "./layout/directionTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { ColProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { commonGaps } from "../classes/spacingClasses";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses, borderAppearanceClasses,
  hoverBackgroundAppearanceClasses, ringAppearanceClasses
} from "../classes/appearanceClasses";
import { textAppearanceClasses } from "../classes/typographyClasses";

export const defaultColTheme = new ComponentTheme<ColProps>(
  "div",
  "flex flex-col",
  {
    size: {
      gap: new GapTheme(commonGaps),
    },
    layout: {
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
    transparent: true,
  }
);
