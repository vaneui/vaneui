import {
  ComponentTheme,
  defaultLayoutsThemes,
  defaultTypographyThemes
} from "../../theme/common/ComponentTheme";
import type { TypographyProps } from "../common/TypographyProps";
import type { ListItemTheme } from "./ListItemTheme";
import { FontSizeTheme } from "../../theme/size/fontSizeTheme";
import { LineHeightTheme } from "../../theme/size/lineHeightTheme";
import { SimpleConsumerTheme } from "../../theme/appearance/simpleConsumerTheme";
import { textConsumerClass } from "../../classes/appearanceClasses";
import { LIST_CATEGORIES } from "../common/TypographyCategories";
import { listItemDefaults } from "./listItemDefaults";

/** ListItem specific theme */
export const defaultListItemTheme: ComponentTheme<TypographyProps, ListItemTheme> = new ComponentTheme<TypographyProps, ListItemTheme>(
  "li",
  "vane-list-item",
  {
    size: {
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
    },
    appearance: {
      text: new SimpleConsumerTheme({ base: textConsumerClass, alwaysOutput: true }, 'text'),
    },
    typography: defaultTypographyThemes,
    layout: defaultLayoutsThemes,
  },
  listItemDefaults,
  LIST_CATEGORIES,
  undefined,
  'ui'
);

/** Alias for backward compatibility */
export const listItemTheme = defaultListItemTheme;
