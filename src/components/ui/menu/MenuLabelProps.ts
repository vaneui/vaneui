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
  WrapProps,
  GapProps,
  FlexDirectionProps,
  ReverseProps,
  AppearanceProps,
  BorderProps,
  ShadowProps,
  RingProps,
  ShapeProps,
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  FontFamilyProps,
  TextAlignProps,
  PaddingProps,
  VariantProps,
  CursorProps,
  TransitionProps,
  WhitespaceProps,
  WidthProps,
  HeightProps,
  ResponsiveProps,
  FocusVisibleProps,
  DisabledProps
} from "../props";

/**
 * MenuLabel component props — non-interactive section heading for menu groups.
 *
 * Intentionally does NOT include `TransparentProps`. MenuLabel is
 * background-less by design (see `defaultMenuLabelTheme.ts` and the
 * `menu.test.tsx` "should have no background classes" assertion), so the
 * `transparent` prop has no effect and is excluded from the type.
 */
export type MenuLabelProps = BaseProps &
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
  ShapeProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  FontFamilyProps &
  TextAlignProps &
  PaddingProps &
  VariantProps &
  CursorProps &
  TransitionProps &
  WhitespaceProps &
  WidthProps &
  HeightProps &
  ResponsiveProps &
  FocusVisibleProps &
  DisabledProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
