import React from 'react';
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
  AppearanceProps,
  VariantProps,
  ListStyleProps,
  ListPositionProps,
  GapProps,
  PaddingProps,
  TruncateProps,
  WidthProps,
  HeightProps,
  TransparentProps,
  ResponsiveProps
} from '../../props';

/** List component props */
export type ListProps = BaseProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  TruncateProps &
  ListStyleProps &
  ListPositionProps &
  GapProps &
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
  WidthProps &
  HeightProps &
  TransparentProps &
  ResponsiveProps &
  Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
