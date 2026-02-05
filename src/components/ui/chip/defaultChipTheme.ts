import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { ChipProps } from "./ChipProps";
import type { ChipTheme } from "./ChipTheme";
import { CHIP_CATEGORIES } from "../props/categoryBuilders";
import { interactiveClassMappers } from "../theme/common/interactiveClassMappers";
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
