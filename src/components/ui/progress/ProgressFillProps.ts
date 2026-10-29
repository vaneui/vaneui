import type React from 'react';
import type {
  BaseProps,
  AppearanceProps,
  VariantProps,
  ShapeProps,
  TransitionProps,
  WidthProps,
  HeightProps
} from '../props';

/** Props for the Progress fill sub-theme (the bar inside the track) */
export type ProgressFillProps = BaseProps &
  AppearanceProps &
  VariantProps &
  ShapeProps &
  TransitionProps &
  WidthProps &
  HeightProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
