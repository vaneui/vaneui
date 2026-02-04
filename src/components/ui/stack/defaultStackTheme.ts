import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { StackProps } from "./StackProps";
import type { StackTheme } from "./StackTheme";
import { STACK_CATEGORIES } from "../props/categoryBuilders";
import { layoutSubThemes } from "../theme/common/layoutSubThemes";
import { stackDefaults } from "./stackDefaults";
import { BreakpointTheme } from "../theme/size/breakpointTheme";
import { TextAlignTheme } from "../theme/typography/textAlignTheme";

export const defaultStackTheme = new ComponentTheme<StackProps, StackTheme>(
  "div",
  "vane-stack",
  {
    ...layoutSubThemes,
    size: {
      ...layoutSubThemes.size,
      breakpoint: new BreakpointTheme(),
    },
    typography: {
      textAlign: new TextAlignTheme(),
    },
  },
  stackDefaults,
  STACK_CATEGORIES,
  undefined,
  'layout'
);
