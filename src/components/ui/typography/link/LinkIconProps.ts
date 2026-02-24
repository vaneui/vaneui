import type React from 'react';
import type { BaseProps, DisplayProps, ItemsProps, JustifyProps, HideProps } from '../../props';

/** Props for the link icon sub-theme (decorative inner element) */
export type LinkIconProps = BaseProps &
  DisplayProps & ItemsProps & JustifyProps & HideProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
