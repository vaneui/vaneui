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

/** Tr component props */
export type TrProps = BaseProps &
  SizeProps &
  AppearanceProps &
  VariantProps &
  HideProps &
  TransparentProps &
  ResponsiveProps &
  Omit<React.HTMLAttributes<HTMLTableRowElement>, 'className' | 'children'> & {
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
