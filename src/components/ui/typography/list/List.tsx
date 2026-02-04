import { forwardRef } from 'react';
import type { ListProps } from "./ListProps";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

/**
 * A list container component (ul or ol).
 *
 * Renders an unordered (bullets) or ordered (numbers) list. Automatically
 * switches between ul and ol based on the `decimal` prop. Use with ListItem
 * components for structured lists.
 *
 * @example
 * ```tsx
 * // Unordered list (bullets)
 * <List>
 *   <ListItem>Item one</ListItem>
 *   <ListItem>Item two</ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * // Ordered list (numbers)
 * <List decimal>
 *   <ListItem>First step</ListItem>
 *   <ListItem>Second step</ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * // Styled list
 * <List primary lg padding>
 *   <ListItem>Feature A</ListItem>
 *   <ListItem>Feature B</ListItem>
 * </List>
 * ```
 *
 * @see {@link ListProps} for all available props
 */
export const List = forwardRef<HTMLUListElement, ListProps>(
  function List(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.list} {...props} />
  }
);

List.displayName = 'List';
