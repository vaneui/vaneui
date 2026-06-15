import type React from 'react';
import type {
  InheritSizeProps,
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
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  FontFamilyProps,
  TextAlignProps,
  PaddingProps,
  VariantProps,
  CursorProps,
  TransitionProps,
  WhitespaceProps,
  WidthProps,
  HeightProps,
  ResponsiveProps,
  FocusVisibleProps,
  DisabledProps
} from "../props";

// MenuLabel is background-less by design, so TransparentProps is intentionally excluded
export type MenuLabelProps = BaseProps &
  SizeProps &
  InheritSizeProps &
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
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  PaddingProps &
  VariantProps &
  CursorProps &
  TransitionProps &
  WhitespaceProps &
  WidthProps &
  HeightProps &
  ResponsiveProps &
  FocusVisibleProps &
  DisabledProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  tag?: React.ElementType;
};
