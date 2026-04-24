import { forwardRef } from 'react';
import type { ListItemProps } from './ListItemProps';
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

/**
 * A list item component (<li>).
 *
 * Supports typography styling. When `icon` is provided the native list
 * marker is replaced by the icon node and `data-has-icon="true"` is set
 * so the base-class selector suppresses `list-style`.
 *
 * @example
 * ```tsx
 * <List>
 *   <ListItem>Plain item</ListItem>
 *   <ListItem icon={<CheckIcon />}>Done</ListItem>
 * </List>
 * ```
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  function ListItem({ icon, children, ...rest }, ref) {
    const theme = useTheme();
    const dataAttr = icon ? { 'data-has-icon': 'true' as const } : {};
    return (
      <ThemedComponent ref={ref} theme={theme.listItem} {...rest} {...dataAttr}>
        {icon ? (
          <span className="vane-list-item-icon mr-(--gap) inline-flex items-center justify-center align-middle h-(--icon-size) min-w-(--icon-size)">
            {icon}
          </span>
        ) : null}
        {children}
      </ThemedComponent>
    );
  }
);

ListItem.displayName = 'ListItem';
