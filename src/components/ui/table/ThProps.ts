import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  AppearanceProps,
  VariantProps,
  BorderProps,
  PaddingProps,
  TextAlignProps,
  FontWeightProps,
  WidthProps,
  HeightProps,
  ResponsiveProps,
} from "../props";

/** Th (table header cell) component props */
export type ThProps = BaseProps &
  SizeProps &
  AppearanceProps &
  VariantProps &
  BorderProps &
  PaddingProps &
  TextAlignProps &
  FontWeightProps &
  WidthProps &
  HeightProps &
  ResponsiveProps &
  Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'className' | 'children'> & {
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
