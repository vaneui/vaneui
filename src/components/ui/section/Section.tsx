import { forwardRef } from 'react';
import type { SectionProps } from "./SectionProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * A section container for grouping related content with generous spacing.
 *
 * A vertical flex container with built-in padding and `responsive: true`,
 * intended to organize page content into logical sections. Renders as a
 * `<div>` by default — pass `tag="section"` for semantic HTML.
 *
 * @example
 * ```tsx
 * // Basic section
 * <Section>
 *   <SectionTitle>About</SectionTitle>
 *   <Text>Section content here.</Text>
 * </Section>
 * ```
 *
 * @example
 * ```tsx
 * // Semantic <section> element
 * <Section tag="section">
 *   <Title>Features</Title>
 *   <Text>Feature descriptions...</Text>
 * </Section>
 * ```
 *
 * @example
 * ```tsx
 * // Two-column row that stacks on tablets — use Row, not Section
 * <Row tabletCol>
 *   <Card>Card 1</Card>
 *   <Card>Card 2</Card>
 * </Row>
 * ```
 *
 * @see {@link SectionProps} for all available props
 */
export const Section = forwardRef<HTMLDivElement, SectionProps>(
  function Section(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.section} ref={ref} {...props} />
  }
);

Section.displayName = 'Section';
