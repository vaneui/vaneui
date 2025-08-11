import React, { JSX, forwardRef } from 'react';
import { ContainerProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.container} ref={ref} {...props} />
  }
);
