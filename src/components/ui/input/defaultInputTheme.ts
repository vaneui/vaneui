import { ComponentTheme, interactiveClassMappers, bgHoverAppearance, shadowAppearance } from "../theme/common";
import type { InputProps } from "./InputProps";
import { StatusClassMapper, DisabledClassMapper } from "../theme/appearance";
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
      shadow: shadowAppearance,
      status: new StatusClassMapper(),
      disabled: new DisabledClassMapper(),
    },
  },
  inputDefaults,
  INPUT_CATEGORIES,
  () => "input",
  'ui'
);
