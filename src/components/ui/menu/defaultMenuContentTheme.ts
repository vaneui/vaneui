import { ComponentTheme, layoutClassMappers, bgAppearance, textAppearance, borderAppearance, ringAppearance, shadowAppearance } from "../theme/common";
import type { MenuContentProps } from "./MenuContentProps";
import type { MenuContentTheme } from "./MenuContentTheme";
import { MENU_CONTENT_CATEGORIES } from "./MenuContentCategories";
import { menuContentDefaults } from "./menuContentDefaults";

export const defaultMenuContentTheme = new ComponentTheme<MenuContentProps, MenuContentTheme>(
  'div',
  'vane-menu-content',
  {
    size: layoutClassMappers.size,
    layout: {
      ...layoutClassMappers.layout,
      shadow: shadowAppearance,
    },
    appearance: {
      background: bgAppearance,
      text: textAppearance,
      border: borderAppearance,
      ring: ringAppearance,
    },
  },
  menuContentDefaults,
  MENU_CONTENT_CATEGORIES,
  undefined,
  'layout'
);
