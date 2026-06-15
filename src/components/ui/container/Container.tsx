import { forwardRef } from 'react';
import type { ContainerProps } from "./ContainerProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultContainerTheme } from "./defaultContainerTheme";

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.container ?? defaultContainerTheme} ref={ref} {...props} />
  }
);

Container.displayName = 'Container';
