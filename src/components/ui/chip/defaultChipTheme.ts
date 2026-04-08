import { ComponentTheme, interactiveClassMappers } from "../theme/common";
import type { ChipProps } from "./ChipProps";
import type { ChipTheme } from "./ChipTheme";
import { CHIP_CATEGORIES } from "../props/categoryBuilders";
import { chipDefaults } from "./chipDefaults";

export const defaultChipTheme = new ComponentTheme<ChipProps, ChipTheme>(
  "span",
  "vane-chip [&_svg]:pointer-events-none [&_svg]:shrink-0",
  interactiveClassMappers,
  chipDefaults,
  CHIP_CATEGORIES,
  (props: ChipProps) => props.href ? "a" : "span",
  'ui'
);
// `secondary outline` from chipDefaults is Chip's semantic identity — a
// muted tag-style token whose appearance should not be inherited from a
// filled ancestor.
defaultChipTheme.hasIdentity = true;
