import { forwardRef } from 'react';
import type { DividerProps } from "./DividerProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultDividerTheme } from "./defaultDividerTheme";

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider(props, ref) {
    const theme = useTheme();
    const ariaOrientation = props.vertical ? 'vertical' as const : 'horizontal' as const;
    return (
      <ThemedComponent
        theme={theme?.divider ?? defaultDividerTheme}
        ref={ref}
        role="separator"
        aria-orientation={ariaOrientation}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
