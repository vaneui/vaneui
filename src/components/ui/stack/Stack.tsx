import { forwardRef } from 'react';
import type { StackProps } from "./StackProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  function Stack(props, ref) {
    const theme = useTheme();
    // Focus ring only when href turns the rendered tag into <a>; skip when
    // user opts out with noFocusVisible.
    const focusInjection = props.href && !props.noFocusVisible ? { focusVisible: true as const } : undefined;
    return <ThemedComponent ref={ref} theme={theme.stack} {...focusInjection} {...props} />
  }
);

Stack.displayName = 'Stack';
