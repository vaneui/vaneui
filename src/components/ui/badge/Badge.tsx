import { forwardRef } from 'react';
import type { BadgeProps } from "./BadgeProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultBadgeTheme } from "./defaultBadgeTheme";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(props, ref) {
    const theme = useTheme();
    // Focus ring only when href turns the rendered tag into <a>; skip when
    // user opts out with noFocusVisible.
    const focusInjection = props.href && !props.noFocusVisible ? { focusVisible: true as const } : undefined;
    return <ThemedComponent theme={theme?.badge ?? defaultBadgeTheme} ref={ref} {...focusInjection} {...props} />
  }
);

Badge.displayName = 'Badge';
