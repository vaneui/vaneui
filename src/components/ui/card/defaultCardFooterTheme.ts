import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { CardFooterProps } from "./CardFooterProps";
import type { CardFooterTheme } from "./CardFooterTheme";
import { CARD_FOOTER_CATEGORIES } from "./CardFooterCategories";
import { cardFooterDefaults } from "./cardFooterDefaults";

export const defaultCardFooterTheme = new ComponentTheme<CardFooterProps, CardFooterTheme>(
  'div',
  'vane-card-footer',
  {
    size: layoutClassMappers.size,
    appearance: layoutClassMappers.appearance,
    layout: layoutClassMappers.layout,
  },
  cardFooterDefaults,
  CARD_FOOTER_CATEGORIES,
  undefined,
  'layout'
);
