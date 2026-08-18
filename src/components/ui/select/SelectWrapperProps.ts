import type React from 'react';
import type { BaseProps, DisplayProps, PositionProps, WidthProps, ItemsProps, JustifyProps, HideProps } from '../props';

/** Props for the select wrapper sub-theme (positions the field + overlaid chevron) */
export type SelectWrapperProps = BaseProps &
  DisplayProps & PositionProps & WidthProps & ItemsProps & JustifyProps & HideProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
