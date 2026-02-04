import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";

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
