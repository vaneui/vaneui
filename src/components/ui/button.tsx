import React, { forwardRef } from 'react';
import { ButtonProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.button} {...props} />
  }
);
