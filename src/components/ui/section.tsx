import React, { forwardRef } from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  PositionProps,
  DisplayProps,
  OverflowProps,
  WrapProps,
  GapProps,
  FlexDirectionProps,
  ReverseProps,
  AppearanceProps,
  TransparentProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  PaddingProps,
  BreakpointProps,
  VariantProps
} from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

/** Section component props */
export type SectionProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  WrapProps &
  GapProps &
  FlexDirectionProps &
  ReverseProps &
  AppearanceProps &
  TransparentProps &
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  PaddingProps &
  BreakpointProps &
  VariantProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A semantic section container for grouping related content.
 *
 * Renders as a semantic HTML section element with generous layout spacing.
 * Use to organize page content into logical sections. Supports responsive
 * flex direction with breakpoint props (mobileCol, tabletCol, etc.).
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
 * // Section with padding and gap
 * <Section padding gap>
 *   <Title>Features</Title>
 *   <Text>Feature descriptions...</Text>
 * </Section>
 * ```
 *
 * @example
 * ```tsx
 * // Responsive section that stacks on tablets
 * <Section tabletCol gap>
 *   <Card>Card 1</Card>
 *   <Card>Card 2</Card>
 * </Section>
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
