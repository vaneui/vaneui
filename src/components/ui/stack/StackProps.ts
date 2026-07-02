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
  FlexProps,
  ShrinkProps,
  GapProps,
  FlexDirectionProps,
  ReverseProps,
  BreakpointProps,
  PaddingProps,
  MarginProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  FocusVisibleProps,
  ShapeProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  TextAlignProps,
  WidthProps,
  HeightProps
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
  FlexProps &
  ShrinkProps &
  GapProps &
  FlexDirectionProps &
  ReverseProps &
  BreakpointProps &
  PaddingProps &
  MarginProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  FocusVisibleProps &
  ShapeProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  TextAlignProps &
  WidthProps &
  HeightProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> &
  Partial<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>> & {
  /** URL to navigate to (renders component as anchor tag) */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
