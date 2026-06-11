import { ComponentTheme } from "../../theme/common/ComponentTheme";
import type { ListProps } from "./ListProps";
import type { ListTheme } from "./ListTheme";
import { typographyClassMappers } from "../../theme/common/typographyClassMappers";
import { PlClassMapper } from "../../theme/size/plClassMapper";
import { ListStyleClassMapper } from "../../theme/list/listStyleClassMapper";
import { ListPositionClassMapper } from "../../theme/list/listPositionClassMapper";
import { ListGapClassMapper } from "../../theme/list/listGapClassMapper";
import { bgAppearance } from "../../theme/common/appearanceClassMappers";
import { LIST_CATEGORIES } from "../common";
import { listDefaults } from "./listDefaults";

/** List theme — composed over the shared `typographyClassMappers` collection
 *  so changes to the shared collection automatically reach List. Includes
 *  `bgAppearance` so `<List danger filled>` produces a colored background and
 *  `<List transparent>` toggles it off. */
export const defaultListTheme: ComponentTheme<ListProps, ListTheme> = new ComponentTheme<ListProps, ListTheme>(
  "ul",
  "vane-list [&_ul]:list-[circle] [&_ul_ul]:list-[square] [&_ol]:list-[lower-alpha] [&_ol_ol]:list-[lower-roman]",
  {
    size: {
      text: typographyClassMappers.size.text,
      lineHeight: typographyClassMappers.size.lineHeight,
      // delta: the shared `letterSpacing` mapper is deliberately NOT inherited —
      // `letterSpacing` is not in LIST_CATEGORIES, and LetterSpacingClassMapper
      // emits a default `tracking-(--ls)` class even when the prop is absent,
      // which would change every List's class output.
      // delta: size-scaled left padding reserves indent space for list markers
      paddingLeft: new PlClassMapper(),
    },
    appearance: {
      ...typographyClassMappers.appearance,
      // delta: lists support `filled`/`transparent` backgrounds, unlike background-less typography
      background: bgAppearance,
    },
    typography: typographyClassMappers.typography,
    // whole group inherited by reference; its `cursor` mapper is inert here
    // (`cursor` is not in LIST_CATEGORIES, and CursorClassMapper emits nothing without the key)
    layout: typographyClassMappers.layout,
    // deltas: list-only categories — marker style, marker position, inter-item gap
    listStyle: new ListStyleClassMapper(),
    listPosition: new ListPositionClassMapper(),
    listGap: new ListGapClassMapper(),
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
