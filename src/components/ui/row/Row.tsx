import { forwardRef } from 'react';
import type { RowProps } from "./RowProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultRowTheme } from "./defaultRowTheme";

export const Row = forwardRef<HTMLDivElement, RowProps>(
  function Row(props, ref) {
    const theme = useTheme();
    // Focus ring only when href turns the rendered tag into <a>; skip when
    // user opts out with noFocusVisible.
    const focusInjection = props.href && !props.noFocusVisible ? { focusVisible: true as const } : undefined;
    return <ThemedComponent theme={theme?.row ?? defaultRowTheme} ref={ref} {...focusInjection} {...props} />
  }
);

Row.displayName = 'Row';
