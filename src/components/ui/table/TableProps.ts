import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  AppearanceProps,
  VariantProps,
  ShapeProps,
  BorderProps,
  WidthProps,
  MarginProps,
  TextAlignProps,
  HideProps,
  ResponsiveProps,
} from "../props";

/** Table component props */
export type TableProps = BaseProps &
  SizeProps &
  AppearanceProps &
  VariantProps &
  ShapeProps &
  BorderProps &
  WidthProps &
  MarginProps &
  TextAlignProps &
  HideProps &
  ResponsiveProps &
  Omit<React.TableHTMLAttributes<HTMLTableElement>, 'className' | 'children'> & {
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
