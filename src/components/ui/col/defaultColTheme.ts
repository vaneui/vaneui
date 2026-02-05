import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { ColProps } from "./ColProps";
import type { ColTheme } from "./ColTheme";
import { COL_CATEGORIES } from "./ColCategories";
import { layoutClassMappers } from "../theme/common/layoutClassMappers";
import { colDefaults } from "./colDefaults";
import { TextAlignClassMapper } from "../theme/typography/textAlignClassMapper";

export const defaultColTheme = new ComponentTheme<ColProps, ColTheme>(
  "div",
  "vane-col",
  {
    ...layoutClassMappers,
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  colDefaults,
  COL_CATEGORIES,
  undefined,
  'layout'
);
