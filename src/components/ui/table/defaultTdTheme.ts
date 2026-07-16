import { ComponentTheme, defaultLayoutClassMappers, borderAppearance } from "../theme/common";
import type { TdProps } from "./TdProps";
import type { TdTheme } from "./TdTheme";
import { TD_CATEGORIES } from "./TdCategories";
import { tdDefaults } from "./tdDefaults";
import { PxClassMapper, PyClassMapper, FontSizeClassMapper } from "../theme/size";
import { BorderClassMapper, WidthClassMapper, HeightClassMapper } from "../theme/layout";
import { TextAlignClassMapper } from "../theme/typography";

export const defaultTdTheme = new ComponentTheme<TdProps, TdTheme>(
  "td",
  "vane-table-cell align-top",
  {
    size: {
      px: new PxClassMapper(),
      py: new PyClassMapper(),
      fontSize: new FontSizeClassMapper(),
    },
    appearance: {
      border: borderAppearance,
    },
    layout: {
      ...defaultLayoutClassMappers,
      border: new BorderClassMapper(),
      width: new WidthClassMapper(),
      height: new HeightClassMapper(),
    },
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  tdDefaults,
  TD_CATEGORIES,
  undefined,
  'layout'
);
