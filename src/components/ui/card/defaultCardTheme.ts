import { ComponentTheme, defaultTypographyThemes } from "../theme/common/ComponentTheme";
import type { CardProps } from "./CardProps";
import type { CardTheme } from "./CardTheme";
import { CARD_CATEGORIES } from "./CardCategories";
import { layoutSubThemes } from "../theme/common/layoutSubThemes";
import { cardDefaults } from "./cardDefaults";
import { LineHeightClassMapper } from "../theme/size/lineHeightClassMapper";
import { BreakpointClassMapper } from "../theme/size/breakpointClassMapper";
import { WidthClassMapper } from "../theme/layout/widthClassMapper";

export const defaultCardTheme = new ComponentTheme<CardProps, CardTheme>(
  "div",
  "vane-card",
  {
    ...layoutSubThemes,
    size: {
      ...layoutSubThemes.size,
      lineHeight: new LineHeightClassMapper(),
    },
    layout: {
      ...layoutSubThemes.layout,
      breakpoint: new BreakpointClassMapper(),
      width: new WidthClassMapper(),
    },
    typography: defaultTypographyThemes,
  },
  cardDefaults,
  CARD_CATEGORIES,
  (props: CardProps) => props.href ? "a" : "div",
  'layout'
);
