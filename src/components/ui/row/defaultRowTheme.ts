import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { RowProps } from "./RowProps";
import type { RowTheme } from "./RowTheme";
import { ROW_CATEGORIES } from "../props/categoryBuilders";
import { layoutSubThemes } from "../theme/common/layoutSubThemes";
import { rowDefaults } from "./rowDefaults";
import { BreakpointTheme } from "../theme/size/breakpointTheme";
import { TextAlignTheme } from "../theme/typography/textAlignTheme";

export const defaultRowTheme = new ComponentTheme<RowProps, RowTheme>(
  "div",
  "vane-row",
  {
    ...layoutSubThemes,
    size: {
      ...layoutSubThemes.size,
      breakpoint: new BreakpointTheme(),
    },
    typography: {
      textAlign: new TextAlignTheme(),
    },
  },
  rowDefaults,
  ROW_CATEGORIES,
  undefined,
  'layout'
);
