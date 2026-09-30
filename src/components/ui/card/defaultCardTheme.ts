import { ComponentTheme, layoutClassMappers, focusVisibleAppearance } from "../theme/common";
import type { CardProps } from "./CardProps";
import type { CardTheme } from "./CardTheme";
import { CARD_CATEGORIES } from "./CardCategories";
import { cardDefaults } from "./cardDefaults";
import { BreakpointClassMapper } from "../theme/size";
import { WidthClassMapper, CursorClassMapper, FocusVisibleClassMapper } from "../theme/layout";
import { TextAlignClassMapper } from "../theme/typography";

export const defaultCardTheme = new ComponentTheme<CardProps, CardTheme>(
  "div",
  "vane-card",
  {
    ...layoutClassMappers,
    size: {
      ...layoutClassMappers.size,
      breakpoint: new BreakpointClassMapper(),
    },
    layout: {
      ...layoutClassMappers.layout,
      width: new WidthClassMapper(),
      cursor: new CursorClassMapper(),
      focusVisible: new FocusVisibleClassMapper(),
    },
    appearance: {
      ...layoutClassMappers.appearance,
      // a Card with href shows the appearance's focus color, like Button
      focusVisible: focusVisibleAppearance,
    },
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  cardDefaults,
  CARD_CATEGORIES,
  (props: CardProps) => props.href ? "a" : "div",
  'layout'
);
