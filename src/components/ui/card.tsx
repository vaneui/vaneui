import React, { forwardRef } from 'react';
import { CardProps } from "./props";
import { ThemedComponent } from "../themedComponent";
import { useTheme } from "../themeContext";

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.card} {...props} />
  }
);
