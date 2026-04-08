import React from 'react';
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
  VariantProps,
  ShapeProps,
  BorderProps,
  TransparentProps,
  ResponsiveProps,
  PaddingProps,
  WidthProps,
  HeightProps,
} from '../props';

/**
 * Grid component props.
 *
 * Grid uses CSS `display: grid`, so several props that exist on Container
 * are intentionally NOT included because they have no effect on a grid
 * container or are not wired up in `gridSubThemes`:
 *   - `BreakpointProps` (mobileCol/tabletCol/desktopCol) — applies
 *     `flex-direction: column`, ignored by grid layout.
 *   - `ShadowProps` / `RingProps` — `gridSubThemes` has no shadow/ring
 *     mappers.
 *   - `TextAlignProps` — Grid is a layout primitive, not a text container.
 *
 * If you need any of the above, wrap the Grid in a Card/Section instead.
 */
export type GridProps = BaseProps &
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
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  ShapeProps &
  BorderProps &
  PaddingProps &
  WidthProps &
  HeightProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};
