import type React from 'react';
import type {
  BaseProps,
  DisplayProps,
  ItemsProps,
  JustifyProps,
  JustifySelfProps,
  PositionProps,
  HideProps,
  ShapeProps,
  TransitionProps,
  PointerEventsProps
} from '../props';

/** Props for the switch thumb sub-theme (decorative sliding knob) */
export type SwitchThumbProps = BaseProps &
  DisplayProps &
  ItemsProps &
  JustifyProps &
  JustifySelfProps &
  PositionProps &
  HideProps &
  ShapeProps &
  TransitionProps &
  PointerEventsProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
