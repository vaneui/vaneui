import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { CardBodyProps } from "./CardBodyProps";
import type { CardBodyTheme } from "./CardBodyTheme";
import { CARD_BODY_CATEGORIES } from "./CardBodyCategories";
import { cardBodyDefaults } from "./cardBodyDefaults";

export const defaultCardBodyTheme = new ComponentTheme<CardBodyProps, CardBodyTheme>(
  'div',
  'vane-card-body',
  {
    size: layoutClassMappers.size,
    appearance: layoutClassMappers.appearance,
    layout: layoutClassMappers.layout,
  },
  cardBodyDefaults,
  CARD_BODY_CATEGORIES,
  undefined,
  'layout'
);
