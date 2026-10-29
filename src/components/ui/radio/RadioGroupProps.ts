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
  WrapProps,
  FlexProps,
  ShrinkProps,
  GapProps,
  FlexDirectionProps,
  BreakpointProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  FocusVisibleProps,
  ShapeProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  TextAlignProps,
  PaddingProps,
  MarginProps,
  WidthProps,
  HeightProps,
  CleanHTMLProps
} from '../props';

/** RadioGroup component props */
export type RadioGroupProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  WrapProps &
  FlexProps &
  ShrinkProps &
  GapProps &
  FlexDirectionProps &
  BreakpointProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  FocusVisibleProps &
  ShapeProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  TextAlignProps &
  PaddingProps &
  MarginProps &
  WidthProps &
  HeightProps &
  CleanHTMLProps<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
  /** Name shared by every Radio in the group; generated when omitted */
  name?: string;
  /** Selected value — makes the group controlled */
  value?: string;
  /** Initially selected value for an uncontrolled group */
  defaultValue?: string;
  /** Fires when any Radio in the group changes */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Disables every Radio in the group; a Radio's own `disabled` wins */
  disabled?: boolean;
  /** Makes every Radio in the group read-only; a Radio's own `readOnly` wins */
  readOnly?: boolean;
  /** Marks every Radio in the group required; a Radio's own `required` wins */
  required?: boolean;
  /** Marks every Radio in the group invalid; a Radio's own `invalid` wins */
  invalid?: boolean;
};
