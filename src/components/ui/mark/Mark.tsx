import { forwardRef } from 'react';
import type { MarkProps } from "./MarkProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultMarkTheme } from "./defaultMarkTheme";

export const Mark = forwardRef<HTMLElement, MarkProps>(
  function Mark(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.mark ?? defaultMarkTheme} ref={ref} {...props} />
  }
);

Mark.displayName = 'Mark';
