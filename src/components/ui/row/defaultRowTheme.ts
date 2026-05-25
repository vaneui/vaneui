import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { RowProps } from "./RowProps";
import type { RowTheme } from "./RowTheme";
import { ROW_CATEGORIES } from "../props/categoryBuilders";
import { rowDefaults } from "./rowDefaults";
import { BreakpointClassMapper } from "../theme/size";
import { FocusVisibleClassMapper } from "../theme/layout";
import { TextAlignClassMapper } from "../theme/typography";

export const defaultRowTheme = new ComponentTheme<RowProps, RowTheme>(
  "div",
  "vane-row",
  {
    ...layoutClassMappers,
    size: {
      ...layoutClassMappers.size,
      breakpoint: new BreakpointClassMapper(),
    },
    layout: {
      ...layoutClassMappers.layout,
      focusVisible: new FocusVisibleClassMapper(),
    },
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  rowDefaults,
  ROW_CATEGORIES,
  (props: RowProps) => props.href ? "a" : "div",
  'layout'
);
