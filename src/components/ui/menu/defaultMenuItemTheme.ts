import { ComponentTheme, defaultTypographyClassMappers, interactiveClassMappers, bgHoverAppearance } from "../theme/common";
import type { MenuItemProps } from "./MenuItemProps";
import type { MenuItemTheme } from "./MenuItemTheme";
import { MENU_ITEM_CATEGORIES } from "./MenuItemCategories";
import { menuItemDefaults } from "./menuItemDefaults";

export const defaultMenuItemTheme = new ComponentTheme<MenuItemProps, MenuItemTheme>(
  "button",
  "vane-menu-item [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      background: bgHoverAppearance,
    },
    typography: defaultTypographyClassMappers,
  },
  menuItemDefaults,
  MENU_ITEM_CATEGORIES,
  (props: MenuItemProps) => props.href ? "a" : "button",
  'ui'
);
