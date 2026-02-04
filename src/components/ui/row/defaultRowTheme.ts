import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { RowProps } from "./RowProps";
import type { RowTheme } from "./RowTheme";
import { ROW_CATEGORIES } from "../props/categoryBuilders";
import { layoutSubThemes } from "../theme/common/layoutSubThemes";
import { rowDefaults } from "./rowDefaults";
import { BreakpointClassMapper } from "../theme/size/breakpointClassMapper";
import { TextAlignClassMapper } from "../theme/typography/textAlignClassMapper";

export const defaultRowTheme = new ComponentTheme<RowProps, RowTheme>(
  "div",
  "vane-row",
  {
    ...layoutSubThemes,
    size: {
      ...layoutSubThemes.size,
      breakpoint: new BreakpointClassMapper(),
    },
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  rowDefaults,
  ROW_CATEGORIES,
  undefined,
  'layout'
);
