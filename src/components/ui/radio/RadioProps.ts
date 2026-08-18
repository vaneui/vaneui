import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  ItemsProps,
  AlignSelfProps,
  JustifyProps,
  PositionProps,
  DisplayProps,
  OverflowProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  FocusVisibleProps,
  ShapeProps,
  VariantProps,
  CursorProps,
  TransitionProps,
  StatusProps,
  WidthProps,
  HeightProps,
  TransparentProps,
  ResponsiveProps
} from '../props';
import type { CheckboxCheckProps } from '../checkbox/CheckboxCheckProps';

/** Radio component props */
export type RadioProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  AlignSelfProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  FocusVisibleProps &
  ShapeProps &
  VariantProps &
  CursorProps &
  TransitionProps &
  StatusProps &
  WidthProps &
  HeightProps &
  TransparentProps &
  ResponsiveProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/** Props for the radio dot sub-theme — same decorative-overlay contract as Checkbox's check mark */
export type RadioDotProps = CheckboxCheckProps;
