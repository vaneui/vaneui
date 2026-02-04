import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { CheckboxProps } from "./CheckboxProps";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { FocusVisibleTheme } from "../theme/layout/focusVisibleTheme";
import { SizeTheme } from "../theme/size/sizeTheme";
import { focusVisibleConsumerClass } from "../classes/appearanceClasses";
import { CHECKBOX_CATEGORIES } from "./CheckboxCategories";
import type { CheckboxWrapperTheme } from "./CheckboxWrapperTheme";
import { checkboxWrapperDefaults } from "./checkboxWrapperDefaults";

export const defaultCheckboxWrapperTheme = new ComponentTheme<CheckboxProps, CheckboxWrapperTheme>(
  "span",
  "",
  {
    size: {
      height: new SizeTheme({
        xs: 'h-[calc(var(--lh)*var(--fs))]',
        sm: 'h-[calc(var(--lh)*var(--fs))]',
        md: 'h-[calc(var(--lh)*var(--fs))]',
        lg: 'h-[calc(var(--lh)*var(--fs))]',
        xl: 'h-[calc(var(--lh)*var(--fs))]'
      }) // Uses custom mode for calculated height
    },
    layout: {
      ...defaultLayoutsThemes,
      focusVisible: new FocusVisibleTheme()
    },
    appearance: {
      variant: new SimpleConsumerTheme({ base: '' }, 'bg'),
      focusVisible: new SimpleConsumerTheme({ base: focusVisibleConsumerClass }, 'focusVisible')
    }
  },
  checkboxWrapperDefaults,
  CHECKBOX_CATEGORIES,
  undefined,
  'ui'
);
