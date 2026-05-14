import { forwardRef } from 'react';
import type { MarkProps } from "./MarkProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const Mark = forwardRef<HTMLElement, MarkProps>(
  function Mark(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.mark} ref={ref} {...props} />
  }
);

Mark.displayName = 'Mark';
