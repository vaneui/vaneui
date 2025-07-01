import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { RowProps } from "../props/props";
import { commonGaps } from "../classes/spacingClasses";
import { BreakpointTheme } from "./size/breakpointTheme";

export interface RowTheme<P> extends BaseComponentTheme<P> {
  size: {
    gap: GapTheme;
    breakpoint: BreakpointTheme;
  };
  layout: DefaultLayoutThemes<P> & {
    wrap: WrapTheme;
  };
}

export const defaultRowTheme = new ComponentTheme<RowProps, RowTheme<RowProps>>(
  "div",
  "flex-row",
  {
    size: {
      gap: new GapTheme({gap: commonGaps}),
      breakpoint: new BreakpointTheme(),
    },
    layout: {
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
