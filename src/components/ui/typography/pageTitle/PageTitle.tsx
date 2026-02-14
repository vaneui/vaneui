import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

/**
 * A top-level page heading component (h1).
 *
 * Renders the main heading for a page with large, bold typography.
 * Automatically scales down on smaller screens for responsive design.
 * Can be rendered as a link when href prop is provided.
 *
 * @example
 * ```tsx
 * // Basic page title
 * <PageTitle>Welcome to My Site</PageTitle>
 * ```
 *
 * @example
 * ```tsx
 * // Page title with custom styling
 * <PageTitle primary xl>Product Launch</PageTitle>
 * ```
 *
 * @example
 * ```tsx
 * // Page title as a link
 * <PageTitle href="/">Home Page</PageTitle>
 * ```
 *
 * @see {@link TypographyProps} for all available props
 */
export const PageTitle = forwardRef<HTMLHeadingElement, TypographyProps>(
  function PageTitle(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.pageTitle} {...props} />
  }
);

PageTitle.displayName = 'PageTitle';
