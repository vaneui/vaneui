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
  VariantProps
} from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

/** Col component props */
export type ColProps = BaseProps &
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
  VariantProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A column flex container for vertical content organization.
 *
 * Arranges children in a column (vertical) layout with consistent spacing.
 * Similar to Stack but without responsive breakpoints. Use for predictable
 * vertical layouts that don't need to change based on screen size.
 *
 * @example
 * ```tsx
 * // Basic column
 * <Col gap>
 *   <Title>Column Content</Title>
 *   <Text>First paragraph</Text>
 *   <Text>Second paragraph</Text>
 * </Col>
 * ```
 *
 * @example
 * ```tsx
 * // Column with centered items
 * <Col itemsCenter justifyCenter gap>
 *   <Badge>Status</Badge>
 *   <Button>Action</Button>
 * </Col>
 * ```
 *
 * @example
 * ```tsx
 * // Full-height column
 * <Col className="h-screen" justifyBetween>
 *   <header>Header</header>
 *   <main>Main Content</main>
 *   <footer>Footer</footer>
 * </Col>
 * ```
 *
 * @see {@link ColProps} for all available props
 */
export const Col = forwardRef<HTMLDivElement, ColProps>(
  function Col(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.col} ref={ref} {...props} />
  }
);
