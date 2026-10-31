import type React from 'react';
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
  FlexProps,
  ShrinkProps,
  GapProps,
  FlexDirectionProps,
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
  CursorProps,
  TransparentProps,
  ResponsiveProps,
  TransitionProps,
  WidthProps,
  HeightProps,
  StatusProps,
  TruncateProps,
  WhitespaceProps,
  WordBreakProps
} from '../props';

/** Select component props */
export type SelectProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  WrapProps &
  FlexProps &
  ShrinkProps &
  GapProps &
  FlexDirectionProps &
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
  CursorProps &
  TransparentProps &
  ResponsiveProps &
  TransitionProps &
  WidthProps &
  HeightProps &
  StatusProps &
  TruncateProps &
  WhitespaceProps &
  WordBreakProps &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
  /** Muted prompt shown until an option is picked: a first, empty option that can't be chosen again. With `required`, the empty value fails validation. Ignored with `multiple` */
  placeholder?: string;
};
