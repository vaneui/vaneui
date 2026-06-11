import { forwardRef, Children, isValidElement } from 'react';
import type { NavLinkProps } from './NavLinkProps';
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';
import { resolveDisabledLink } from '../../utils/disabledLink';
import { defaultNavLinkTheme } from './defaultNavLinkTheme';
import { defaultNavLinkLabelTheme } from './defaultNavLinkLabelTheme';

export const NavLink = forwardRef<HTMLElement, NavLinkProps>(
  function NavLink(props, ref) {
    const { active, children, ...rest } = props;
    const theme = useTheme();

    const resolvedRest = resolveDisabledLink(rest, !!rest.disabled);

    const mergedProps = {
      ...resolvedRest,
      'data-active': active || undefined,
      'aria-current': active ? ('page' as const) : undefined,
    };

    // text wraps in the label span for truncation; elements render directly in the flex container
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
      <ThemedComponent ref={ref} theme={theme?.navLink.root ?? defaultNavLinkTheme} {...mergedProps}>
        {leading}
        {textParts.length > 0 && (
          <ThemedComponent theme={theme?.navLink.label ?? defaultNavLinkLabelTheme}>{textParts}</ThemedComponent>
        )}
        {trailing}
      </ThemedComponent>
    );
  }
);

NavLink.displayName = 'NavLink';
