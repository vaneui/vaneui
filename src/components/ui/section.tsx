import React, { JSX, forwardRef } from 'react';
import { SectionProps } from './props/props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  function Section(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.section} ref={ref} {...props} />
  }
);
