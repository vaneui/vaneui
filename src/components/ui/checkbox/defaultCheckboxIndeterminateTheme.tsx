import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { CheckboxIndeterminateProps } from "./CheckboxIndeterminateProps";
import { SimpleConsumerClassMapper } from "../theme/appearance";
import { textConsumerClass } from "../classes/appearanceClasses";
import { CHECKBOX_INDETERMINATE_CATEGORIES } from "./CheckboxIndeterminateCategories";
import type { CheckboxIndeterminateTheme } from "./CheckboxIndeterminateTheme";
import { checkboxIndeterminateDefaults } from "./checkboxIndeterminateDefaults";

export const defaultCheckboxIndeterminateTheme = new ComponentTheme<CheckboxIndeterminateProps, CheckboxIndeterminateTheme>(
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
      color: new SimpleConsumerClassMapper({ base: textConsumerClass, alwaysOutput: true }, 'text'),
    },
    layout: defaultLayoutClassMappers,
  },
  checkboxIndeterminateDefaults,
  CHECKBOX_INDETERMINATE_CATEGORIES,
  undefined,
  'ui'
);
