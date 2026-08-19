import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  AppearanceProps,
  VariantProps,
  DisplayProps,
  HideProps,
  MarginProps
} from "../props";

/** Spinner component props */
export type SpinnerProps = BaseProps &
  SizeProps &
  AppearanceProps &
  VariantProps &
  DisplayProps &
  HideProps &
  MarginProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
