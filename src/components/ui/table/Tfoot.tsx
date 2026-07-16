import { forwardRef } from 'react';
import type { TfootProps } from "./TfootProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultTfootTheme } from "./defaultTfootTheme";

export const Tfoot = forwardRef<HTMLTableSectionElement, TfootProps>(
  function Tfoot(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.table.tfoot ?? defaultTfootTheme} ref={ref} {...props} />;
  }
);

Tfoot.displayName = 'Tfoot';
