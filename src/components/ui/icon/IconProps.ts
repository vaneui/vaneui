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

/** Icon component props — SVG wrapper that supports opt-in container mode
 *  (padding + shape + appearance + filled/border/ring) for rendering as a
 *  colored box. With no container props set, renders as a lightweight inline
 *  span that inherits currentColor. */
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
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
