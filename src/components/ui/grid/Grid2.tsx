import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";

export const Grid2 = forwardRef<HTMLDivElement, GridProps>(
  function Grid2(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.grid2} ref={ref} {...props} />
  }
);

Grid2.displayName = 'Grid2';
