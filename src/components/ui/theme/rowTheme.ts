import { GapTheme } from "./size/gapTheme";
import { WrapTheme } from "./layout/wrapTheme";
import { ComponentTheme } from "./common/ComponentTheme";
import { RowProps } from "../props/props";
import { commonGaps } from "../classes/spacingClasses";

export const defaultRowTheme = new ComponentTheme<RowProps>(
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
