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
  VariantProps
} from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

/** Input component props */
export type InputProps = BaseProps &
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
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A text input field component for forms and user data entry.
 *
 * Provides a styled input element with support for all standard HTML input
 * attributes and types. Can be customized with appearances, sizes, and variants
 * to match your design system. Supports all native input types (text, email, password, etc.).
 *
 * @example
 * ```tsx
 * // Basic text input
 * <Input placeholder="Enter your name" />
 * ```
 *
 * @example
 * ```tsx
 * // Email input with primary styling
 * <Input type="email" primary outline placeholder="Email address" />
 * ```
 *
 * @example
 * ```tsx
 * // Large input with custom styling
 * <Input lg className="w-full" placeholder="Search..." />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled input with state
 * <Input value={value} onChange={(e) => setValue(e.target.value)} />
 * ```
 *
 * @see {@link InputProps} for all available props
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.input} {...props} />
  }
);

Input.displayName = 'Input';