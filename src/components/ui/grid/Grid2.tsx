import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";

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
