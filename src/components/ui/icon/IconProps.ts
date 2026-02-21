import type React from 'react';
import type { BaseProps, SizeProps, HideProps, DisplayProps, AppearanceProps, VariantProps } from "../props";

/** Icon component props — lightweight SVG wrapper */
export type IconProps = BaseProps &
  SizeProps &
  HideProps &
  DisplayProps &
  AppearanceProps &
  VariantProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
