import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { ColProps } from "./ColProps";
import type { ColTheme } from "./ColTheme";
import { COL_CATEGORIES } from "./ColCategories";
import { colDefaults } from "./colDefaults";
import { TextAlignClassMapper } from "../theme/typography";
import { BreakpointClassMapper } from "../theme/size";
import { FocusVisibleClassMapper } from "../theme/layout";

export const defaultColTheme = new ComponentTheme<ColProps, ColTheme>(
  "div",
  "vane-col",
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
  colDefaults,
  COL_CATEGORIES,
  (props: ColProps) => props.href ? "a" : "div",
  'layout'
);
