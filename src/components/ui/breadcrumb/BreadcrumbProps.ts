import type React from 'react';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  PositionProps,
  DisplayProps,
  OverflowProps,
  AppearanceProps,
  VariantProps,
  MarginProps,
  FontFamilyProps,
  FontWeightProps,
} from "../props";
import type { CleanHTMLProps } from "../props/baseProps";

/** Breadcrumb component props */
export type BreadcrumbProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  VariantProps &
  MarginProps &
  FontFamilyProps &
  FontWeightProps &
  CleanHTMLProps<React.HTMLAttributes<HTMLElement>> & {
  /** Drawn between items instead of the chevron, such as "/" */
  separator?: React.ReactNode;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
