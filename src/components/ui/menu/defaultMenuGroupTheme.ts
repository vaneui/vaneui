import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { MenuGroupProps } from "./MenuGroupProps";
import type { MenuGroupTheme } from "./MenuGroupTheme";
import { MENU_GROUP_CATEGORIES } from "./MenuGroupCategories";
import { menuGroupDefaults } from "./menuGroupDefaults";

export const defaultMenuGroupTheme = new ComponentTheme<MenuGroupProps, MenuGroupTheme>(
  'div',
  'vane-menu-group',
  {
    size: layoutClassMappers.size,
    appearance: layoutClassMappers.appearance,
    layout: layoutClassMappers.layout,
  },
  menuGroupDefaults,
  MENU_GROUP_CATEGORIES,
  undefined,
  'layout'
);
