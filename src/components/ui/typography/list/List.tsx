import { forwardRef } from 'react';
import type { ListProps } from "./ListProps";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";
import { warnSemanticTagOverride } from "../../../utils/warnSemanticTag";
import { defaultListTheme } from "./defaultListTheme";

export const List = forwardRef<HTMLUListElement, ListProps>(
  function List(props, ref) {
    const theme = useTheme();
    warnSemanticTagOverride('List', props.tag, ['ul', 'ol', 'menu']);
    return <ThemedComponent ref={ref} theme={theme?.list ?? defaultListTheme} {...props} />
  }
);

List.displayName = 'List';
