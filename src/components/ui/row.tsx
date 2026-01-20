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
  BreakpointProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  TextAlignProps,
  PaddingProps
} from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

/** Row component props */
export type RowProps = BaseProps &
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
  BreakpointProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  TextAlignProps &
  PaddingProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A horizontal flex container for arranging elements side-by-side.
 *
 * Arranges children horizontally with consistent spacing. Supports responsive
 * breakpoints to switch to vertical stacking on smaller screens. Uses layout
 * spacing for structural organization.
 *
 * @example
 * ```tsx
 * // Basic horizontal row
 * <Row gap>
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 * </Row>
 * ```
 *
 * @example
 * ```tsx
 * // Row with space-between
 * <Row justifyBetween itemsCenter>
 *   <Title>Page Header</Title>
 *   <Button>CTA</Button>
 * </Row>
 * ```
 *
 * @example
 * ```tsx
 * // Responsive row (stacks on tablets and below)
 * <Row tabletCol gap>
 *   <Card>Card 1</Card>
 *   <Card>Card 2</Card>
 *   <Card>Card 3</Card>
 * </Row>
 * ```
 *
 * @see {@link RowProps} for all available props
 */
export const Row = forwardRef<HTMLDivElement, RowProps>(
  function Row(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.row} ref={ref} {...props} />
  }
);

Row.displayName = 'Row';
