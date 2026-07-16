import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  AppearanceProps,
  VariantProps,
  TextAlignProps,
  ResponsiveProps,
} from "../props";

/** Caption component props */
export type CaptionProps = BaseProps &
  SizeProps &
  AppearanceProps &
  VariantProps &
  TextAlignProps &
  ResponsiveProps &
  Omit<React.HTMLAttributes<HTMLTableCaptionElement>, 'className' | 'children'> & {
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
