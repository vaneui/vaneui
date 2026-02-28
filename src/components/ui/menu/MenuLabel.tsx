import { forwardRef } from 'react';
import type { MenuLabelProps } from "./MenuLabelProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * MenuLabel — a non-interactive section heading inside a menu dropdown.
 *
 * Renders as a `<div>` with `role="presentation"` (not interactive).
 * Useful for labeling groups of menu items (e.g., "Actions", "Account").
 *
 * @example
 * ```tsx
 * <Menu trigger={<Button>Actions</Button>}>
 *   <MenuLabel>Actions</MenuLabel>
 *   <MenuItem>Edit</MenuItem>
 *   <MenuItem>Copy</MenuItem>
 *   <Divider />
 *   <MenuLabel>Account</MenuLabel>
 *   <MenuItem>Settings</MenuItem>
 *   <MenuItem>Logout</MenuItem>
 * </Menu>
 * ```
 */
export const MenuLabel = forwardRef<HTMLElement, MenuLabelProps>(
  function MenuLabel(props, ref) {
    const theme = useTheme();
    return (
      <ThemedComponent
        ref={ref}
        theme={theme.menu.label}
        role="presentation"
        {...props}
      />
    );
  }
);

MenuLabel.displayName = 'MenuLabel';
