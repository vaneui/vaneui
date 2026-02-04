import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { CheckboxProps } from "./CheckboxProps";
import { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";
import { textConsumerClass, focusVisibleConsumerClass } from "../classes/appearanceClasses";
import { CHECKBOX_CATEGORIES } from "./CheckboxCategories";
import type { CheckboxCheckTheme } from "./CheckboxCheckTheme";
import { checkboxCheckDefaults } from "./checkboxCheckDefaults";

export const defaultCheckboxCheckTheme = new ComponentTheme<CheckboxProps, CheckboxCheckTheme>(
  "span",
  "invisible col-start-1 row-start-1 peer-checked:visible peer-indeterminate:invisible",
  {
    checkElement: () =>
      <svg viewBox="0 0 14 14" fill="none">
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          stroke="currentColor"
        />
      </svg>,
    appearance: {
      color: new SimpleConsumerClassMapper({ base: textConsumerClass }, 'text'),
      focusVisible: new SimpleConsumerClassMapper({ base: focusVisibleConsumerClass }, 'focusVisible')
    },
    layout: {
      ...defaultLayoutsThemes,
      focusVisible: new FocusVisibleClassMapper()
    },
  },
  checkboxCheckDefaults,
  CHECKBOX_CATEGORIES,
  undefined,
  'ui'
);
