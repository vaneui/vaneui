import { BaseComponentTheme, ComponentTheme } from "./common/ComponentTheme";
import { DividerProps } from "../props/props";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import {
  dividerAppearanceClasses
} from "../classes/appearanceClasses";

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
      background: TextAppearanceTheme.createDefaultStyle({
        base: dividerAppearanceClasses,
      }),
    }
  },
  {
    md: true,
    default: true,
  }
);
