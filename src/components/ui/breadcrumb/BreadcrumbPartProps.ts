import type React from 'react';
import type { BaseProps, DisplayProps, ItemsProps, JustifyProps, WrapProps, GapProps, ShrinkProps } from "../props";

/** Props of the trail list sub-theme (`<ol>`) */
export type BreadcrumbListProps = BaseProps & DisplayProps & ItemsProps & JustifyProps & WrapProps & GapProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/** Props of the separator sub-theme */
export type BreadcrumbSeparatorProps = BaseProps & DisplayProps & ItemsProps & ShrinkProps & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
