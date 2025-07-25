import { BaseComponentTheme, ComponentTheme } from "./common/ComponentTheme";
import { DividerProps } from "../props/props";
import { TextAppearanceTheme } from "./appearance/textAppearanceTheme";
import { bgBorderAppearanceClasses } from "../classes/appearanceClasses";
import { PyTheme } from "./size/pyTheme";
import { extractDividerKeys } from "../../utils/componentUtils";

export interface DividerTheme extends BaseComponentTheme {
  size: {
    py: PyTheme;
  };
  appearance: {
    background: TextAppearanceTheme;
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
      background: TextAppearanceTheme.createTheme({
        base: bgBorderAppearanceClasses,
      }),
    }
  },
  {
    md: true,
    default: true,
    noPadding: true,
  },
  extractDividerKeys
);
