import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { SelectWrapperProps } from "./SelectWrapperProps";
import { WidthClassMapper } from "../theme/layout";
import { SELECT_WRAPPER_CATEGORIES } from "./SelectWrapperCategories";
import type { SelectWrapperTheme } from "./SelectWrapperTheme";
import { selectWrapperDefaults } from "./selectWrapperDefaults";

// Positioning shell so the chevron can overlay the field's trailing edge; mirrors inputWrapper.
export const defaultSelectWrapperTheme = new ComponentTheme<SelectWrapperProps, SelectWrapperTheme>(
  "span",
  "vane-select-wrapper",
  {
    layout: {
      ...defaultLayoutClassMappers,
      width: new WidthClassMapper(),
    },
  },
  selectWrapperDefaults,
  SELECT_WRAPPER_CATEGORIES,
  undefined,
  'ui'
);
