import { BaseComponentTheme, ComponentTheme } from "./common/ComponentTheme";
import { DividerProps } from "../props/props";
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
}

export const defaultDividerTheme = new ComponentTheme<DividerProps, DividerTheme>(
  "div",
  "h-px w-full",
  {
    size: {
      py: new PyTheme(),
    },
    appearance: {
      background: AppearanceTheme.createTheme({
        base: bgBorderAppearanceClasses,
      }),
    }
  },
  {
    md: true,
    default: true,
    noPadding: true,
  },
  DIVIDER_CATEGORIES
);
