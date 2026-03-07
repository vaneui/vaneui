import { forwardRef, Children, isValidElement } from 'react';
import type { NavLinkProps } from './NavLinkProps';
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';

/**
 * NavLink — a navigation-oriented interactive link for sidebars, nav menus, and headers.
 *
 * Renders as `<a>` when `href` is provided, `<button>` otherwise.
 * Supports `active` prop for current-page state (sets `data-active` and `aria-current="page"`).
 * React element children (icons, badges) are rendered directly in the root flex container,
 * while text content is wrapped in a themed `<span>` (navLink.label) for truncation.
 *
 * @example
 * ```tsx
 * <NavLink href="/dashboard" active><HomeIcon /> Dashboard</NavLink>
 * <NavLink href="/settings">Settings</NavLink>
 * <NavLink onClick={handleLogout}>Log out</NavLink>
 * ```
 */
export const NavLink = forwardRef<HTMLElement, NavLinkProps>(
  function NavLink(props, ref) {
    const { active, children, ...rest } = props;
    const theme = useTheme();

    // When disabled + href, strip href and add accessibility attrs
    // so the link is not clickable and assistive tech knows it's disabled
    const resolvedRest = rest.disabled && rest.href
      ? (() => {
          const { href: _href, ...withoutHref } = rest;
          return {
            ...withoutHref,
            'aria-disabled': true as const,
            role: 'link' as const,
            tabIndex: -1,
          };
        })()
      : rest;

    const mergedProps = {
      ...resolvedRest,
      'data-active': active || undefined,
      'aria-current': active ? ('page' as const) : undefined,
    };

    // Separate React elements (icons, badges) from text content.
    // Elements render directly in the root flex container; text is wrapped
    // in the label span for truncation.
    const leading: React.ReactNode[] = [];
    const textParts: React.ReactNode[] = [];
    const trailing: React.ReactNode[] = [];
    let seenText = false;

    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        if (seenText) {
          trailing.push(child);
        } else {
          leading.push(child);
        }
      } else if (child != null && child !== false && child !== true) {
        seenText = true;
        textParts.push(child);
      }
    });

    return (
      <ThemedComponent ref={ref} theme={theme.navLink.root} {...mergedProps}>
        {leading}
        {textParts.length > 0 && (
          <ThemedComponent theme={theme.navLink.label}>{textParts}</ThemedComponent>
        )}
        {trailing}
      </ThemedComponent>
    );
  }
);

NavLink.displayName = 'NavLink';
