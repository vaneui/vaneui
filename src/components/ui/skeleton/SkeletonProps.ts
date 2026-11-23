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
  ShrinkProps,
  ShapeProps,
  WidthProps,
  HeightProps,
  AspectProps,
  MarginProps,
} from "../props";
import type { CleanHTMLProps } from "../props/baseProps";

/** Skeleton component props */
export type SkeletonProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  ShrinkProps &
  ShapeProps &
  WidthProps &
  HeightProps &
  AspectProps &
  MarginProps &
  CleanHTMLProps<React.HTMLAttributes<HTMLDivElement>> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
