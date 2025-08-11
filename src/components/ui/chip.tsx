import React, { JSX, forwardRef } from 'react';
import { ChipProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  function Chip(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.chip} ref={ref} {...props} />
  }
);
