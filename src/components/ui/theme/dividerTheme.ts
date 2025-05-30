import { ComponentTheme } from "./common/ComponentTheme";
import { DividerProps } from "../props/props";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import {   backgroundAppearanceClasses } from "../classes/appearanceClasses";

export const defaultDividerTheme = new ComponentTheme<DividerProps>(
  "div",
  "bg-gray-200 h-px w-full",
  {
    appearance: {
      background: AppearanceTheme.createDefaultStyle({
        base: backgroundAppearanceClasses,
      }),
    }
  },
  {
    md: true,
    default: true,
  }
);
