import { forwardRef } from 'react';
import { InputProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.input} {...props} />
  }
);