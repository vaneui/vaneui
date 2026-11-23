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
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
  /** Content at the start edge inside the field: an icon, a prefix such as "https://", or a small button. The field reserves its width. With a section, className, width, visibility and the sizing part of style go on the wrapper, as on Select */
  startSection?: React.ReactNode;
  /** Content at the end edge inside the field: an icon, a unit such as "kg", or a small button (clear, show password, copy). The field reserves its width */
  endSection?: React.ReactNode;
};
