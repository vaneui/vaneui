import { ComponentTheme, interactiveClassMappers } from "../theme/common";
import type { MarkProps } from "./MarkProps";
import type { MarkTheme } from "./MarkTheme";
import { CODE_CATEGORIES } from "../props/categoryBuilders";
import { markDefaults } from "./markDefaults";

export const defaultMarkTheme = new ComponentTheme<MarkProps, MarkTheme>(
  "mark",
  "vane-mark",
  interactiveClassMappers,
  markDefaults,
  CODE_CATEGORIES,
  undefined,
  'ui'
);
