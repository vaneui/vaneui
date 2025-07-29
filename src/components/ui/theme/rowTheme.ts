import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { RowProps } from "../props/props";
import { BreakpointTheme } from "./size/breakpointTheme";
import { BgAppearanceTheme } from "./appearance/bgAppearanceTheme";
import { DirectionTheme } from "./layout/directionTheme";
import { ROW_CATEGORIES } from "../props";

export interface RowTheme extends BaseComponentTheme {
  size: {
    gap: GapTheme;
    breakpoint: BreakpointTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
    direction: DirectionTheme;
  };
  appearance: {
    background: BgAppearanceTheme;
  }
}

export const defaultRowTheme = new ComponentTheme<RowProps, RowTheme>(
  "div",
  "",
  {
    size: {
      gap: new GapTheme(),
      breakpoint: new BreakpointTheme(),
    },
    layout: {
      ...defaultLayoutTheme,
      wrap: new WrapTheme(),
      direction: new DirectionTheme(),
    },
    appearance: {
      background: new BgAppearanceTheme(),
    }
  },
  {
    row: true,
    md: true,
    flex: true,
    itemsCenter: true,
    gap: true,
  },
  ROW_CATEGORIES
);
