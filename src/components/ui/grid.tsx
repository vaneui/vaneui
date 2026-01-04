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
  TransparentProps,
  VariantProps,
  ShapeProps,
  BorderProps
} from './props';
import { ThemedComponent } from '../themedComponent';
import { useTheme } from "../themeContext";

/** Grid component props */
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
  TransparentProps &
  VariantProps &
  ShapeProps &
  BorderProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  /** Custom HTML tag or React component to render as */
  tag?: React.ElementType;
};

/**
 * A 2-column CSS grid container.
 *
 * Creates a responsive grid with 2 equal-width columns. Grid items automatically
 * fill available columns. Uses CSS Grid for precise layout control.
 *
 * @example
 * ```tsx
 * // Basic 2-column grid
 * <Grid2 gap>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 *   <Card>Item 4</Card>
 * </Grid2>
 * ```
 *
 * @example
 * ```tsx
 * // Grid with custom styling
 * <Grid2 gap lg className="auto-rows-fr">
 *   <div>Column 1</div>
 *   <div>Column 2</div>
 * </Grid2>
 * ```
 *
 * @see {@link GridProps} for all available props
 */
export const Grid2 = forwardRef<HTMLDivElement, GridProps>(
  function Grid2(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.grid2} ref={ref} {...props} />
  }
);

Grid2.displayName = 'Grid2';

/**
 * A 3-column CSS grid container.
 *
 * Creates a responsive grid with 3 equal-width columns. Ideal for card
 * layouts and feature displays. Grid items automatically wrap to new rows.
 *
 * @example
 * ```tsx
 * // Basic 3-column grid
 * <Grid3 gap>
 *   <Card>Feature 1</Card>
 *   <Card>Feature 2</Card>
 *   <Card>Feature 3</Card>
 * </Grid3>
 * ```
 *
 * @see {@link GridProps} for all available props
 */
export const Grid3 = forwardRef<HTMLDivElement, GridProps>(
  function Grid3(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.grid3} ref={ref} {...props} />
  }
);

Grid3.displayName = 'Grid3';

/**
 * A 4-column CSS grid container.
 *
 * Creates a responsive grid with 4 equal-width columns. Perfect for
 * image galleries or product listings with multiple items per row.
 *
 * @example
 * ```tsx
 * // Basic 4-column grid
 * <Grid4 gap>
 *   <Img src="/img1.jpg" alt="1" />
 *   <Img src="/img2.jpg" alt="2" />
 *   <Img src="/img3.jpg" alt="3" />
 *   <Img src="/img4.jpg" alt="4" />
 * </Grid4>
 * ```
 *
 * @see {@link GridProps} for all available props
 */
export const Grid4 = forwardRef<HTMLDivElement, GridProps>(
  function Grid4(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.grid4} ref={ref} {...props} />
  }
);

Grid4.displayName = 'Grid4';

/**
 * A 5-column CSS grid container.
 *
 * Creates a responsive grid with 5 equal-width columns. Useful for
 * dense layouts with many small items, like icon grids or tag clouds.
 *
 * @example
 * ```tsx
 * // Basic 5-column grid
 * <Grid5 gap>
 *   <Badge>Tag 1</Badge>
 *   <Badge>Tag 2</Badge>
 *   <Badge>Tag 3</Badge>
 *   <Badge>Tag 4</Badge>
 *   <Badge>Tag 5</Badge>
 * </Grid5>
 * ```
 *
 * @see {@link GridProps} for all available props
 */
export const Grid5 = forwardRef<HTMLDivElement, GridProps>(
  function Grid5(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.grid5} ref={ref} {...props} />
  }
);

Grid5.displayName = 'Grid5';

/**
 * A 6-column CSS grid container.
 *
 * Creates a responsive grid with 6 equal-width columns. Ideal for very
 * dense layouts or dashboard widgets with many small components.
 *
 * @example
 * ```tsx
 * // Basic 6-column grid
 * <Grid6 gap>
 *   <Chip>Item 1</Chip>
 *   <Chip>Item 2</Chip>
 *   <Chip>Item 3</Chip>
 *   <Chip>Item 4</Chip>
 *   <Chip>Item 5</Chip>
 *   <Chip>Item 6</Chip>
 * </Grid6>
 * ```
 *
 * @see {@link GridProps} for all available props
 */
export const Grid6 = forwardRef<HTMLDivElement, GridProps>(
  function Grid6(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.grid6} ref={ref} {...props} />
  }
);

Grid6.displayName = 'Grid6';