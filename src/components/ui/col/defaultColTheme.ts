import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { ColProps } from "./ColProps";
import type { ColTheme } from "./ColTheme";
import { COL_CATEGORIES } from "./ColCategories";
import { colDefaults } from "./colDefaults";
import { TextAlignClassMapper } from "../theme/typography";
import { BreakpointClassMapper } from "../theme/size";

export const defaultColTheme = new ComponentTheme<ColProps, ColTheme>(
  "div",
  "vane-col",
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
  colDefaults,
  COL_CATEGORIES,
  undefined,
  'layout'
);
