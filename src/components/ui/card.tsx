import React, { forwardRef } from 'react';
import type {
  BaseProps,
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  FontFamilyProps,
  TextAlignProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  PositionProps,
  DisplayProps,
  OverflowProps,
  WrapProps,
  GapProps,
  FlexDirectionProps,
  ReverseProps,
  BreakpointProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  PaddingProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps
} from "./props";
import { ThemedComponent } from "../themedComponent";
import { useTheme } from "../themeContext";

/** Card component props */
export type CardProps = BaseProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  WrapProps &
  GapProps &
  FlexDirectionProps &
  ReverseProps &
  BreakpointProps &
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  ShapeProps &
  PaddingProps &
  VariantProps &
  TransparentProps &
    ResponsiveProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> &
  Partial<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>> & {
  /** URL to navigate to (renders component as anchor tag when used with tag="a") */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A container component for grouping related content with padding and borders.
 *
 * Cards provide visual separation and organization for content blocks. Support
 * responsive flex direction with breakpoint props. Use for content cards,
 * feature boxes, or any grouped content that needs visual distinction.
 *
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <Title>Card Title</Title>
 *   <Text>Card content goes here.</Text>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Card with styling
 * <Card primary outline shadow padding gap>
 *   <Title>Feature</Title>
 *   <Text>Description of the feature</Text>
 *   <Button>Learn More</Button>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Responsive card layout
 * <Card tabletCol gap padding>
 *   <Img src="/image.jpg" alt="Image" />
 *   <div>
 *     <Title>Content</Title>
 *     <Text>Details here</Text>
 *   </div>
 * </Card>
 * ```
 *
 * @see {@link CardProps} for all available props
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.card} {...props} />
  }
);

Card.displayName = 'Card';
