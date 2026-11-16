import { forwardRef, useMemo } from 'react';
import type { InputProps } from "./InputProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useThemedFieldControlProps } from "../field/FieldContext";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { defaultInputTheme } from "./defaultInputTheme";
import { defaultInputErrorIconTheme } from "./defaultInputErrorIconTheme";
import { defaultInputWrapperTheme } from "./defaultInputWrapperTheme";
import type { InputWrapperProps } from "./InputWrapperProps";

// The wrapper's state while the input is valid — a state key, not a visual default:
// its themed box (inputWrapperDefaults) only exists to position the error icon.
const BOXLESS_WRAPPER: Partial<InputWrapperProps> = { contents: true };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(rawProps, ref) {
    const props = useThemedFieldControlProps(rawProps);
    const theme = useTheme();
    const inputThemeBase = theme?.input ?? defaultInputTheme;
    const errorIconThemeBase = theme?.inputErrorIcon ?? defaultInputErrorIconTheme;
    const wrapperTheme = theme?.inputWrapper ?? defaultInputWrapperTheme;
    // inside a Label, the Label's resolved size becomes this input's size
    // default; explicit size props on the Input still win at extraction
    const labelSize = useLabelSizeContext();
    const inputTheme = useMemo(
      () => withLabelSizeDefault(inputThemeBase, labelSize),
      [inputThemeBase, labelSize]
    );
    // the icon resolves the same size as the input (explicit prop > Label size >
    // default), so its --fs/--px scale tracks the field
    const errorIconTheme = useMemo(
      () => withLabelSizeDefault(errorIconThemeBase, labelSize),
      [errorIconThemeBase, labelSize]
    );

    // The error cue is a real themed element, not a CSS background-image, so the
    // <input> (a void element that can't hold children) sits in a span and the icon
    // overlays its trailing edge — see defaultInputErrorIconTheme.
    //
    // The span is rendered in BOTH states so the <input> keeps its place in the tree:
    // wrapping it only while invalid made React replace the node whenever `invalid`
    // flipped, which dropped focus and the typed text during live validation. While
    // valid there is nothing to position, so the span resolves to the display
    // category's `contents` key instead of its themed box: it generates no box and
    // the <input> lays out as a direct child of the span's parent. Every prop
    // (className, style, width, hide, ref) stays on the <input> in both states.
    const invalid = !!props.invalid;
    const { xs, sm, md, lg, xl } = props;
    const iconSize = { xs, sm, md, lg, xl };
    return (
      <ThemedComponent theme={wrapperTheme} {...(invalid ? undefined : BOXLESS_WRAPPER)}>
        <ThemedComponent ref={ref} theme={inputTheme} {...props} />
        {invalid && (
          <ThemedComponent theme={errorIconTheme} aria-hidden="true" {...iconSize}>
            {errorIconTheme.themes.errorIconElement()}
          </ThemedComponent>
        )}
      </ThemedComponent>
    );
  }
);

Input.displayName = 'Input';
