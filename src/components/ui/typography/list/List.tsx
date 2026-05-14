import { forwardRef } from 'react';
import type { ListProps } from "./ListProps";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

export const List = forwardRef<HTMLUListElement, ListProps>(
  function List(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.list} {...props} />
  }
);

List.displayName = 'List';
