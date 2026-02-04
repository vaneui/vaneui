import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";

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
