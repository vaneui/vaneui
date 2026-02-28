import { forwardRef } from 'react';
import type { NavLinkProps } from './NavLinkProps';
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';

/**
 * NavLink — a navigation-oriented interactive link for sidebars, nav menus, and headers.
 *
 * Renders as `<a>` when `href` is provided, `<button>` otherwise.
 * Supports `active` prop for current-page state (sets `data-active` and `aria-current="page"`).
 *
 * @example
 * ```tsx
 * <NavLink href="/dashboard" active>Dashboard</NavLink>
 * <NavLink href="/settings">Settings</NavLink>
 * <NavLink onClick={handleLogout}>Log out</NavLink>
 * ```
 */
export const NavLink = forwardRef<HTMLElement, NavLinkProps>(
  function NavLink(props, ref) {
    const { active, ...rest } = props;
    const theme = useTheme();

    const mergedProps = {
      ...rest,
      'data-active': active || undefined,
      'aria-current': active ? ('page' as const) : undefined,
    };

    return (
      <ThemedComponent
        ref={ref}
        theme={theme.navLink}
        {...mergedProps}
      />
    );
  }
);

NavLink.displayName = 'NavLink';
