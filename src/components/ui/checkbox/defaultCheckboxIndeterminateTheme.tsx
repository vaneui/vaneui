import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { CheckboxProps } from "./CheckboxProps";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { textConsumerClass } from "../classes/appearanceClasses";
import { CHECKBOX_CATEGORIES } from "./CheckboxCategories";
import type { CheckboxIndeterminateTheme } from "./CheckboxIndeterminateTheme";
import { checkboxIndeterminateDefaults } from "./checkboxIndeterminateDefaults";

export const defaultCheckboxIndeterminateTheme = new ComponentTheme<CheckboxProps, CheckboxIndeterminateTheme>(
  "span",
  "invisible col-start-1 row-start-1 peer-indeterminate:visible",
  {
    indeterminateElement: () =>
      <svg viewBox="0 0 14 14" fill="none">
        <path
          d="M3 7H11"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          stroke="currentColor"
        />
      </svg>,
    appearance: {
      color: new SimpleConsumerTheme({ base: textConsumerClass }, 'text'),
    },
    layout: defaultLayoutsThemes,
  },
  checkboxIndeterminateDefaults,
  CHECKBOX_CATEGORIES,
  undefined,
  'ui'
);
