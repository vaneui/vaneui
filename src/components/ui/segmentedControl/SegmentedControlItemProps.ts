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
  GapProps,
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  FontFamilyProps,
  CursorProps,
  TransitionProps,
  WhitespaceProps,
  DisabledProps,
} from "../props";

/** SegmentedControlItem component props. `className` and `style` go to the segment (the
 *  `<label>`); `ref` and the other HTML attributes go to its radio input. */
export type SegmentedControlItemProps = BaseProps &
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
  GapProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  CursorProps &
  TransitionProps &
  WhitespaceProps &
  DisabledProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'children' | 'type' | 'value'> & {
  /** Value the control reports when this segment is selected */
  value: string;
  /** Custom HTML tag or React component to render the segment as (a `<label>` by default) */
  tag?: React.ElementType;
};
