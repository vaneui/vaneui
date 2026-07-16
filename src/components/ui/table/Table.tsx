import { forwardRef } from 'react';
import type { TableProps } from "./TableProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultTableTheme } from "./defaultTableTheme";

export const Table = forwardRef<HTMLTableElement, TableProps>(
  function Table(props, ref) {
    const theme = useTheme();
    const tableTheme = theme?.table.main ?? defaultTableTheme;
    return <ThemedComponent theme={tableTheme} ref={ref} {...props} />;
  }
);

Table.displayName = 'Table';
