import { forwardRef } from 'react';
import type { InputProps } from "./InputProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.input} {...props} />
  }
);

Input.displayName = 'Input';
