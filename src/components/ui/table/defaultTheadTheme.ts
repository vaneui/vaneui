import { ComponentTheme, defaultLayoutClassMappers, bgAppearance, textAppearance } from "../theme/common";
import type { TheadProps } from "./TheadProps";
import type { TheadTheme } from "./TheadTheme";
import { THEAD_CATEGORIES } from "./TheadCategories";
import { theadDefaults } from "./theadDefaults";

export const defaultTheadTheme = new ComponentTheme<TheadProps, TheadTheme>(
  "thead",
  "vane-table-head",
  {
    appearance: {
      background: bgAppearance,
      text: textAppearance,
    },
    layout: defaultLayoutClassMappers,
  },
  theadDefaults,
  THEAD_CATEGORIES,
  undefined,
  'layout'
);
