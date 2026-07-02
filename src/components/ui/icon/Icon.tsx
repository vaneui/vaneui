import { forwardRef } from 'react';
import type { IconProps } from "./IconProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultIconTheme } from "./defaultIconTheme";

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  function Icon(props, ref) {
    const theme = useTheme();
    // Accessibility policy for the icon wrapper:
    //  - a named icon (aria-label / aria-labelledby / title) → role="img" so it's announced;
    //  - otherwise it's decorative → aria-hidden so screen readers skip it (and it doesn't
    //    double-announce when placed inside an already-labelled Button).
    // A consumer-set role or aria-hidden always wins.
    const hasAccessibleName = Boolean(
      props['aria-label'] || props['aria-labelledby'] || props.title
    );
    const a11yProps =
      props.role === undefined && props['aria-hidden'] === undefined
        ? hasAccessibleName
          ? { role: 'img' as const }
          : { 'aria-hidden': true as const }
        : {};
    return <ThemedComponent theme={theme?.icon ?? defaultIconTheme} ref={ref} {...props} {...a11yProps} />;
  }
);

Icon.displayName = 'Icon';
