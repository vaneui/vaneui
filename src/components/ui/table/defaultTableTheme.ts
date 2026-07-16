import { ComponentTheme, defaultLayoutClassMappers, borderAppearance } from "../theme/common";
import type { TableProps } from "./TableProps";
import type { TableTheme } from "./TableTheme";
import { TABLE_CATEGORIES } from "./TableCategories";
import { tableDefaults } from "./tableDefaults";
import { MarginClassMapper } from "../theme/size";
import { BorderClassMapper, RadiusClassMapper, WidthClassMapper } from "../theme/layout";
import { TextAlignClassMapper } from "../theme/typography";

export const defaultTableTheme = new ComponentTheme<TableProps, TableTheme>(
  "table",
  "vane-table border-collapse",
  {
    size: {
      margin: new MarginClassMapper(),
    },
    appearance: {
      border: borderAppearance,
    },
    layout: {
      ...defaultLayoutClassMappers,
      border: new BorderClassMapper(),
      radius: new RadiusClassMapper(),
      width: new WidthClassMapper(),
    },
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  tableDefaults,
  TABLE_CATEGORIES,
  undefined,
  'layout'
);
