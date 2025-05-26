import { ComponentTheme } from "./common/ComponentTheme";
import { LayoutComponentProps } from "../props/props";
import { AppearanceTheme } from "./appearance/appearanceTheme";
import {
  activeBackgroundAppearanceClasses,
  backgroundAppearanceClasses, borderAppearanceClasses,
  hoverBackgroundAppearanceClasses, ringAppearanceClasses
} from "../classes/appearanceClasses";
import { textAppearanceClasses } from "../classes/typographyClasses";

export const defaultDividerTheme = new ComponentTheme<LayoutComponentProps>(
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
