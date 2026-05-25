import { forwardRef } from 'react';
import type { ColProps } from "./ColProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const Col = forwardRef<HTMLDivElement, ColProps>(
  function Col(props, ref) {
    const theme = useTheme();
    // Focus ring only when href turns the rendered tag into <a>; skip when
    // user opts out with noFocusVisible.
    const focusInjection = props.href && !props.noFocusVisible ? { focusVisible: true as const } : undefined;
    return <ThemedComponent theme={theme.col} ref={ref} {...focusInjection} {...props} />
  }
);

Col.displayName = 'Col';
