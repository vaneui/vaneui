import type React from 'react';
import type { BaseProps, DisplayProps, ItemsProps, JustifyProps, PositionProps, HideProps } from '../props';

/** Props for the checkbox check mark sub-theme (decorative inner element) */
export type CheckboxCheckProps = BaseProps &
  DisplayProps & ItemsProps & JustifyProps & PositionProps & HideProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
