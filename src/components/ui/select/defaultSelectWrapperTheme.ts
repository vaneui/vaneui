import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { SelectWrapperProps } from "./SelectWrapperProps";
import { WidthClassMapper } from "../theme/layout";
import { DisabledOpacityClassMapper } from "../theme/appearance";
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
    // the chevron is a sibling, so dimming only the field would leave it at full strength
    appearance: {
      disabled: new DisabledOpacityClassMapper(),
    },
  },
  selectWrapperDefaults,
  SELECT_WRAPPER_CATEGORIES,
  undefined,
  'ui'
);
