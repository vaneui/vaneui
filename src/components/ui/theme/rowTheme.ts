import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { RowProps } from "../props/props";
import { commonGaps } from "../classes/spacingClasses";

export interface RowTheme<P> extends BaseComponentTheme<P> {
  size: {
    gap: GapTheme;
  };
  layout: DefaultLayoutThemes<P> & {
    wrap: WrapTheme;
  };
}

export const defaultRowTheme = new ComponentTheme<RowProps, RowTheme<RowProps>>(
  "div",
  "flex flex-row",
  {
    size: {
      gap: new GapTheme(commonGaps),
    },
    layout: {
      wrap: new WrapTheme(),
    },
  },
  {
    md: true,
    transparent: true,
    itemsCenter: true,
    flexWrap: true,
  }
);
