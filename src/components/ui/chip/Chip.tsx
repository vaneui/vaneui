import { forwardRef } from 'react';
import type { ChipProps } from "./ChipProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultChipTheme } from "./defaultChipTheme";

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  function Chip(props, ref) {
    const theme = useTheme();
    // Focus ring only when the chip is interactive (a link, a button or clickable); skip when
    // user opts out with noFocusVisible (otherwise both end up in props and
    // first-in-enum focusVisible wins).
    const interactive = props.href || props.onClick || props.tag === 'button';
    const focusInjection = interactive && !props.noFocusVisible ? { focusVisible: true as const } : undefined;
    return <ThemedComponent theme={theme?.chip ?? defaultChipTheme} ref={ref} {...focusInjection} {...props} />
  }
);

Chip.displayName = 'Chip';
