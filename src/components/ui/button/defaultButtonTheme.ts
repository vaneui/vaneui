import { ComponentTheme, defaultTypographyClassMappers, interactiveClassMappers, bgActiveAppearance } from "../theme/common";
import type { ButtonProps } from "./ButtonProps";
import type { ButtonTheme } from "./ButtonTheme";
import { BUTTON_CATEGORIES } from "../props/categoryBuilders";
import { buttonDefaults } from "./buttonDefaults";

export const defaultButtonTheme = new ComponentTheme<ButtonProps, ButtonTheme>(
  "button",
  "vane-button min-h-(--min-h) [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      background: bgActiveAppearance,
    },
    typography: defaultTypographyClassMappers,
  },
  buttonDefaults,
  BUTTON_CATEGORIES,
  (props: ButtonProps) => props.href ? "a" : "button",
  'ui'
);
