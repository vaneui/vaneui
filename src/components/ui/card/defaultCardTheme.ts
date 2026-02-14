import { ComponentTheme, defaultTypographyClassMappers, layoutClassMappers } from "../theme/common";
import type { CardProps } from "./CardProps";
import type { CardTheme } from "./CardTheme";
import { CARD_CATEGORIES } from "./CardCategories";
import { cardDefaults } from "./cardDefaults";
import { LineHeightClassMapper, BreakpointClassMapper } from "../theme/size";
import { WidthClassMapper, CursorClassMapper } from "../theme/layout";

export const defaultCardTheme = new ComponentTheme<CardProps, CardTheme>(
  "div",
  "vane-card",
  {
    ...layoutClassMappers,
    size: {
      ...layoutClassMappers.size,
      lineHeight: new LineHeightClassMapper(),
    },
    layout: {
      ...layoutClassMappers.layout,
      breakpoint: new BreakpointClassMapper(),
      width: new WidthClassMapper(),
      cursor: new CursorClassMapper(),
    },
    typography: defaultTypographyClassMappers,
  },
  cardDefaults,
  CARD_CATEGORIES,
  (props: CardProps) => props.href ? "a" : "div",
  'layout'
);
