import { ComponentTheme, defaultTypographyClassMappers, interactiveClassMappers, bgHoverOnlyAppearance } from "../theme/common";
import type { MenuLabelProps } from "./MenuLabelProps";
import type { MenuLabelTheme } from "./MenuLabelTheme";
import { MENU_LABEL_CATEGORIES } from "./MenuLabelCategories";
import { menuLabelDefaults } from "./menuLabelDefaults";

export const defaultMenuLabelTheme = new ComponentTheme<MenuLabelProps, MenuLabelTheme>(
  "div",
  "vane-menu-label [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      // No idle bg — transparent until hovered (consistent with industry standard)
      background: bgHoverOnlyAppearance,
    },
    typography: defaultTypographyClassMappers,
  },
  menuLabelDefaults,
  MENU_LABEL_CATEGORIES,
  undefined,
  'ui'
);
