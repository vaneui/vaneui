import { ComponentTheme, interactiveClassMappers, bgHoverAppearance } from "../theme/common";
import type { InputProps } from "./InputProps";
import { StatusClassMapper, DisabledVisualClassMapper, ReadOnlyClassMapper } from "../theme/appearance";
import { INPUT_CATEGORIES } from "./InputCategories";
import type { InputTheme } from "./InputTheme";
import { inputDefaults } from "./inputDefaults";

export const defaultInputTheme = new ComponentTheme<InputProps, InputTheme>(
  "input",
  "vane-input",
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      background: bgHoverAppearance,
      status: new StatusClassMapper(),
      disabled: new DisabledVisualClassMapper(),
      readOnly: new ReadOnlyClassMapper(),
    },
  },
  inputDefaults,
  INPUT_CATEGORIES,
  () => "input",
  'ui'
);
