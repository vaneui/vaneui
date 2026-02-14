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
import { textAppearance } from "../../theme/common/appearanceClassMappers";
import { LIST_CATEGORIES } from "../common";
import { listDefaults } from "./listDefaults";

/** List specific theme */
export const defaultListTheme: ComponentTheme<ListProps, ListTheme> = new ComponentTheme<ListProps, ListTheme>(
  "ul",
  "vane-list list-inside",
  {
    size: {
      text: new FontSizeClassMapper(),
      lineHeight: new LineHeightClassMapper(),
      paddingLeft: new PlClassMapper(),
    },
    appearance: {
      text: textAppearance,
    },
    typography: defaultTypographyClassMappers,
    layout: defaultSizedLayoutClassMappers,
    listStyle: new ListStyleClassMapper(),
  },
  listDefaults,
  LIST_CATEGORIES,
  (props: ListProps) => {
    // Determine tag based on list style from props
    const componentProps = props as unknown as Record<string, boolean>;

    // Check if decimal is set in props
    const hasDecimal = componentProps?.decimal;

    return hasDecimal ? "ol" : "ul";
  },
  'ui'
);

/** Alias for backward compatibility */
export const listTheme = defaultListTheme;
