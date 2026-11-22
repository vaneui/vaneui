import { ComponentTheme, defaultLayoutClassMappers, borderAppearance, filledSurfaceAppearance } from "../theme/common";
import type { TableProps } from "./TableProps";
import type { TableTheme } from "./TableTheme";
import { TABLE_CATEGORIES } from "./TableCategories";
import { tableDefaults } from "./tableDefaults";
import { MarginClassMapper } from "../theme/size";
import { BorderClassMapper, WidthClassMapper, StripedClassMapper, HoverableClassMapper } from "../theme/layout";
import { TextAlignClassMapper, FontFamilyClassMapper } from "../theme/typography";

export const defaultTableTheme = new ComponentTheme<TableProps, TableTheme>(
  "table",
  "vane-table border-collapse",
  {
    size: {
      margin: new MarginClassMapper(),
    },
    appearance: {
      surface: filledSurfaceAppearance,
      border: borderAppearance,
    },
    layout: {
      ...defaultLayoutClassMappers,
      border: new BorderClassMapper(),
      width: new WidthClassMapper(),
      striped: new StripedClassMapper(),
      hoverable: new HoverableClassMapper(),
    },
    typography: {
      textAlign: new TextAlignClassMapper(),
      fontFamily: new FontFamilyClassMapper(),
    },
  },
  tableDefaults,
  TABLE_CATEGORIES,
  undefined,
  'layout'
);
