import { BaseComponentTheme, ComponentTheme, defaultLayoutsThemes, DefaultLayoutThemes } from "./common/ComponentTheme";
import { DividerProps } from "../props";
import { themeDefaults } from "./defaults";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import { bgBorderAppearanceClasses } from "../classes/appearanceClasses";
import { PyTheme } from "./size/pyTheme";
import { DIVIDER_CATEGORIES } from "../props";

export interface DividerTheme extends BaseComponentTheme {
  size: {
    py: PyTheme;
  };
  appearance: {
    background: AppearanceTheme;
  };
  layout: DefaultLayoutThemes;
}

export const defaultDividerTheme = new ComponentTheme<DividerProps, DividerTheme>(
  "div",
  "h-px w-full",
  {
    size: {
      py: new PyTheme(), // Uses layout spacing by default
    },
    appearance: {
      background: AppearanceTheme.createTheme({
        base: bgBorderAppearanceClasses,
      }, 'bg'),
    },
    layout: defaultLayoutsThemes,
  },
  themeDefaults.divider,
  DIVIDER_CATEGORIES
);
