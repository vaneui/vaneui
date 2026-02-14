import { ComponentTheme, interactiveClassMappers } from "../theme/common";
import type { ChipProps } from "./ChipProps";
import type { ChipTheme } from "./ChipTheme";
import { CHIP_CATEGORIES } from "../props/categoryBuilders";
import { chipDefaults } from "./chipDefaults";

export const defaultChipTheme = new ComponentTheme<ChipProps, ChipTheme>(
  "span",
  "vane-chip",
  interactiveClassMappers,
  chipDefaults,
  CHIP_CATEGORIES,
  (props: ChipProps) => props.href ? "a" : "span",
  'ui'
);
