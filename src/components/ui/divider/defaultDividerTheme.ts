import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { DividerProps } from "./DividerProps";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { PyTheme } from "../theme/size/pyTheme";
import { OrientationTheme } from "../theme/layout/orientationTheme";
import { DIVIDER_CATEGORIES } from "./DividerCategories";
import type { DividerTheme } from "./DividerTheme";
import { dividerDefaults } from "./dividerDefaults";

export const defaultDividerTheme = new ComponentTheme<DividerProps, DividerTheme>(
  "div",
  "vane-divider",
  {
    size: {
      py: new PyTheme(), // Uses layout spacing by default
    },
    appearance: {
      // CSS-based approach: uses --border-color variable for divider background
      background: new SimpleConsumerTheme({ base: 'bg-(--border-color)' }, 'bg'),
    },
    layout: {
      ...defaultLayoutsThemes,
      orientation: new OrientationTheme(),
    },
  },
  dividerDefaults,
  DIVIDER_CATEGORIES,
  undefined,
  'layout'
);
