import { forwardRef } from 'react';
import type { ThProps } from "./ThProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultThTheme } from "./defaultThTheme";

export const Th = forwardRef<HTMLTableCellElement, ThProps>(
  function Th(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.table.th ?? defaultThTheme} ref={ref} {...props} />;
  }
);

Th.displayName = 'Th';
