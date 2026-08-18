import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { RadioDotProps } from "./RadioProps";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { FocusVisibleClassMapper } from "../theme/layout";
import { textConsumerClass, focusVisibleConsumerClass } from "../classes/appearanceClasses";
import { RADIO_DOT_CATEGORIES } from "./RadioCategories";
import type { RadioDotTheme } from "./RadioDotTheme";
import { radioDotDefaults } from "./radioDotDefaults";

export const defaultRadioDotTheme = new ComponentTheme<RadioDotProps, RadioDotTheme>(
  "span",
  "invisible col-start-1 row-start-1 peer-checked:visible",
  {
    dotElement: () =>
      <svg viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="3" fill="currentColor" />
      </svg>,
    appearance: {
      color: new SimpleConsumerClassMapper({ base: textConsumerClass, alwaysOutput: true }, 'text'),
      focusVisible: new SimpleConsumerClassMapper({ base: focusVisibleConsumerClass, alwaysOutput: true }, 'focusVisible')
    },
    layout: {
      ...defaultLayoutClassMappers,
      focusVisible: new FocusVisibleClassMapper()
    },
  },
  radioDotDefaults,
  RADIO_DOT_CATEGORIES,
  undefined,
  'ui'
);
