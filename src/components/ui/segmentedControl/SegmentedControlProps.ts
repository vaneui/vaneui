import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  PositionProps,
  DisplayProps,
  OverflowProps,
  AppearanceProps,
  VariantProps,
  ShapeProps,
  PaddingProps,
  MarginProps,
  WidthProps,
} from "../props";
import type { CleanHTMLProps } from "../props/baseProps";

/** SegmentedControl component props */
export type SegmentedControlProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  VariantProps &
  ShapeProps &
  PaddingProps &
  MarginProps &
  WidthProps &
  CleanHTMLProps<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
  /** Name shared by the radios of the segments; generated when omitted */
  name?: string;
  /** Value of the selected segment; makes the control controlled */
  value?: string;
  /** Value of the segment selected at first, for an uncontrolled control */
  defaultValue?: string;
  /** Fires when the selection changes; `event.target.value` is the segment's value */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Disables every segment; a segment's own `disabled` wins */
  disabled?: boolean;
  /** Requires a selection when the control is in a form */
  required?: boolean;
};
