import { forwardRef } from 'react';
import type { ColProps } from "./ColProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const Col = forwardRef<HTMLDivElement, ColProps>(
  function Col(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.col} ref={ref} {...props} />
  }
);

Col.displayName = 'Col';
