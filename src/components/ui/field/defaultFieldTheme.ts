import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { FieldProps } from "./FieldProps";
import type { FieldTheme } from "./FieldTheme";
import { FIELD_CATEGORIES } from "./FieldCategories";
import { fieldDefaults } from "./fieldDefaults";
import { TextAlignClassMapper } from "../theme/typography";
import { BreakpointClassMapper } from "../theme/size";

export const defaultFieldTheme = new ComponentTheme<FieldProps, FieldTheme>(
  "div",
  "vane-field",
  {
    ...layoutClassMappers,
    size: {
      ...layoutClassMappers.size,
      breakpoint: new BreakpointClassMapper(),
    },
    typography: {
      textAlign: new TextAlignClassMapper(),
    },
  },
  fieldDefaults,
  FIELD_CATEGORIES,
  undefined,
  'layout'
);
