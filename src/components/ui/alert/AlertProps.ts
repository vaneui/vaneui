import type React from 'react';
import type {
  BaseProps,
  TextAlignProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  PositionProps,
  DisplayProps,
  OverflowProps,
  WrapProps,
  FlexProps,
  ShrinkProps,
  GapProps,
  FlexDirectionProps,
  BreakpointProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  PaddingProps,
  MarginProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  WidthProps,
  HeightProps
} from "../props";

/** Alert component props */
export type AlertProps = BaseProps &
  TextAlignProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  WrapProps &
  FlexProps &
  ShrinkProps &
  GapProps &
  FlexDirectionProps &
  BreakpointProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  PaddingProps &
  MarginProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  WidthProps &
  HeightProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Announce politely (role="status") instead of interrupting (role="alert") */
  polite?: boolean;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
