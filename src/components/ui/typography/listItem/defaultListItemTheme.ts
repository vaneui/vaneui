import {
  ComponentTheme,
  defaultLayoutClassMappers,
  defaultTypographyClassMappers,
  bgAppearance,
} from "../../theme/common";
import type { TypographyProps } from "../common";
import type { ListItemTheme } from "./ListItemTheme";
import { FontSizeClassMapper } from "../../theme/size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../../theme/size/lineHeightClassMapper";
import { SimpleConsumerClassMapper } from "../../theme/appearance/simpleConsumerClassMapper";
import { textConsumerClass } from "../../classes/appearanceClasses";
import { LIST_CATEGORIES } from "../common";
import { listItemDefaults } from "./listItemDefaults";

/** ListItem specific theme. Includes `bgAppearance` so `<ListItem danger filled>`
 *  produces a colored background and `<ListItem transparent>` toggles it off. */
export const defaultListItemTheme: ComponentTheme<TypographyProps, ListItemTheme> = new ComponentTheme<TypographyProps, ListItemTheme>(
  "li",
  "vane-list-item [&[data-has-icon='true']]:list-none",
  {
    size: {
      text: new FontSizeClassMapper(),
      lineHeight: new LineHeightClassMapper(),
    },
    appearance: {
      background: bgAppearance,
      text: new SimpleConsumerClassMapper({ base: textConsumerClass, alwaysOutput: true }, 'text'),
    },
    typography: defaultTypographyClassMappers,
    layout: defaultLayoutClassMappers,
  },
  listItemDefaults,
  LIST_CATEGORIES,
  undefined,
  'ui'
);

/** Alias for backward compatibility */
export const listItemTheme = defaultListItemTheme;
