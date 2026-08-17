import { ComponentTheme, interactiveClassMappers, bgHoverAppearance } from "../theme/common";
import type { SelectProps } from "./SelectProps";
import { StatusClassMapper, DisabledClassMapper, ReadOnlyClassMapper } from "../theme/appearance";
import { INPUT_CATEGORIES } from "../input/InputCategories";
import type { InputTheme } from "../input/InputTheme";
import { selectDefaults } from "./selectDefaults";

// Shares InputTheme/INPUT_CATEGORIES; `appearance-none` drops the native arrow for the themed chevron.
export const defaultSelectTheme = new ComponentTheme<SelectProps, InputTheme>(
  "select",
  "vane-select appearance-none",
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      background: bgHoverAppearance,
      status: new StatusClassMapper(),
      disabled: new DisabledClassMapper(),
      readOnly: new ReadOnlyClassMapper(),
    },
  },
  selectDefaults,
  INPUT_CATEGORIES,
  () => "select",
  'ui'
);
