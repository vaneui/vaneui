import { ComponentTheme, defaultTypographyClassMappers } from "../theme/common/ComponentTheme";
import type { ButtonProps } from "./ButtonProps";
import type { ButtonTheme } from "./ButtonTheme";
import { BUTTON_CATEGORIES } from "../props/categoryBuilders";
import { interactiveClassMappers } from "../theme/common/interactiveClassMappers";
import { buttonDefaults } from "./buttonDefaults";
import { bgActiveAppearance, shadowUIAppearance } from "../theme/common/appearanceClassMappers";

export const defaultButtonTheme = new ComponentTheme<ButtonProps, ButtonTheme>(
  "button",
  "vane-button",
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      background: bgActiveAppearance,
      shadow: shadowUIAppearance,
    },
    typography: defaultTypographyClassMappers,
  },
  buttonDefaults,
  BUTTON_CATEGORIES,
  (props: ButtonProps) => props.href ? "a" : "button",
  'ui'
);
