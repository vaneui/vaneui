import { ComponentTheme, interactiveClassMappers } from "../theme/common";
import type { IconProps } from "./IconProps";
import type { IconTheme } from "./IconTheme";
import { ICON_CATEGORIES } from "../props/categoryBuilders";
import { iconDefaults } from "./iconDefaults";

export const defaultIconTheme = new ComponentTheme<IconProps, IconTheme>(
  "span",
  "vane-icon align-middle [&_svg]:pointer-events-none [&_svg]:shrink-0",
  interactiveClassMappers,
  iconDefaults,
  ICON_CATEGORIES,
  undefined,
  'ui'
);
