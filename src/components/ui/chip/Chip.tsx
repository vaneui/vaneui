import { forwardRef } from 'react';
import type { ChipProps } from "./ChipProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultChipTheme } from "./defaultChipTheme";

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  function Chip(props, ref) {
    const theme = useTheme();
    // Focus ring only when href turns the rendered tag into <a>; skip when
    // user opts out with noFocusVisible (otherwise both end up in props and
    // first-in-enum focusVisible wins).
    const focusInjection = props.href && !props.noFocusVisible ? { focusVisible: true as const } : undefined;
    return <ThemedComponent theme={theme?.chip ?? defaultChipTheme} ref={ref} {...focusInjection} {...props} />
  }
);

Chip.displayName = 'Chip';
