import { forwardRef } from 'react';
import type { TrProps } from "./TrProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultTrTheme } from "./defaultTrTheme";

export const Tr = forwardRef<HTMLTableRowElement, TrProps>(
  function Tr(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.table.tr ?? defaultTrTheme} ref={ref} {...props} />;
  }
);

Tr.displayName = 'Tr';
