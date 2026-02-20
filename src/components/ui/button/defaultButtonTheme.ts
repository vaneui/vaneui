import { ComponentTheme, defaultTypographyClassMappers, interactiveClassMappers, bgActiveAppearance, shadowAppearance } from "../theme/common";
import type { ButtonProps } from "./ButtonProps";
import type { ButtonTheme } from "./ButtonTheme";
import { BUTTON_CATEGORIES } from "../props/categoryBuilders";
import { buttonDefaults } from "./buttonDefaults";

export const defaultButtonTheme = new ComponentTheme<ButtonProps, ButtonTheme>(
  "button",
  "vane-button",
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      background: bgActiveAppearance,
      shadow: shadowAppearance,
    },
    typography: defaultTypographyClassMappers,
  },
  buttonDefaults,
  BUTTON_CATEGORIES,
  (props: ButtonProps) => props.href ? "a" : "button",
  'ui'
);
