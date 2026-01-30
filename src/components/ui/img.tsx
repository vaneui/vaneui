import React, { forwardRef } from 'react';
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
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  VariantProps,
  ObjectFitProps
} from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

/** Img component props */
export type ImgProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  VariantProps &
  ObjectFitProps &
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * An image component with styling and layout support.
 *
 * Wraps the HTML img element with VaneUI's styling system. Supports all
 * standard image attributes (src, alt, width, height, etc.) plus additional
 * props for borders, shadows, shapes, and positioning.
 *
 * @example
 * ```tsx
 * // Basic image
 * <Img src="/photo.jpg" alt="Description" />
 * ```
 *
 * @example
 * ```tsx
 * // Rounded image with border
 * <Img src="/avatar.jpg" alt="User" pill border primary />
 * ```
 *
 * @example
 * ```tsx
 * // Image with shadow and custom size
 * <Img src="/product.jpg" alt="Product" shadow lg />
 * ```
 *
 * @example
 * ```tsx
 * // Full width responsive image
 * <Img src="/banner.jpg" alt="Banner" className="w-full h-auto" />
 * ```
 *
 * @see {@link ImgProps} for all available props
 */
export const Img = forwardRef<HTMLImageElement, ImgProps>(
  function Img(props, ref) {
    const theme = useTheme();

    return (
      <ThemedComponent theme={theme.img} ref={ref} {...props} />
    );
  }
);

Img.displayName = 'Img';