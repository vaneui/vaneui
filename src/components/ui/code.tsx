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
  ResponsiveProps
} from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

/** Code component props */
export type CodeProps = BaseProps &
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
  Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * An inline code component for displaying code snippets or technical terms.
 *
 * Renders text in a monospace font with subtle background styling to
 * distinguish code from regular text. Ideal for inline code references,
 * variable names, or short code snippets within paragraphs.
 *
 * @example
 * ```tsx
 * // Basic inline code
 * <Code>const x = 10</Code>
 * ```
 *
 * @example
 * ```tsx
 * // Code with custom appearance
 * <Code primary filled>npm install</Code>
 * ```
 *
 * @example
 * ```tsx
 * // Code block style
 * <Code secondary outline lg mono>function hello() {}</Code>
 * ```
 *
 * @example
 * ```tsx
 * // Code with custom styling
 * <Code className="px-4 py-2">git commit -m "message"</Code>
 * ```
 *
 * @see {@link CodeProps} for all available props
 */
export const Code = forwardRef<HTMLElement, CodeProps>(
  function Code(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.code} ref={ref} {...props} />
  }
);

Code.displayName = 'Code';