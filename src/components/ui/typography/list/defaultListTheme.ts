import {
  ComponentTheme,
  defaultSizedLayoutClassMappers,
  defaultTypographyClassMappers
} from "../../theme/common/ComponentTheme";
import type { ListProps } from "./ListProps";
import type { ListTheme } from "./ListTheme";
import { FontSizeClassMapper } from "../../theme/size/fontSizeClassMapper";
import { LineHeightClassMapper } from "../../theme/size/lineHeightClassMapper";
import { PlClassMapper } from "../../theme/size/plClassMapper";
import { ListStyleClassMapper } from "../../theme/list/listStyleClassMapper";
import { ListPositionClassMapper } from "../../theme/list/listPositionClassMapper";
import { bgAppearance, textAppearance } from "../../theme/common/appearanceClassMappers";
import { LIST_CATEGORIES } from "../common";
import { listDefaults } from "./listDefaults";

/** List specific theme. Includes `bgAppearance` so `<List danger filled>`
 *  produces a colored background and `<List transparent>` toggles it off. */
export const defaultListTheme: ComponentTheme<ListProps, ListTheme> = new ComponentTheme<ListProps, ListTheme>(
  "ul",
  "vane-list",
  {
    size: {
      text: new FontSizeClassMapper(),
      lineHeight: new LineHeightClassMapper(),
      paddingLeft: new PlClassMapper(),
    },
    appearance: {
      background: bgAppearance,
      text: textAppearance,
    },
    typography: defaultTypographyClassMappers,
    layout: defaultSizedLayoutClassMappers,
    listStyle: new ListStyleClassMapper(),
    listPosition: new ListPositionClassMapper(),
  },
  listDefaults,
  LIST_CATEGORIES,
  (props: ListProps) => {
    const componentProps = props as unknown as Record<string, boolean>;
    const isOrdered = componentProps?.decimal || componentProps?.lowerAlpha || componentProps?.lowerRoman;
    return isOrdered ? "ol" : "ul";
  },
  'ui'
);

/** Alias for backward compatibility */
export const listTheme = defaultListTheme;
