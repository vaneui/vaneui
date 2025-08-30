import React, { JSX, forwardRef } from 'react';
import { CodeProps } from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Code = forwardRef<HTMLElement, CodeProps>(
  function Code(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.code} ref={ref} {...props} />
  }
);