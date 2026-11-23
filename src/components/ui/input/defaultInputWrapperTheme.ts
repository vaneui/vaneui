import { ComponentTheme, defaultLayoutClassMappers } from "../theme/common";
import type { InputWrapperProps } from "./InputWrapperProps";
import { WidthClassMapper, ShrinkClassMapper } from "../theme/layout";
import { DisabledOpacityClassMapper } from "../theme/appearance";
import { INPUT_WRAPPER_CATEGORIES } from "./InputWrapperCategories";
import type { InputWrapperTheme } from "./InputWrapperTheme";
import { inputWrapperDefaults } from "./inputWrapperDefaults";

// Positioning shell for an error-state <Input>: makes the field a relative,
// full-width flex container so the alert icon (inputErrorIcon) can overlay its
// trailing edge. A real themed element — relative/flex/wFull come from props
// (not a raw className) so the wrapper is customizable via theme.inputWrapper,
// mirroring how checkbox.wrapper is themed.
// Input renders this element while valid too, so the <input> keeps its DOM node
// when the validity flips; there it takes the display category's `contents` key
// and generates no box, so the defaults below only show in the error state.
// With a startSection or endSection it is always a box: it then takes the field's width,
// visibility, className and sizing style, like the Select wrapper.
export const defaultInputWrapperTheme = new ComponentTheme<InputWrapperProps, InputWrapperTheme>(
  "span",
  "vane-input-wrapper",
  {
    layout: {
      ...defaultLayoutClassMappers,
      width: new WidthClassMapper(),
      shrink: new ShrinkClassMapper(),
    },
    // with a section, the wrapper dims for a disabled field, so the section dims with it
    appearance: {
      disabled: new DisabledOpacityClassMapper(),
    },
  },
  inputWrapperDefaults,
  INPUT_WRAPPER_CATEGORIES,
  undefined,
  'ui'
);
