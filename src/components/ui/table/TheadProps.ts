import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  AppearanceProps,
  VariantProps,
  HideProps,
  TransparentProps,
  ResponsiveProps,
} from "../props";

/** Thead component props */
export type TheadProps = BaseProps &
  SizeProps &
  AppearanceProps &
  VariantProps &
  HideProps &
  TransparentProps &
  ResponsiveProps &
  Omit<React.HTMLAttributes<HTMLTableSectionElement>, 'className' | 'children'> & {
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
