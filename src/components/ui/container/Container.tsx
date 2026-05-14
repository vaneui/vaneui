import { forwardRef } from 'react';
import type { ContainerProps } from "./ContainerProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.container} ref={ref} {...props} />
  }
);

Container.displayName = 'Container';
