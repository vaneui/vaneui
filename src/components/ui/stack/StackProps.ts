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
  BreakpointProps,
  PaddingProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  TextAlignProps
} from "../props";

/** Stack component props */
export type StackProps = BaseProps &
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
  BreakpointProps &
  PaddingProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  TextAlignProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
