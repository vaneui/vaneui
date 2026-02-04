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
  ObjectFitProps
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
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
