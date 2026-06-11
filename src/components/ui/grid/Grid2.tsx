import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";
import { defaultGrid2Theme } from "./defaultGrid2Theme";

export const Grid2 = forwardRef<HTMLDivElement, GridProps>(
  function Grid2(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.grid2 ?? defaultGrid2Theme} ref={ref} {...props} />
  }
);

Grid2.displayName = 'Grid2';
