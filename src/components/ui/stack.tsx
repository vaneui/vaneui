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
  PaddingProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  TextAlignProps
} from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

/** Stack component props */
export type StackProps = BaseProps &
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
  PaddingProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  TextAlignProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A vertical flex container for stacking elements.
 *
 * Arranges children vertically with consistent spacing. Supports responsive
 * breakpoints to switch to horizontal layout on larger screens. Uses layout
 * spacing for structural organization.
 *
 * @example
 * ```tsx
 * // Basic vertical stack
 * <Stack gap>
 *   <Button>Button 1</Button>
 *   <Button>Button 2</Button>
 *   <Button>Button 3</Button>
 * </Stack>
 * ```
 *
 * @example
 * ```tsx
 * // Stack with padding and alignment
 * <Stack padding gap itemsCenter>
 *   <Title>Centered Content</Title>
 *   <Text>All items are centered</Text>
 * </Stack>
 * ```
 *
 * @example
 * ```tsx
 * // Responsive stack (becomes horizontal on desktop)
 * <Stack desktopCol gap>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </Stack>
 * ```
 *
 * @see {@link StackProps} for all available props
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  function Stack(props, ref) {
    const theme = useTheme();
    const stackTheme = theme.stack;
    return <ThemedComponent theme={stackTheme} ref={ref} {...props} />
  }
);

Stack.displayName = 'Stack';
