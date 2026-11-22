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
  ShrinkProps,
  AppearanceProps,
  VariantProps,
  BorderProps,
  RingProps,
  ShapeProps,
  FontWeightProps,
  MarginProps,
} from "../props";
import type { CleanHTMLProps } from "../props/baseProps";

/** Avatar component props */
export type AvatarProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  ShrinkProps &
  AppearanceProps &
  VariantProps &
  BorderProps &
  RingProps &
  ShapeProps &
  FontWeightProps &
  MarginProps &
  CleanHTMLProps<React.HTMLAttributes<HTMLSpanElement>> & {
  /** Image URL. If it is missing or fails to load, the avatar shows its `children`, else the initials of `name`, else a person icon */
  src?: string;
  /** Text alternative of the image; defaults to `name` */
  alt?: string;
  /** Name of the person or thing: the accessible name, and the source of the initials (up to two letters) */
  name?: string;
  /** Attributes for the inner `<img>` (loading, srcSet, referrerPolicy, …) */
  imgProps?: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'className'>;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
