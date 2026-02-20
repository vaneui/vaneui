import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { ButtonProps } from "./ButtonProps";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { textConsumerClass } from "../classes/appearanceClasses";
import { BUTTON_CATEGORIES } from "../props/categoryBuilders";
import type { ButtonSpinnerTheme } from "./ButtonSpinnerTheme";
import { buttonSpinnerDefaults } from "./buttonSpinnerDefaults";

export const defaultButtonSpinnerTheme = new ComponentTheme<ButtonProps, ButtonSpinnerTheme>(
  "span",
  "inset-0",
  {
    spinnerElement: () =>
      <span className="vane-button-spinner-ring" aria-hidden="true" />,
    appearance: {
      text: new SimpleConsumerClassMapper({ base: textConsumerClass }, 'text'),
    },
    layout: {
      ...defaultLayoutClassMappers,
    },
  },
  buttonSpinnerDefaults,
  BUTTON_CATEGORIES,
  undefined,
  'ui'
);
