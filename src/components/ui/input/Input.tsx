import { forwardRef, useMemo } from 'react';
import type { InputProps } from "./InputProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useLabelSizeContext, withLabelSizeDefault } from "../label/LabelSizeContext";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const theme = useTheme();
    // inside a Label, the Label's resolved size becomes this input's size
    // default; explicit size props on the Input still win at extraction
    const labelSize = useLabelSizeContext();
    const inputTheme = useMemo(
      () => withLabelSizeDefault(theme.input, labelSize),
      [theme.input, labelSize]
    );
    return <ThemedComponent ref={ref} theme={inputTheme} {...props} />
  }
);

Input.displayName = 'Input';
