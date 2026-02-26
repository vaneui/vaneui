import { forwardRef } from 'react';
import type { MenuSeparatorProps } from "./MenuSeparatorProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * MenuSeparator — a thin horizontal line between menu item groups.
 *
 * Uses `theme.menu.separator` for styling, allowing independent
 * customization via ThemeProvider without affecting global Divider.
 *
 * @example
 * ```tsx
 * <MenuContent>
 *   <MenuItem>Edit</MenuItem>
 *   <MenuItem>Copy</MenuItem>
 *   <MenuSeparator />
 *   <MenuItem danger>Delete</MenuItem>
 * </MenuContent>
 * ```
 */
export const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(
  function MenuSeparator(props, ref) {
    const theme = useTheme();
    return (
      <ThemedComponent
        ref={ref}
        theme={theme.menu.separator}
        role="separator"
        {...props}
      />
    );
  }
);

MenuSeparator.displayName = 'MenuSeparator';
