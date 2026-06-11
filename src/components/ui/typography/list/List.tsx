import { forwardRef } from 'react';
import type { ListProps } from "./ListProps";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";
import { defaultListTheme } from "./defaultListTheme";

export const List = forwardRef<HTMLUListElement, ListProps>(
  function List(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme?.list ?? defaultListTheme} {...props} />
  }
);

List.displayName = 'List';
