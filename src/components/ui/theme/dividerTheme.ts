import { BaseComponentTheme, ComponentTheme } from "./common/ComponentTheme";
import { DividerProps } from "../props/props";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import { bgBorderAppearanceClasses } from "../classes/appearanceClasses";

export interface DividerTheme<P> extends BaseComponentTheme<P> {
  appearance: {
    background: TextAppearanceTheme;
  };
}

export const defaultDividerTheme = new ComponentTheme<DividerProps, DividerTheme<DividerProps>>(
  "div",
  "h-px w-full",
  {
    appearance: {
      background: TextAppearanceTheme.createDefaultTheme({
        base: bgBorderAppearanceClasses,
      }),
    }
  },
  {
    md: true,
    default: true,
  }
);
