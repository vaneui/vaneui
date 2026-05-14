import { forwardRef } from 'react';
import type { CodeProps } from "./CodeProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const Code = forwardRef<HTMLElement, CodeProps>(
  function Code(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.code} ref={ref} {...props} />
  }
);

Code.displayName = 'Code';
