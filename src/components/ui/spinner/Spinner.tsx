import { forwardRef } from 'react';
import type { SpinnerProps } from "./SpinnerProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultSpinnerTheme } from "./defaultSpinnerTheme";

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(props, ref) {
    const theme = useTheme();
    // role=status makes the busy state perceivable; consumers name it with aria-label
    return <ThemedComponent ref={ref} theme={theme?.spinner ?? defaultSpinnerTheme} role="status" {...props} />
  }
);

Spinner.displayName = 'Spinner';
