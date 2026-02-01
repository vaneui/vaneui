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
  FocusVisibleProps,
  ShapeProps,
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  FontFamilyProps,
  TextAlignProps,
  PaddingProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  CursorProps,
  TransitionProps,
  WhitespaceProps,
  WidthProps,
  HeightProps
} from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

/**
 * Button component props
 */
export type ButtonProps = BaseProps &
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
  FocusVisibleProps &
  ShapeProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  PaddingProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  CursorProps &
  TransitionProps &
  WhitespaceProps &
  WidthProps &
  HeightProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> &
  Partial<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>> & {
  /** URL to navigate to (renders component as anchor tag) */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A clickable button component with customizable appearance, size, and behavior.
 *
 * Supports rendering as a button element or anchor tag when href is provided.
 * Can be styled with different appearances (primary, secondary, success, etc.),
 * sizes (xs to xl), and variants (filled, outline).
 *
 * @example
 * ```tsx
 * // Basic button
 * <Button>Click me</Button>
 * ```
 *
 * @example
 * ```tsx
 * // Primary filled button with large size
 * <Button primary lg filled>Submit</Button>
 * ```
 *
 * @example
 * ```tsx
 * // Button as a link
 * <Button href="/about" secondary>About</Button>
 * ```
 *
 * @example
 * ```tsx
 * // Danger button with custom styling
 * <Button danger outline className="w-full">Delete</Button>
 * ```
 *
 * @see {@link ButtonProps} for all available props
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.button} {...props} />
  }
);

Button.displayName = 'Button';
