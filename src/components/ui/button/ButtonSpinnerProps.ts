import type React from 'react';
import type { BaseProps, PositionProps, DisplayProps, ItemsProps, JustifyProps, OverflowProps, HideProps } from '../props';

/** Props for the button spinner sub-theme (decorative inner element) */
export type ButtonSpinnerProps = BaseProps &
  PositionProps & DisplayProps & ItemsProps & JustifyProps &
  OverflowProps & HideProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
