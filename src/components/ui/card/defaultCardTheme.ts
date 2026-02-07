import { ComponentTheme, defaultTypographyClassMappers } from "../theme/common/ComponentTheme";
import type { CardProps } from "./CardProps";
import type { CardTheme } from "./CardTheme";
import { CARD_CATEGORIES } from "./CardCategories";
import { layoutClassMappers } from "../theme/common/layoutClassMappers";
import { cardDefaults } from "./cardDefaults";
import { LineHeightClassMapper } from "../theme/size/lineHeightClassMapper";
import { BreakpointClassMapper } from "../theme/size/breakpointClassMapper";
import { WidthClassMapper } from "../theme/layout/widthClassMapper";
import { CursorClassMapper } from "../theme/layout/cursorClassMapper";

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
