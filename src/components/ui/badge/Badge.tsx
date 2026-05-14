import { forwardRef } from 'react';
import type { BadgeProps } from "./BadgeProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.badge} ref={ref} {...props} />
  }
);

Badge.displayName = 'Badge';
