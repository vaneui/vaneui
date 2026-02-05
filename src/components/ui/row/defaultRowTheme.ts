import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { RowProps } from "./RowProps";
import type { RowTheme } from "./RowTheme";
import { ROW_CATEGORIES } from "../props/categoryBuilders";
import { layoutClassMappers } from "../theme/common/layoutClassMappers";
import { rowDefaults } from "./rowDefaults";
import { BreakpointClassMapper } from "../theme/size/breakpointClassMapper";
import { TextAlignClassMapper } from "../theme/typography/textAlignClassMapper";

export const defaultRowTheme = new ComponentTheme<RowProps, RowTheme>(
  "div",
  "vane-row",
  {
    ...layoutClassMappers,
    size: {
      ...layoutClassMappers.size,
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
