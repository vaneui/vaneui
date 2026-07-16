import { forwardRef } from 'react';
import type { TdProps } from "./TdProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultTdTheme } from "./defaultTdTheme";

export const Td = forwardRef<HTMLTableCellElement, TdProps>(
  function Td(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.table.td ?? defaultTdTheme} ref={ref} {...props} />;
  }
);

Td.displayName = 'Td';
