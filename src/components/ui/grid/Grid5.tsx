import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";

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
