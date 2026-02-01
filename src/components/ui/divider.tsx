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
  AppearanceProps,
  PaddingProps,
  VariantProps,
  OrientationProps
} from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

/** Divider component props */
export type DividerProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  PaddingProps &
  VariantProps &
  OrientationProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A visual separator component for dividing content sections.
 *
 * Renders a horizontal line by default to separate content blocks. Can be styled
 * with different appearances and sizes. Supports vertical orientation for
 * side-by-side content. Useful for creating visual hierarchy and content organization.
 *
 * @example
 * ```tsx
 * // Basic divider (horizontal)
 * <Text>Section 1</Text>
 * <Divider />
 * <Text>Section 2</Text>
 * ```
 *
 * @example
 * ```tsx
 * // Vertical divider
 * <Row>
 *   <Text>Left</Text>
 *   <Divider vertical />
 *   <Text>Right</Text>
 * </Row>
 * ```
 *
 * @example
 * ```tsx
 * // Styled divider
 * <Divider primary lg />
 * ```
 *
 * @example
 * ```tsx
 * // Divider with padding
 * <Divider padding />
 * ```
 *
 * @see {@link DividerProps} for all available props
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.divider} ref={ref} {...props} />
  }
);

Divider.displayName = 'Divider';
