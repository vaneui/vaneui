import { ComponentTheme } from "./common/ComponentTheme";
import { DividerProps } from "../props/props";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import {   backgroundAppearanceClasses } from "../classes/appearanceClasses";

export const defaultDividerTheme = new ComponentTheme<DividerProps>(
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
