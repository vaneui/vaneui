import { forwardRef } from 'react';
import type React from 'react';
import type { ChipProps } from "./ChipProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { composeEventHandlers } from "../../utils/composeEventHandlers";
import { defaultChipTheme } from "./defaultChipTheme";

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  function Chip(props, ref) {
    const theme = useTheme();
    // Focus ring only when the chip is interactive (a link, a button or clickable); skip when
    // user opts out with noFocusVisible (otherwise both end up in props and
    // first-in-enum focusVisible wins).
    const interactive = props.href || props.onClick || props.tag === 'button';
    const focusInjection = interactive && !props.noFocusVisible ? { focusVisible: true as const } : undefined;

    // A clickable chip with no href or tag stays a <span>, which the keyboard can't reach on its own,
    // so it takes button semantics: a role, a tab stop, and Enter / Space activation. A disabled one
    // stays focusable with aria-disabled (the same pattern as a disabled link) but doesn't activate.
    const isSpanButton = !!props.onClick && !props.href && (props.tag === undefined || props.tag === 'span');
    const spanButtonProps = isSpanButton ? {
      role: props.role ?? 'button',
      tabIndex: props.tabIndex ?? 0,
      'aria-disabled': props['aria-disabled'] ?? (props.disabled || undefined),
      onClick: (event: React.MouseEvent<HTMLSpanElement>) => {
        if (!props.disabled) props.onClick?.(event);
      },
      onKeyDown: composeEventHandlers(props.onKeyDown, (event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (event.defaultPrevented || event.target !== event.currentTarget) return;
        if (event.key === ' ') event.preventDefault(); // no page scroll; Space activates on keyup, like a button
        if (event.key === 'Enter' && !props.disabled) {
          event.preventDefault();
          event.currentTarget.click();
        }
      }),
      onKeyUp: composeEventHandlers(props.onKeyUp, (event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (event.defaultPrevented || event.target !== event.currentTarget) return;
        if (event.key === ' ' && !props.disabled) event.currentTarget.click();
      }),
    } : undefined;

    return <ThemedComponent theme={theme?.chip ?? defaultChipTheme} ref={ref} {...focusInjection} {...props} {...spanButtonProps} />
  }
);

Chip.displayName = 'Chip';
