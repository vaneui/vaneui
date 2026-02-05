import {
  ComponentTheme,
  defaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { CheckboxProps } from "./CheckboxProps";
import { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
import { FocusVisibleClassMapper } from "../theme/layout/focusVisibleClassMapper";
import { SizeClassMapper } from "../theme/size/sizeClassMapper";
import { focusVisibleConsumerClass } from "../classes/appearanceClasses";
import { CHECKBOX_CATEGORIES } from "./CheckboxCategories";
import type { CheckboxWrapperTheme } from "./CheckboxWrapperTheme";
import { checkboxWrapperDefaults } from "./checkboxWrapperDefaults";

export const defaultCheckboxWrapperTheme = new ComponentTheme<CheckboxProps, CheckboxWrapperTheme>(
  "span",
  "",
  {
    size: {
      height: new SizeClassMapper({
        xs: 'h-[calc(var(--lh)*var(--fs))]',
        sm: 'h-[calc(var(--lh)*var(--fs))]',
        md: 'h-[calc(var(--lh)*var(--fs))]',
        lg: 'h-[calc(var(--lh)*var(--fs))]',
        xl: 'h-[calc(var(--lh)*var(--fs))]'
      }) // Uses custom mode for calculated height
    },
    layout: {
      ...defaultLayoutClassMappers,
      focusVisible: new FocusVisibleClassMapper()
    },
    appearance: {
      variant: new SimpleConsumerClassMapper({ base: '' }, 'bg'),
      focusVisible: new SimpleConsumerClassMapper({ base: focusVisibleConsumerClass }, 'focusVisible')
    }
  },
  checkboxWrapperDefaults,
  CHECKBOX_CATEGORIES,
  undefined,
  'ui'
);
