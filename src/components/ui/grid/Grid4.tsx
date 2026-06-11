import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";
import { defaultGrid4Theme } from "./defaultGrid4Theme";

export const Grid4 = forwardRef<HTMLDivElement, GridProps>(
  function Grid4(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.grid4 ?? defaultGrid4Theme} ref={ref} {...props} />
  }
);

Grid4.displayName = 'Grid4';
