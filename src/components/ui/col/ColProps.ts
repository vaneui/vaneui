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
  PaddingProps,
  WidthProps,
  HeightProps
} from '../props';

/** Col component props */
export type ColProps = BaseProps &
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
  PaddingProps &
  WidthProps &
  HeightProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> &
  Partial<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>> & {
  /** URL to navigate to (renders component as anchor tag) */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
