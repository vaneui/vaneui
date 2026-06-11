import { forwardRef } from 'react';
import type { GridProps } from './GridProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from "../../themeContext";
import { defaultGrid3Theme } from "./defaultGrid3Theme";

export const Grid3 = forwardRef<HTMLDivElement, GridProps>(
  function Grid3(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.grid3 ?? defaultGrid3Theme} ref={ref} {...props} />
  }
);

Grid3.displayName = 'Grid3';
