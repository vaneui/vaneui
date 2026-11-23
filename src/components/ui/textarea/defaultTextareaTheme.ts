import { ComponentTheme, interactiveClassMappers, bgHoverAppearance } from "../theme/common";
import type { TextareaProps } from "./TextareaProps";
import { StatusClassMapper, DisabledVisualClassMapper, ReadOnlyClassMapper } from "../theme/appearance";
import { ResizeClassMapper, AutosizeClassMapper } from "../theme/layout";
import { TEXTAREA_CATEGORIES } from "./TextareaCategories";
import type { TextareaTheme } from "./TextareaTheme";
import { textareaDefaults } from "./textareaDefaults";

// Builds on InputTheme and INPUT_CATEGORIES: a textarea is an input that wraps lines,
// plus a resize handle (`resizeY` by default) and `autosize`.
// Its own base class carries the multi-line box and omits the trailing-icon
// reservation `.vane-input[data-status="error"]` makes for the overlaid alert icon.
// No error icon here: the danger ring is the cue, so pair `invalid` with helper text.
export const defaultTextareaTheme = new ComponentTheme<TextareaProps, TextareaTheme>(
  "textarea",
  "vane-textarea",
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      background: bgHoverAppearance,
      status: new StatusClassMapper(),
      disabled: new DisabledVisualClassMapper(),
      readOnly: new ReadOnlyClassMapper(),
    },
    layout: {
      ...interactiveClassMappers.layout,
      resize: new ResizeClassMapper(),
      autosize: new AutosizeClassMapper(),
    },
  },
  textareaDefaults,
  TEXTAREA_CATEGORIES,
  () => "textarea",
  'ui'
);
