import { DirectionTheme } from "./layout/directionTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { ColProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { commonGaps } from "../classes/spacingClasses";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
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
      background: TextAppearanceTheme.createDefaultStyle({
        base: backgroundAppearanceClasses,
        hover: hoverBackgroundAppearanceClasses,
        active: activeBackgroundAppearanceClasses
      }),
      text: TextAppearanceTheme.createDefaultStyle({base: textAppearanceClasses}),
      border: TextAppearanceTheme.createDefaultStyle({
        base: borderAppearanceClasses,
      }),
      ring: TextAppearanceTheme.createDefaultStyle({
        base: ringAppearanceClasses,
      }),
    }
  },
  {
    md: true,
    transparent: true,
  }
);
