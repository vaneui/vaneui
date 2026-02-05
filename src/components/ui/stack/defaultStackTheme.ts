import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { StackProps } from "./StackProps";
import type { StackTheme } from "./StackTheme";
import { STACK_CATEGORIES } from "../props/categoryBuilders";
import { layoutClassMappers } from "../theme/common/layoutClassMappers";
import { stackDefaults } from "./stackDefaults";
import { BreakpointClassMapper } from "../theme/size/breakpointClassMapper";
import { TextAlignClassMapper } from "../theme/typography/textAlignClassMapper";

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
