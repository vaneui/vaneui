import { forwardRef } from 'react';
import { BadgeProps } from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.badge} ref={ref} {...props} />
  }
)
