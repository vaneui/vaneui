import type React from 'react';
import type { BaseProps, SizeProps, DisplayProps, ItemsProps, JustifyProps, PositionProps, PointerEventsProps, HideProps } from '../props';

/** Props for the input error-icon sub-theme (decorative trailing alert icon) */
export type InputErrorIconProps = BaseProps &
  SizeProps & DisplayProps & ItemsProps & JustifyProps & PositionProps & PointerEventsProps & HideProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
