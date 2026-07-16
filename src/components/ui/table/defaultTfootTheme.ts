import { ComponentTheme, defaultLayoutClassMappers, bgAppearance, textAppearance } from "../theme/common";
import type { TfootProps } from "./TfootProps";
import type { TfootTheme } from "./TfootTheme";
import { TFOOT_CATEGORIES } from "./TfootCategories";
import { tfootDefaults } from "./tfootDefaults";

export const defaultTfootTheme = new ComponentTheme<TfootProps, TfootTheme>(
  "tfoot",
  "vane-table-foot",
  {
    appearance: {
      background: bgAppearance,
      text: textAppearance,
    },
    layout: defaultLayoutClassMappers,
  },
  tfootDefaults,
  TFOOT_CATEGORIES,
  undefined,
  'layout'
);
