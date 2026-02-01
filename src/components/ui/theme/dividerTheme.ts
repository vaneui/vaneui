import { BaseComponentTheme, ComponentTheme, defaultLayoutsThemes, DefaultLayoutThemes } from "./common/ComponentTheme";
import type { DividerProps } from "../divider";
import { themeDefaults } from "./defaults";
import { SimpleConsumerTheme } from "./appearance/simpleConsumerTheme";
import { PyTheme } from "./size/pyTheme";
import { OrientationTheme } from "./layout/orientationTheme";
import { DIVIDER_CATEGORIES } from "../props";

export interface DividerTheme extends BaseComponentTheme {
  size: {
    py: PyTheme;
  };
  appearance: {
    background: SimpleConsumerTheme;
  };
  layout: DefaultLayoutThemes & {
    orientation: OrientationTheme;
  };
}

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
  themeDefaults.divider,
  DIVIDER_CATEGORIES,
  undefined,
  'layout'
);
