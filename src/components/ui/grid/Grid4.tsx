import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";

export const Grid4 = forwardRef<HTMLDivElement, GridProps>(
  function Grid4(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.grid4} ref={ref} {...props} />
  }
);

Grid4.displayName = 'Grid4';
