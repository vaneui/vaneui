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
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  VariantProps
} from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

/** Container component props */
export type ContainerProps = BaseProps &
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
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  VariantProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A page-level content wrapper with maximum width constraints.
 *
 * Provides consistent horizontal padding and centers content on the page.
 * Typically the outermost wrapper for page content. Uses layout spacing
 * (larger gaps) for structural organization.
 *
 * @example
 * ```tsx
 * // Basic container
 * <Container>
 *   <PageTitle>My Page</PageTitle>
 *   <Text>Page content goes here.</Text>
 * </Container>
 * ```
 *
 * @example
 * ```tsx
 * // Container with custom spacing
 * <Container lg gap>
 *   <Section>Section 1</Section>
 *   <Section>Section 2</Section>
 * </Container>
 * ```
 *
 * @example
 * ```tsx
 * // Full-width container
 * <Container className="max-w-none">
 *   Wide content
 * </Container>
 * ```
 *
 * @see {@link ContainerProps} for all available props
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.container} ref={ref} {...props} />
  }
);

Container.displayName = 'Container';
