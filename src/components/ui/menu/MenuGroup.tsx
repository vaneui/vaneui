import { forwardRef } from 'react';
import type { MenuGroupProps } from "./MenuGroupProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { MenuLabel } from './MenuLabel';

/**
 * MenuGroup — a container that groups related menu items, optionally with a label.
 *
 * When a `label` prop is provided, a `<MenuLabel>` heading is rendered above
 * the group's children.
 *
 * @example
 * ```tsx
 * <MenuContent>
 *   <MenuGroup label="Actions">
 *     <MenuItem>Edit</MenuItem>
 *     <MenuItem>Copy</MenuItem>
 *   </MenuGroup>
 *   <MenuSeparator />
 *   <MenuGroup label="Account">
 *     <MenuItem>Settings</MenuItem>
 *     <MenuItem>Logout</MenuItem>
 *   </MenuGroup>
 * </MenuContent>
 * ```
 */
export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  function MenuGroup({ label, children, ...props }, ref) {
    const theme = useTheme();
    return (
      <ThemedComponent
        ref={ref}
        theme={theme.menu.group}
        role="group"
        {...props}
      >
        {label != null && <MenuLabel>{label}</MenuLabel>}
        {children}
      </ThemedComponent>
    );
  }
);

MenuGroup.displayName = 'MenuGroup';
