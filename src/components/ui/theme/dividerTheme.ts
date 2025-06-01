import { BaseComponentTheme, ComponentTheme, DefaultLayoutThemes } from "./common/ComponentTheme";
import { DividerProps } from "../props/props";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import {   backgroundAppearanceClasses } from "../classes/appearanceClasses";

export interface DividerTheme<P> extends BaseComponentTheme<P> {
  appearance: {
    background: TextAppearanceTheme;
  };
}

export const defaultDividerTheme = new ComponentTheme<DividerProps, DividerTheme<DividerProps>>(
  "div",
  "bg-gray-200 h-px w-full",
  {
    appearance: {
      background: TextAppearanceTheme.createDefaultStyle({
        base: backgroundAppearanceClasses,
      }),
    }
  },
  {
    md: true,
    default: true,
  }
);
