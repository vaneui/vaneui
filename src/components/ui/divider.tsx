import React, { JSX, forwardRef } from 'react';
import { DividerProps } from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.divider} ref={ref} {...props} />
  }
);
