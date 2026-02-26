import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { MenuSeparatorProps } from "./MenuSeparatorProps";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { PyClassMapper } from "../theme/size";
import { OrientationClassMapper, WidthClassMapper, HeightClassMapper } from "../theme/layout";
import { MENU_SEPARATOR_CATEGORIES } from "./MenuSeparatorCategories";
import type { MenuSeparatorTheme } from "./MenuSeparatorTheme";
import { menuSeparatorDefaults } from "./menuSeparatorDefaults";

export const defaultMenuSeparatorTheme = new ComponentTheme<MenuSeparatorProps, MenuSeparatorTheme>(
  "div",
  "vane-menu-separator",
  {
    size: {
      py: new PyClassMapper(),
    },
    appearance: {
      background: new SimpleConsumerClassMapper({ base: 'bg-(--border-color)' }, 'bg'),
    },
    layout: {
      ...defaultLayoutClassMappers,
      orientation: new OrientationClassMapper(),
      width: new WidthClassMapper(),
      height: new HeightClassMapper(),
    },
  },
  menuSeparatorDefaults,
  MENU_SEPARATOR_CATEGORIES,
  undefined,
  'layout'
);
