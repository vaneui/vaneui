import { forwardRef } from 'react';
import type { TypographyProps } from "../common/TypographyProps";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

/**
 * A body text component (p).
 *
 * Renders paragraph text with automatic URL detection and link conversion.
 * Use for main content, descriptions, and body copy. Can be rendered as
 * a link when href prop is provided.
 *
 * @example
 * ```tsx
 * // Basic paragraph
 * <Text>This is a paragraph of body text.</Text>
 * ```
 *
 * @example
 * ```tsx
 * // Text with custom styling
 * <Text secondary lg>Large secondary text content.</Text>
 * ```
 *
 * @example
 * ```tsx
 * // Text as a link
 * <Text href="/about">Learn more</Text>
 * ```
 *
 * @example
 * ```tsx
 * // Text with typography props
 * <Text mono semibold>Monospace bold text</Text>
 * ```
 *
 * @see {@link TypographyProps} for all available props
 */
export const Text = forwardRef<HTMLParagraphElement, TypographyProps>(
  function Text(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.text} {...props} />
  }
);

Text.displayName = 'Text';
