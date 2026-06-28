import { forwardRef, useMemo } from 'react';
import type { InputProps } from "./InputProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";
import { defaultInputTheme } from "./defaultInputTheme";
import { defaultInputErrorIconTheme } from "./defaultInputErrorIconTheme";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const theme = useTheme();
    const inputThemeBase = theme?.input ?? defaultInputTheme;
    const errorIconThemeBase = theme?.inputErrorIcon ?? defaultInputErrorIconTheme;
    // inside a Label, the Label's resolved size becomes this input's size
    // default; explicit size props on the Input still win at extraction
    const labelSize = useLabelSizeContext();
    const inputTheme = useMemo(
      () => withLabelSizeDefault(inputThemeBase, labelSize),
      [inputThemeBase, labelSize]
    );

    // The error cue is a real themed element, not a CSS background-image, so the
    // <input> (a void element that can't hold children) is wrapped in a relative
    // span and the icon overlays its trailing edge — see defaultInputErrorIconTheme.
    if (props.error) {
      return (
        <span className="vane-input-wrapper relative flex w-full">
          <ThemedComponent ref={ref} theme={inputTheme} {...props} />
          <ThemedComponent theme={errorIconThemeBase} aria-hidden="true">
            {errorIconThemeBase.themes.errorIconElement()}
          </ThemedComponent>
        </span>
      );
    }

    return <ThemedComponent ref={ref} theme={inputTheme} {...props} />
  }
);

Input.displayName = 'Input';
