import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, defaultLayoutTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { RowProps } from "../props/props";
import { commonGaps } from "../classes/spacingClasses";
import { BreakpointTheme } from "./size/breakpointTheme";

export interface RowTheme extends BaseComponentTheme {
  size: {
    gap: GapTheme;
    breakpoint: BreakpointTheme;
  };
  layout: DefaultLayoutThemes & {
    wrap: WrapTheme;
  };
}

export const defaultRowTheme = new ComponentTheme<RowProps, RowTheme>(
  "div",
  "flex-row",
  {
    size: {
      gap: new GapTheme({gap: commonGaps}),
      breakpoint: new BreakpointTheme(),
    },
    layout: {
      ...defaultLayoutTheme,
      wrap: new WrapTheme(),
    },
  },
  {
    md: true,
    flex: true,
    transparent: true,
    itemsCenter: true,
    gap: true,
  }
);
