import type React from 'react';
import type { BaseProps, DisplayProps, ItemsProps, JustifyProps, PositionProps, HideProps } from '../props';

/** Props for the checkbox indeterminate mark sub-theme (decorative inner element) */
export type CheckboxIndeterminateProps = BaseProps &
  DisplayProps & ItemsProps & JustifyProps & PositionProps & HideProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
