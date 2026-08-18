import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  ItemsProps,
  AlignSelfProps,
  JustifyProps,
  PositionProps,
  DisplayProps,
  OverflowProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  FocusVisibleProps,
  ShapeProps,
  VariantProps,
  CursorProps,
  TransitionProps,
  StatusProps,
  WidthProps,
  HeightProps,
  TransparentProps,
  ResponsiveProps
} from '../props';

/** Switch component props */
export type SwitchProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  AlignSelfProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  FocusVisibleProps &
  ShapeProps &
  VariantProps &
  CursorProps &
  TransitionProps &
  StatusProps &
  WidthProps &
  HeightProps &
  TransparentProps &
  ResponsiveProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
