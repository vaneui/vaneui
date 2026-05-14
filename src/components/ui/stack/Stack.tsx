import { forwardRef } from 'react';
import type { StackProps } from "./StackProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  function Stack(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.stack} {...props} />
  }
);

Stack.displayName = 'Stack';
