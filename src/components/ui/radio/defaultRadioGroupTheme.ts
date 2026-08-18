import { ComponentTheme } from "../theme/common";
import { defaultColTheme } from "../col/defaultColTheme";
import type { ColTheme } from "../col/ColTheme";
import type { RadioGroupProps } from "./RadioGroupProps";
import { RADIO_GROUP_CATEGORIES } from "./RadioCategories";
import { radioGroupDefaults } from "./radioGroupDefaults";

// Reuses Col's mappers (a RadioGroup is a flex column) but as a `ui` element, so
// its gap follows the control ladder instead of the looser layout one.
export const defaultRadioGroupTheme = new ComponentTheme<RadioGroupProps, ColTheme>(
  "div",
  "",
  defaultColTheme.themes,
  radioGroupDefaults,
  RADIO_GROUP_CATEGORIES,
  undefined,
  'ui'
);
