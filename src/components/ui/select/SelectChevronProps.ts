import type React from 'react';
import type { BaseProps, SizeProps, DisplayProps, ItemsProps, JustifyProps, PositionProps, PointerEventsProps, HideProps } from '../props';

/** Props for the select chevron sub-theme (decorative trailing dropdown indicator) */
export type SelectChevronProps = BaseProps &
  SizeProps & DisplayProps & ItemsProps & JustifyProps & PositionProps & PointerEventsProps & HideProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
