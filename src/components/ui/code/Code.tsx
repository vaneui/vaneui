import { forwardRef } from 'react';
import type { CodeProps } from "./CodeProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultCodeTheme } from "./defaultCodeTheme";

export const Code = forwardRef<HTMLElement, CodeProps>(
  function Code(props, ref) {
    const theme = useTheme();
    // Focus ring only when href turns the rendered tag into <a>; skip when
    // user opts out with noFocusVisible.
    const focusInjection = props.href && !props.noFocusVisible ? { focusVisible: true as const } : undefined;
    return <ThemedComponent theme={theme?.code ?? defaultCodeTheme} ref={ref} {...focusInjection} {...props} />
  }
);

Code.displayName = 'Code';
