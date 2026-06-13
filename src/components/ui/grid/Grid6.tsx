import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";
import { defaultGrid6Theme } from "./defaultGrid6Theme";

export const Grid6 = forwardRef<HTMLDivElement, GridProps>(
  function Grid6(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.grid6 ?? defaultGrid6Theme} ref={ref} {...props} />
  }
);

Grid6.displayName = 'Grid6';
