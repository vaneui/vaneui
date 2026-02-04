import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { ChipProps } from "./ChipProps";
import type { ChipTheme } from "./ChipTheme";
import { CHIP_CATEGORIES } from "../props/categoryBuilders";
import { interactiveSubThemes } from "../theme/common/interactiveSubThemes";
import { chipDefaults } from "./chipDefaults";

export const defaultChipTheme = new ComponentTheme<ChipProps, ChipTheme>(
  "span",
  "vane-chip",
  interactiveSubThemes,
  chipDefaults,
  CHIP_CATEGORIES,
  (props: ChipProps) => props.href ? "a" : "span",
  'ui'
);
