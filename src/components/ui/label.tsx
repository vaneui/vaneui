import React, { forwardRef } from 'react';
import type {
  BaseProps,
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  FontFamilyProps,
  TextAlignProps,
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
  VariantProps,
  CursorProps
} from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

/** Label component props */
export type LabelProps = BaseProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
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
  VariantProps &
  CursorProps &
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A label component for form fields and inputs.
 *
 * Renders a semantic HTML label element with typography and styling support.
 * Typically used with form inputs like Input or Checkbox to provide
 * accessible labels. Clicking the label focuses the associated input.
 *
 * @example
 * ```tsx
 * // Basic label
 * <Label htmlFor="email">Email Address</Label>
 * ```
 *
 * @example
 * ```tsx
 * // Label with checkbox
 * <Label>
 *   <Checkbox id="terms" />
 *   I agree to the terms
 * </Label>
 * ```
 *
 * @example
 * ```tsx
 * // Styled label with custom appearance
 * <Label semibold primary>Username</Label>
 * ```
 *
 * @example
 * ```tsx
 * // Label with input
 * <Label htmlFor="password" className="block mb-2">
 *   Password
 * </Label>
 * <Input id="password" type="password" />
 * ```
 *
 * @see {@link LabelProps} for all available props
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.label} ref={ref} {...props} />;
  }
);

Label.displayName = 'Label';