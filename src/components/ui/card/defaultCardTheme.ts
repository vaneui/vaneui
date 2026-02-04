import { ComponentTheme, defaultTypographyThemes } from "../theme/common/ComponentTheme";
import type { CardProps } from "./CardProps";
import type { CardTheme } from "./CardTheme";
import { CARD_CATEGORIES } from "./CardCategories";
import { layoutSubThemes } from "../theme/common/layoutSubThemes";
import { cardDefaults } from "./cardDefaults";
import { LineHeightTheme } from "../theme/size/lineHeightTheme";
import { BreakpointTheme } from "../theme/size/breakpointTheme";
import { WidthTheme } from "../theme/layout/widthTheme";

export const defaultCardTheme = new ComponentTheme<CardProps, CardTheme>(
  "div",
  "vane-card",
  {
    ...layoutSubThemes,
    size: {
      ...layoutSubThemes.size,
      lineHeight: new LineHeightTheme(),
    },
    layout: {
      ...layoutSubThemes.layout,
      breakpoint: new BreakpointTheme(),
      width: new WidthTheme(),
    },
    typography: defaultTypographyThemes,
  },
  cardDefaults,
  CARD_CATEGORIES,
  (props: CardProps) => props.href ? "a" : "div",
  'layout'
);
