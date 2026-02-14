import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { StackProps } from "./StackProps";
import type { StackTheme } from "./StackTheme";
import { STACK_CATEGORIES } from "../props/categoryBuilders";
import { stackDefaults } from "./stackDefaults";
import { BreakpointClassMapper } from "../theme/size";
import { TextAlignClassMapper } from "../theme/typography";

export const defaultStackTheme = new ComponentTheme<StackProps, StackTheme>(
  "div",
  "vane-stack",
  {
    ...layoutClassMappers,
    size: {
      ...layoutClassMappers.size,
      breakpoint: new BreakpointClassMapper(),
    },
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  stackDefaults,
  STACK_CATEGORIES,
  undefined,
  'layout'
);
