import { ComponentTheme, interactiveClassMappers } from "../theme/common";
import type { KbdProps } from "./KbdProps";
import type { KbdTheme } from "./KbdTheme";
import { CODE_CATEGORIES } from "../props/categoryBuilders";
import { kbdDefaults } from "./kbdDefaults";

export const defaultKbdTheme = new ComponentTheme<KbdProps, KbdTheme>(
  "kbd",
  "vane-kbd",
  interactiveClassMappers,
  kbdDefaults,
  CODE_CATEGORIES,
  undefined,
  'ui'
);
