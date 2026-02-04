import { ComponentTheme, defaultTypographyThemes } from "../theme/common/ComponentTheme";
import type { ButtonProps } from "./ButtonProps";
import type { ButtonTheme } from "./ButtonTheme";
import { BUTTON_CATEGORIES } from "../props/categoryBuilders";
import { interactiveSubThemes } from "../theme/common/interactiveSubThemes";
import { buttonDefaults } from "./buttonDefaults";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import { bgConsumerClasses } from "../classes/appearanceClasses";

export const defaultButtonTheme = new ComponentTheme<ButtonProps, ButtonTheme>(
  "button",
  "vane-button",
  {
    ...interactiveSubThemes,
    appearance: {
      ...interactiveSubThemes.appearance,
      background: new SimpleConsumerTheme({ base: bgConsumerClasses.base, hover: bgConsumerClasses.hover, active: bgConsumerClasses.active }, 'bg'),
      shadow: ShadowAppearanceTheme.createUITheme(),
    },
    typography: defaultTypographyThemes,
  },
  buttonDefaults,
  BUTTON_CATEGORIES,
  (props: ButtonProps) => props.href ? "a" : "button",
  'ui'
);
