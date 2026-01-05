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
  VariantProps
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
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A visual separator component for dividing content sections.
 *
 * Renders a horizontal line to separate content blocks. Can be styled
 * with different appearances and sizes. Useful for creating visual
 * hierarchy and content organization.
 *
 * @example
 * ```tsx
 * // Basic divider
 * <Text>Section 1</Text>
 * <Divider />
 * <Text>Section 2</Text>
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
