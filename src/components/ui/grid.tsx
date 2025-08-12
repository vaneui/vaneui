import React, { JSX, forwardRef } from 'react';
import { GridProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Grid2 = forwardRef<HTMLDivElement, GridProps>(
  function Grid2(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.grid2} ref={ref} {...props} />
  }
);

export const Grid3 = forwardRef<HTMLDivElement, GridProps>(
  function Grid3(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.grid3} ref={ref} {...props} />
  }
);

export const Grid4 = forwardRef<HTMLDivElement, GridProps>(
  function Grid4(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.grid4} ref={ref} {...props} />
  }
);