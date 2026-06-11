import { forwardRef } from 'react';
import type { ListItemProps } from './ListItemProps';
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";
import { defaultListItemTheme } from "./defaultListItemTheme";

// `icon` replaces the native list marker; data-has-icon suppresses list-style via base selector
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem({ icon, children, ...rest }, ref) {
    const theme = useTheme();
    const dataAttr = icon ? { 'data-has-icon': 'true' as const } : {};
    return (
      <ThemedComponent ref={ref} theme={theme?.listItem ?? defaultListItemTheme} {...rest} {...dataAttr}>
        {icon ? (
          // me- (margin-inline-end) keeps the icon-to-text gap on the correct side under RTL,
          // matching the logical margins of .vane-link-start-icon / .vane-link-end-icon in rules.css
          <span className="vane-list-item-icon me-(--gap) inline-flex items-center justify-center align-middle h-(--icon-size) min-w-(--icon-size)">
            {icon}
          </span>
        ) : null}
        {children}
      </ThemedComponent>
    );
  }
);

ListItem.displayName = 'ListItem';
