import { forwardRef } from 'react';
import type { NavLinkProps } from './NavLinkProps';
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';

/**
 * NavLink — a navigation-oriented interactive link for sidebars, nav menus, and headers.
 *
 * Renders as `<a>` when `href` is provided, `<button>` otherwise.
 * Supports `active` prop for current-page state (sets `data-active` and `aria-current="page"`).
 * Text content is wrapped in a themed `<span>` (navLink.label) for truncation in flex layout.
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
    const { active, children, ...rest } = props;
    const theme = useTheme();

    const mergedProps = {
      ...rest,
      'data-active': active || undefined,
      'aria-current': active ? ('page' as const) : undefined,
    };

    return (
      <ThemedComponent ref={ref} theme={theme.navLink.root} {...mergedProps}>
        <ThemedComponent theme={theme.navLink.label}>{children}</ThemedComponent>
      </ThemedComponent>
    );
  }
);

NavLink.displayName = 'NavLink';
