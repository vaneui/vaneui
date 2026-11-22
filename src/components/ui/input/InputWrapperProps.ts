import type React from 'react';
import type { BaseProps, DisplayProps, PositionProps, WidthProps, ItemsProps, JustifyProps, HideProps, ShrinkProps, DisabledProps } from '../props';

/** Props for the input wrapper sub-theme (positions the field + overlaid error icon) */
export type InputWrapperProps = BaseProps &
  DisplayProps & PositionProps & WidthProps & ItemsProps & JustifyProps & HideProps & ShrinkProps & DisabledProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
