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
 * // External link with auto target and rel
 * <Link href="https://example.com" external>
 *   Visit Example
 * </Link>
 * ```
 *
 * @see {@link LinkProps} for all available props
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const { external, ...rest } = props;
    const theme = useTheme();

    // Auto target="_blank" when external
    const finalTarget = rest.target ?? (external ? '_blank' : undefined);
    // Auto rel="noopener noreferrer" when target="_blank" (with or without external)
    const finalRel = rest.rel ?? (finalTarget === '_blank' ? 'noopener noreferrer' : undefined);

    const derivedProps = {
      ...rest,
      ...(finalTarget !== undefined && { target: finalTarget }),
      ...(finalRel !== undefined && { rel: finalRel }),
    };

    return <ThemedComponent ref={ref} theme={theme.link} {...derivedProps} />;
  }
);

Link.displayName = 'Link';
