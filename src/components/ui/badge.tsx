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
  WrapProps,
  GapProps,
  FlexDirectionProps,
  ReverseProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  FocusVisibleProps,
  ShapeProps,
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  FontFamilyProps,
  TextAlignProps,
  PaddingProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  TransitionProps,
  WhitespaceProps,
  WidthProps
} from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

/** Badge component props */
export type BadgeProps = BaseProps &
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
  AppearanceProps &
  BorderProps &
  ShadowProps &
  RingProps &
  FocusVisibleProps &
  ShapeProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  PaddingProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  TransitionProps &
  WhitespaceProps &
  WidthProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'children'> &
  Partial<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>> & {
  /** URL to navigate to (renders component as anchor tag) */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A compact badge component for displaying status, labels, or counts.
 *
 * Badges are typically used to highlight important information or indicate
 * status (e.g., "New", "Beta", notification counts). Supports the same
 * customization options as buttons including appearances, sizes, and variants.
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge>New</Badge>
 * ```
 *
 * @example
 * ```tsx
 * // Success badge with filled variant
 * <Badge success filled>Active</Badge>
 * ```
 *
 * @example
 * ```tsx
 * // Notification count badge
 * <Badge danger pill xs>3</Badge>
 * ```
 *
 * @example
 * ```tsx
 * // Badge as a link
 * <Badge href="/beta" info outline>Beta</Badge>
 * ```
 *
 * @see {@link BadgeProps} for all available props
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.badge} ref={ref} {...props} />
  }
);

Badge.displayName = 'Badge';
