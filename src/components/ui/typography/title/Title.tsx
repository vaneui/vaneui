import { forwardRef } from 'react';
import type { TypographyProps } from "../common/TypographyProps";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

/**
 * A subsection heading component (h3).
 *
 * Renders a heading for subsections or cards. Medium size with subtle
 * responsive scaling. Use for content organization below section titles.
 *
 * @example
 * ```tsx
 * // Basic title
 * <Title>Getting Started</Title>
 * ```
 *
 * @example
 * ```tsx
 * // Title with custom appearance
 * <Title primary semibold>Installation</Title>
 * ```
 *
 * @example
 * ```tsx
 * // Title as a link
 * <Title href="/docs/intro">Documentation</Title>
 * ```
 *
 * @see {@link TypographyProps} for all available props
 */
export const Title = forwardRef<HTMLHeadingElement, TypographyProps>(
  function Title(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.title} {...props} />
  }
);

Title.displayName = 'Title';
