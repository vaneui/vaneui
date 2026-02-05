import {
  ComponentTheme,
} from "../theme/common/ComponentTheme";
import type { InputProps } from "./InputProps";
import { interactiveClassMappers } from "../theme/common/interactiveClassMappers";
import { bgHoverAppearance, shadowUIAppearance } from "../theme/common/appearanceClassMappers";
import { StatusClassMapper } from "../theme/appearance/statusClassMapper";
import { INPUT_CATEGORIES } from "./InputCategories";
import type { InputTheme } from "./InputTheme";
import { inputDefaults } from "./inputDefaults";

export const defaultInputTheme = new ComponentTheme<InputProps, InputTheme>(
  "input",
  "vane-input w-full",
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      background: bgHoverAppearance,
      shadow: shadowUIAppearance,
      status: new StatusClassMapper(),
    },
  },
  inputDefaults,
  INPUT_CATEGORIES,
  () => "input",
  'ui'
);
