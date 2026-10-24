import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  AppearanceProps,
  VariantProps,
  ShapeProps,
  WidthProps,
  FlexProps,
  HideProps,
  MarginProps
} from "../props";

/** Progress component props */
export type ProgressProps = Omit<BaseProps, 'children'> &
  SizeProps &
  AppearanceProps &
  VariantProps &
  ShapeProps &
  WidthProps &
  FlexProps &
  HideProps &
  MarginProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Current value, clamped to the range 0 to `max` */
  value: number;
  /** Upper bound of the range (default 100) */
  max?: number;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
