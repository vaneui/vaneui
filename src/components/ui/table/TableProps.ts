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
  // Omit the deprecated native `border` attr (number) so it doesn't collide with
  // VaneUI's boolean `border` prop and collapse the field to `never`.
  Omit<React.TableHTMLAttributes<HTMLTableElement>, 'className' | 'children' | 'border'> & {
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };
