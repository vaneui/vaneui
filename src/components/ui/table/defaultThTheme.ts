import { ComponentTheme, defaultLayoutClassMappers, textAppearance, borderAppearance } from "../theme/common";
import type { ThProps } from "./ThProps";
import type { ThTheme } from "./ThTheme";
import { TH_CATEGORIES } from "./ThCategories";
import { thDefaults } from "./thDefaults";
import { PxClassMapper, PyClassMapper, FontSizeClassMapper } from "../theme/size";
import { BorderClassMapper, WidthClassMapper, HeightClassMapper } from "../theme/layout";
import { TextAlignClassMapper, FontWeightClassMapper } from "../theme/typography";

export const defaultThTheme = new ComponentTheme<ThProps, ThTheme>(
  "th",
  "vane-table-cell vane-table-head-cell align-top",
  {
    size: {
      px: new PxClassMapper(),
      py: new PyClassMapper(),
      fontSize: new FontSizeClassMapper(),
    },
    appearance: {
      text: textAppearance,
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
      fontWeight: new FontWeightClassMapper(),
    },
  },
  thDefaults,
  TH_CATEGORIES,
  undefined,
  'layout'
);
