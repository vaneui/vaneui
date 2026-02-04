import { forwardRef } from 'react';
import type { LinkProps } from "./LinkProps";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

/**
 * An anchor link component (a).
 *
 * Renders a hyperlink with hover underline effect. Supports appearance props
 * for custom color styling. Use for navigation links and clickable text.
 *
 * @example
 * ```tsx
 * // Basic link
 * <Link href="/about">About Us</Link>
 * ```
 *
 * @example
 * ```tsx
 * // Styled link with size and font weight
 * <Link href="/contact" lg semibold>Contact</Link>
 * ```
 *
 * @example
 * ```tsx
 * // External link
 * <Link href="https://example.com" target="_blank" rel="noopener">
 *   Visit Example
 * </Link>
 * ```
 *
 * @see {@link LinkProps} for all available props
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.link} {...props} />
  }
);

Link.displayName = 'Link';
