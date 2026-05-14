import { forwardRef } from 'react';
import type { IconProps } from "./IconProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  function Icon(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.icon} ref={ref} {...props} />;
  }
);

Icon.displayName = 'Icon';
