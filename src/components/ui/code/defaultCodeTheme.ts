import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { CodeProps } from "./CodeProps";
import type { CodeTheme } from "./CodeTheme";
import { CODE_CATEGORIES } from "../props/categoryBuilders";
import { interactiveClassMappers } from "../theme/common/interactiveClassMappers";
import { codeDefaults } from "./codeDefaults";

export const defaultCodeTheme = new ComponentTheme<CodeProps, CodeTheme>(
  "code",
  "vane-code",
  interactiveClassMappers,
  codeDefaults,
  CODE_CATEGORIES,
  undefined,
  'ui'
);
