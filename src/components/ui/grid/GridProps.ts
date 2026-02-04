import React from 'react';
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
  VariantProps,
  ShapeProps,
  BorderProps,
  TransparentProps,
  ResponsiveProps,
  PaddingProps
} from '../props';

/** Grid component props */
export type GridProps = BaseProps &
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
  TransparentProps &
  ResponsiveProps &
  ShapeProps &
  BorderProps &
  PaddingProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
