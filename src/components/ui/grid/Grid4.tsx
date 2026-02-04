import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";

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
