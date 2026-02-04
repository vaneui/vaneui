import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { ColProps } from "./ColProps";
import type { ColTheme } from "./ColTheme";
import { COL_CATEGORIES } from "./ColCategories";
import { layoutSubThemes } from "../theme/common/layoutSubThemes";
import { colDefaults } from "./colDefaults";
import { TextAlignTheme } from "../theme/typography/textAlignTheme";

export const defaultColTheme = new ComponentTheme<ColProps, ColTheme>(
  "div",
  "vane-col",
  {
    ...layoutSubThemes,
    typography: {
      textAlign: new TextAlignTheme(),
    },
  },
  colDefaults,
  COL_CATEGORIES,
  undefined,
  'layout'
);
