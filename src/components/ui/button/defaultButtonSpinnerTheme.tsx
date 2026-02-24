import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { ButtonSpinnerProps } from "./ButtonSpinnerProps";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { textConsumerClass } from "../classes/appearanceClasses";
import { BUTTON_SPINNER_CATEGORIES } from "./ButtonSpinnerCategories";
import type { ButtonSpinnerTheme } from "./ButtonSpinnerTheme";
import { buttonSpinnerDefaults } from "./buttonSpinnerDefaults";

export const defaultButtonSpinnerTheme = new ComponentTheme<ButtonSpinnerProps, ButtonSpinnerTheme>(
  "span",
  "inset-0",
  {
    spinnerElement: () =>
      <span className="vane-button-spinner-ring" aria-hidden="true" />,
    appearance: {
      text: new SimpleConsumerClassMapper({ base: textConsumerClass, alwaysOutput: true }, 'text'),
    },
    layout: {
      ...defaultLayoutClassMappers,
    },
  },
  buttonSpinnerDefaults,
  BUTTON_SPINNER_CATEGORIES,
  undefined,
  'ui'
);
