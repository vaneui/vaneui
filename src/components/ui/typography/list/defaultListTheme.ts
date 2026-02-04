import {
  ComponentTheme,
  defaultLayoutsThemes,
  defaultTypographyThemes
} from "../../theme/common/ComponentTheme";
import type { ListProps } from "./ListProps";
import type { ListTheme } from "./ListTheme";
import { FontSizeTheme } from "../../theme/size/fontSizeTheme";
import { LineHeightTheme } from "../../theme/size/lineHeightTheme";
import { PlTheme } from "../../theme/size/plTheme";
import { SimpleConsumerTheme } from "../../theme/appearance/simpleConsumerTheme";
import { ListStyleTheme } from "../../theme/list/listStyleTheme";
import { textConsumerClass } from "../../classes/appearanceClasses";
import { LIST_CATEGORIES } from "../common/TypographyCategories";
import { listDefaults } from "./listDefaults";

/** List specific theme */
export const defaultListTheme: ComponentTheme<ListProps, ListTheme> = new ComponentTheme<ListProps, ListTheme>(
  "ul",
  "vane-list list-inside",
  {
    size: {
      text: new FontSizeTheme(),
      lineHeight: new LineHeightTheme(),
      paddingLeft: new PlTheme(),
    },
    appearance: {
      text: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
    },
    typography: defaultTypographyThemes,
    layout: defaultLayoutsThemes,
    listStyle: new ListStyleTheme(),
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
