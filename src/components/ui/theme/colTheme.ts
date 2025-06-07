import { DirectionTheme } from "./layout/directionTheme";
import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { ColProps } from "../props/props";
import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { commonGaps } from "../classes/spacingClasses";

export interface ColTheme<P> extends BaseComponentTheme<P> {
  size: {
    gap: GapTheme;
  };
  layout: DefaultLayoutThemes<P> & {
    wrap: WrapTheme;
    direction: DirectionTheme;
  };
}

export const defaultColTheme = new ComponentTheme<ColProps, ColTheme<ColProps>>(
  "div",
  "flex flex-col",
  {
    size: {
      gap: new GapTheme({gap: commonGaps}),
    },
    layout: {
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
    },
  },
  {
    md: true,
    transparent: true,
  }
);
