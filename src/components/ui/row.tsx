import React, { JSX, forwardRef } from 'react';
import { RowProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Row = forwardRef<HTMLDivElement, RowProps>(
  function Row(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.row} ref={ref} {...props} />
  }
);
