import type React from 'react';
import type { BaseProps, SizeProps, DisplayProps, ItemsProps, JustifyProps, PositionProps, GapProps, PointerEventsProps, WhitespaceProps, HideProps } from '../props';

/** Props for the input section sub-theme (the startSection / endSection slot of Input and Select) */
export type InputSectionProps = BaseProps &
  SizeProps & DisplayProps & ItemsProps & JustifyProps & PositionProps & GapProps & PointerEventsProps & WhitespaceProps & HideProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
