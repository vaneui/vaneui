import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

/**
 * A blockquote component for displaying quoted content.
 *
 * Renders a styled `<blockquote>` with a left border accent.
 * Inherits appearance from parent by default for seamless embedding.
 *
 * @example
 * ```tsx
 * // Basic blockquote
 * <Blockquote>The only way to do great work is to love what you do.</Blockquote>
 * ```
 *
 * @example
 * ```tsx
 * // Blockquote with appearance
 * <Blockquote brand>Design is not just what it looks like.</Blockquote>
 * ```
 *
 * @example
 * ```tsx
 * // Blockquote with custom styling
 * <Blockquote secondary filled lg>Innovation distinguishes between a leader and a follower.</Blockquote>
 * ```
 *
 * @see {@link TypographyProps} for all available props
 */
export const Blockquote = forwardRef<HTMLQuoteElement, TypographyProps>(
  function Blockquote(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.blockquote} {...props} />
  }
);

Blockquote.displayName = 'Blockquote';
