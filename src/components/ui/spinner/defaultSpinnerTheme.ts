import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { SpinnerProps } from "./SpinnerProps";
import type { SpinnerTheme } from "./SpinnerTheme";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { textConsumerClass } from "../classes/appearanceClasses";
import { FontSizeClassMapper, MarginClassMapper } from "../theme/size";
import { SPINNER_CATEGORIES } from "./SpinnerCategories";
import { spinnerDefaults } from "./spinnerDefaults";

export const defaultSpinnerTheme = new ComponentTheme<SpinnerProps, SpinnerTheme>(
  "span",
  "vane-spinner",
  {
    size: {
      text: new FontSizeClassMapper(),
      margin: new MarginClassMapper(),
    },
    appearance: {
      text: new SimpleConsumerClassMapper({ base: textConsumerClass, alwaysOutput: true }, 'text'),
    },
    layout: {
      ...defaultLayoutClassMappers,
    },
  },
  spinnerDefaults,
  SPINNER_CATEGORIES,
  undefined,
  'ui'
);
