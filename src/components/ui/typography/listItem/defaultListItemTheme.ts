import {
  ComponentTheme,
  defaultLayoutsThemes,
  defaultTypographyThemes
} from "../../theme/common/ComponentTheme";
import type { TypographyProps } from "../common/TypographyProps";
import type { ListItemTheme } from "./ListItemTheme";
import { FontSizeClassMapper } from "../../theme/size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../../theme/size/lineHeightClassMapper";
import { SimpleConsumerClassMapper } from "../../theme/appearance/simpleConsumerClassMapper";
import { textConsumerClass } from "../../classes/appearanceClasses";
import { LIST_CATEGORIES } from "../common/TypographyCategories";
import { listItemDefaults } from "./listItemDefaults";

/** ListItem specific theme */
export const defaultListItemTheme: ComponentTheme<TypographyProps, ListItemTheme> = new ComponentTheme<TypographyProps, ListItemTheme>(
  "li",
  "vane-list-item",
  {
    size: {
      text: new FontSizeClassMapper(),
      lineHeight: new LineHeightClassMapper(),
    },
    appearance: {
      text: new SimpleConsumerClassMapper({ base: textConsumerClass, alwaysOutput: true }, 'text'),
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
