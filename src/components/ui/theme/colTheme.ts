import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { ColProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { commonGaps } from "../classes/spacingClasses";

export interface ColTheme extends BaseComponentTheme {
  size: {
    gap: GapTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    direction: DirectionTheme;
  };
}

export const defaultColTheme = new ComponentTheme<ColProps, ColTheme>(
  "div",
  "flex-col",
  {
    size: {
      gap: new GapTheme({gap: commonGaps}),
    },
    layout: {
      ...defaultLayoutTheme,
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
    },
  },
  {
    md: true,
    flex: true,
    transparent: true,
    gap: true,
  }
);
