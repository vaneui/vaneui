import { ComponentTheme, defaultLayoutClassMappers, bgAppearance, textAppearance } from "../theme/common";
import type { TbodyProps } from "./TbodyProps";
import type { TbodyTheme } from "./TbodyTheme";
import { TBODY_CATEGORIES } from "./TbodyCategories";
import { tbodyDefaults } from "./tbodyDefaults";

export const defaultTbodyTheme = new ComponentTheme<TbodyProps, TbodyTheme>(
  "tbody",
  "vane-table-body",
  {
    appearance: {
      background: bgAppearance,
      text: textAppearance,
    },
    layout: defaultLayoutClassMappers,
  },
  tbodyDefaults,
  TBODY_CATEGORIES,
  undefined,
  'layout'
);
