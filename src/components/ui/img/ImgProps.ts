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
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  VariantProps,
  ObjectFitProps,
  WidthProps,
  HeightProps,
  TransparentProps,
  ResponsiveProps,
  FocusVisibleProps
} from '../props';

/** Img component props */
export type ImgProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  VariantProps &
  ObjectFitProps &
  WidthProps &
  HeightProps &
  TransparentProps &
  ResponsiveProps &
  FocusVisibleProps &
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
