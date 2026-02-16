import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { CardProps } from "./CardProps";
import type { CardTheme } from "./CardTheme";
import { CARD_CATEGORIES } from "./CardCategories";
import { cardDefaults } from "./cardDefaults";
import { BreakpointClassMapper } from "../theme/size";
import { WidthClassMapper, CursorClassMapper } from "../theme/layout";
import { TextAlignClassMapper } from "../theme/typography";

export const defaultCardTheme = new ComponentTheme<CardProps, CardTheme>(
  "div",
  "vane-card",
  {
    ...layoutClassMappers,
    layout: {
      ...layoutClassMappers.layout,
      breakpoint: new BreakpointClassMapper(),
      width: new WidthClassMapper(),
      cursor: new CursorClassMapper(),
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
