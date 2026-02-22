import { forwardRef } from 'react';
import type { MarkProps } from "./MarkProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * A highlight/mark component for emphasizing text.
 *
 * Renders a styled `<mark>` element with a background highlight color.
 * Uses warning (yellow) appearance by default for a natural highlighter effect.
 *
 * @example
 * ```tsx
 * // Basic highlight
 * <Text>This is <Mark>important</Mark> text.</Text>
 * ```
 *
 * @example
 * ```tsx
 * // Custom appearance
 * <Mark success>Approved</Mark>
 * ```
 *
 * @example
 * ```tsx
 * // Filled highlight
 * <Mark danger filled>Critical</Mark>
 * ```
 *
 * @see {@link MarkProps} for all available props
 */
export const Mark = forwardRef<HTMLElement, MarkProps>(
  function Mark(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.mark} ref={ref} {...props} />
  }
);

Mark.displayName = 'Mark';
