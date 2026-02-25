import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { CardHeaderProps } from "./CardHeaderProps";
import type { CardHeaderTheme } from "./CardHeaderTheme";
import { CARD_HEADER_CATEGORIES } from "./CardHeaderCategories";
import { cardHeaderDefaults } from "./cardHeaderDefaults";

export const defaultCardHeaderTheme = new ComponentTheme<CardHeaderProps, CardHeaderTheme>(
  'div',
  'vane-card-header',
  {
    size: layoutClassMappers.size,
    appearance: layoutClassMappers.appearance,
    layout: layoutClassMappers.layout,
  },
  cardHeaderDefaults,
  CARD_HEADER_CATEGORIES,
  undefined,
  'layout'
);
