import { forwardRef } from 'react';
import type { KbdProps } from "./KbdProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * A keyboard key component for displaying keyboard shortcuts.
 *
 * Renders a styled `<kbd>` element with monospace font, border,
 * and a 3D raised effect via bottom border. Ideal for documenting
 * keyboard shortcuts and key combinations.
 *
 * @example
 * ```tsx
 * // Single key
 * <Kbd>Ctrl</Kbd>
 * ```
 *
 * @example
 * ```tsx
 * // Key combination
 * <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>
 * ```
 *
 * @example
 * ```tsx
 * // Custom appearance
 * <Kbd secondary filled>Enter</Kbd>
 * ```
 *
 * @see {@link KbdProps} for all available props
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(
  function Kbd(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.kbd} ref={ref} {...props} />
  }
);

Kbd.displayName = 'Kbd';
