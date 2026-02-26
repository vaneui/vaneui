import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  DisplayProps,
  OverflowProps,
  WrapProps,
  GapProps,
  FlexDirectionProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  PaddingProps,
  VariantProps,
  TransparentProps,
  WidthProps,
  HeightProps,
  PlacementProps,
} from "../props";

/** MenuContent component props (dropdown container) */
export type MenuContentProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  DisplayProps &
  OverflowProps &
  WrapProps &
  GapProps &
  FlexDirectionProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  PaddingProps &
  VariantProps &
  TransparentProps &
  WidthProps &
  HeightProps &
  PlacementProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
