import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  AppearanceProps,
  ShapeProps,
  TransitionProps,
  OverflowProps,
  WidthProps,
  FlexProps,
  HideProps,
  MarginProps
} from "../props";

/** The value, or `indeterminate` for work of unknown length */
export type ProgressValueProps =
  | {
    /** Current value, clamped to the range 0 to `max` */
    value: number;
    /** Work of unknown length: a bar slides along the track and no value is announced */
    indeterminate?: false;
  }
  | {
    /** Ignored while `indeterminate` is set */
    value?: number;
    /** Work of unknown length: a bar slides along the track and no value is announced */
    indeterminate: true;
  };

/** Progress component props */
export type ProgressProps = Omit<BaseProps, 'children'> &
  SizeProps &
  AppearanceProps &
  ShapeProps &
  TransitionProps &
  OverflowProps &
  WidthProps &
  FlexProps &
  HideProps &
  MarginProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> &
  ProgressValueProps & {
  /** Upper bound of the range (default 100) */
  max?: number;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
