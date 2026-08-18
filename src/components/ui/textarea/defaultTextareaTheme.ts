import { ComponentTheme, interactiveClassMappers, bgHoverAppearance } from "../theme/common";
import type { TextareaProps } from "./TextareaProps";
import { StatusClassMapper, DisabledClassMapper, ReadOnlyClassMapper } from "../theme/appearance";
import { INPUT_CATEGORIES } from "../input/InputCategories";
import type { InputTheme } from "../input/InputTheme";
import { textareaDefaults } from "./textareaDefaults";

// Shares InputTheme and INPUT_CATEGORIES: a textarea is an input that wraps lines.
// Its own base class carries the multi-line box and omits the trailing-icon
// reservation `.vane-input[data-status="error"]` makes for the overlaid alert icon.
// No error icon here: the danger ring is the cue, so pair `invalid` with helper text.
export const defaultTextareaTheme = new ComponentTheme<TextareaProps, InputTheme>(
  "textarea",
  "vane-textarea",
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
  textareaDefaults,
  INPUT_CATEGORIES,
  () => "textarea",
  'ui'
);
