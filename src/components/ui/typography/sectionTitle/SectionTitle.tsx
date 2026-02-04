import { forwardRef } from 'react';
import type { TypographyProps } from "../common/TypographyProps";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

/**
 * A section heading component (h2).
 *
 * Renders a heading for major sections of content. Medium-large size with
 * responsive scaling on smaller screens. Typically used to divide page
 * content into logical sections.
 *
 * @example
 * ```tsx
 * // Basic section title
 * <SectionTitle>Features</SectionTitle>
 * ```
 *
 * @example
 * ```tsx
 * // Section title with styling
 * <SectionTitle secondary bold>About Us</SectionTitle>
 * ```
 *
 * @example
 * ```tsx
 * // Section title as a link
 * <SectionTitle href="#features">Jump to Features</SectionTitle>
 * ```
 *
 * @see {@link TypographyProps} for all available props
 */
export const SectionTitle = forwardRef<HTMLHeadingElement, TypographyProps>(
  function SectionTitle(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.sectionTitle} {...props} />
  }
);

SectionTitle.displayName = 'SectionTitle';
