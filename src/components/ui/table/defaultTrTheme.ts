import { ComponentTheme, defaultLayoutClassMappers, bgAppearance, textAppearance } from "../theme/common";
import type { TrProps } from "./TrProps";
import type { TrTheme } from "./TrTheme";
import { TR_CATEGORIES } from "./TrCategories";
import { trDefaults } from "./trDefaults";

export const defaultTrTheme = new ComponentTheme<TrProps, TrTheme>(
  "tr",
  "vane-table-row",
  {
    appearance: {
      background: bgAppearance,
      text: textAppearance,
    },
    layout: defaultLayoutClassMappers,
  },
  trDefaults,
  TR_CATEGORIES,
  undefined,
  'layout'
);
