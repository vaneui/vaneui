import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  AppearanceProps,
  VariantProps,
  BorderProps,
  PaddingProps,
  TextAlignProps,
  WidthProps,
  HeightProps,
  ResponsiveProps,
} from "../props";

/** Td (table data cell) component props */
export type TdProps = BaseProps &
  SizeProps &
  AppearanceProps &
  VariantProps &
  BorderProps &
  PaddingProps &
  TextAlignProps &
  WidthProps &
  HeightProps &
  ResponsiveProps &
  Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'className' | 'children'> & {
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
