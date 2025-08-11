import React, { JSX, forwardRef } from 'react';
import { StackProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  function Stack(props, ref) {
    const theme = useTheme();
    const stackTheme = theme.stack;
    return <ThemedComponent theme={stackTheme} ref={ref} {...props} />
  }
);
