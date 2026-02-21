import { ComponentTheme, defaultTypographyClassMappers, interactiveClassMappers, bgActiveAppearance, shadowAppearance } from "../theme/common";
import type { IconButtonProps } from "./IconButtonProps";
import type { IconButtonTheme } from "./IconButtonTheme";
import { BUTTON_CATEGORIES } from "../props/categoryBuilders";
import { iconButtonDefaults } from "./iconButtonDefaults";

export const defaultIconButtonTheme = new ComponentTheme<IconButtonProps, IconButtonTheme>(
  "button",
  "vane-icon-button aspect-square [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      background: bgActiveAppearance,
      shadow: shadowAppearance,
    },
    typography: defaultTypographyClassMappers,
  },
  iconButtonDefaults,
  BUTTON_CATEGORIES,
  (props: IconButtonProps) => props.href ? "a" : "button",
  'ui'
);
