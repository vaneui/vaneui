import React from 'react';
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
  AppearanceProps,
  VariantProps,
  ResponsiveProps,
  TruncateProps,
  LetterSpacingProps,
  WidthProps,
  HeightProps,
  CursorProps
} from '../../props';

/**
 * Typography component props (for Text, PageTitle, SectionTitle, Title, Link, Blockquote).
 *
 * Intentionally does NOT include `TransparentProps`. Typography components
 * are background-less by design — see `typographyClassMappers.ts` — so the
 * `transparent` prop has no effect and is excluded from the type. For a
 * highlighted-text effect, use the `Mark` component.
 */
export type TypographyProps = BaseProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  TruncateProps &
  LetterSpacingProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  PositionProps &
  DisplayProps &
  OverflowProps &
  AppearanceProps &
  VariantProps &
  ResponsiveProps &
  WidthProps &
  HeightProps &
  CursorProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'children'> &
  Partial<Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>> & {
  /** URL to navigate to (renders component as anchor tag) */
  href?: string;
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
