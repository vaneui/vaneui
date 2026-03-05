import type React from 'react';
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
  BorderProps,
  ShadowProps,
  RingProps,
  VariantProps,
  CursorProps,
  WidthProps,
  HeightProps,
  TransparentProps,
  ResponsiveProps,
  TruncateProps
} from "../props";

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
  BorderProps &
  ShadowProps &
  RingProps &
  VariantProps &
  CursorProps &
  WidthProps &
  HeightProps &
  TransparentProps &
  ResponsiveProps &
  TruncateProps &
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
