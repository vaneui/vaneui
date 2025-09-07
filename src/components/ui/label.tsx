import { forwardRef } from 'react';
import { LabelProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.label} ref={ref} {...props} />;
  }
);