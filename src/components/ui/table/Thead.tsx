import { forwardRef } from 'react';
import type { TheadProps } from "./TheadProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultTheadTheme } from "./defaultTheadTheme";

export const Thead = forwardRef<HTMLTableSectionElement, TheadProps>(
  function Thead(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.table.thead ?? defaultTheadTheme} ref={ref} {...props} />;
  }
);

Thead.displayName = 'Thead';
