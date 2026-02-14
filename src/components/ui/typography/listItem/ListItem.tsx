import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

/**
 * A list item component (li).
 *
 * Renders an individual list item within a List component. Supports
 * typography styling and can be rendered as a link when href is provided.
 * Use within List for bullet points or numbered lists.
 *
 * @example
 * ```tsx
 * // Basic list item
 * <List>
 *   <ListItem>First item</ListItem>
 *   <ListItem>Second item</ListItem>
 * </List>
 * ```
 *
 * @example
 * ```tsx
 * // Styled list item
 * <ListItem primary semibold>Important item</ListItem>
 * ```
 *
 * @example
 * ```tsx
 * // List item as a link
 * <ListItem href="/item/1">Click to view details</ListItem>
 * ```
 *
 * @see {@link TypographyProps} for all available props
 */
export const ListItem = forwardRef<HTMLLIElement, TypographyProps>(
  function ListItem(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.listItem} {...props} />
  }
);

ListItem.displayName = 'ListItem';
