import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  DisplayProps,
  AppearanceProps,
  VariantProps,
  ItemsProps,
  JustifyProps,
  PositionProps,
  ShapeProps,
  PaddingProps,
  BorderProps,
  RingProps,
  ShadowProps,
  WidthProps,
  HeightProps,
  ShrinkProps,
  TransitionProps,
  TransparentProps,
} from "../props";

export type IconProps = BaseProps &
  SizeProps &
  HideProps &
  DisplayProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  AppearanceProps &
  VariantProps &
  ShapeProps &
  PaddingProps &
  BorderProps &
  RingProps &
  ShadowProps &
  WidthProps &
  HeightProps &
  ShrinkProps &
  TransitionProps &
  TransparentProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'children'> & {
  tag?: React.ElementType;
};
