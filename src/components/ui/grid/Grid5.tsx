import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";

export const Grid5 = forwardRef<HTMLDivElement, GridProps>(
  function Grid5(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.grid5} ref={ref} {...props} />
  }
);

Grid5.displayName = 'Grid5';
