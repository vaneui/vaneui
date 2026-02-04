import type React from 'react';
import type {
  BaseProps,
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  FontFamilyProps,
  TextAlignProps,
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
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  PaddingProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  WidthProps
} from "../props";

/** Card component props */
export type CardProps = BaseProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
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
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> &
  Partial<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>> & {
  /** URL to navigate to (renders component as anchor tag when used with tag="a") */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
