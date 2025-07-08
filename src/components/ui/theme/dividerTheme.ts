import { BaseComponentTheme, ComponentTheme } from "./common/ComponentTheme";
import { DividerProps } from "../props/props";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import { bgBorderAppearanceClasses } from "../classes/appearanceClasses";

export interface DividerTheme extends BaseComponentTheme {
  appearance: {
    background: TextAppearanceTheme;
  };
}

export const defaultDividerTheme = new ComponentTheme<DividerProps, DividerTheme>(
  "div",
  "h-px w-full",
  {
    appearance: {
      background: TextAppearanceTheme.createTheme({
        base: bgBorderAppearanceClasses,
      }),
    }
  },
  {
    md: true,
    default: true,
  }
);
