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
  GapProps,
  FlexDirectionProps,
  ReverseProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  PaddingProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  WidthProps,
  HeightProps,
} from "../props";

/** CardHeader component props */
export type CardHeaderProps = BaseProps &
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
  ShapeProps &
  PaddingProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  WidthProps &
  HeightProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
