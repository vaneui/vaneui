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
    // NavLink renders as <a> when it has an href, otherwise as <button> (see defaultNavLinkTheme).
    const rendersAsButton = !props.href;

    const mergedProps = {
      ...resolvedRest,
      // A bare <button> defaults to type="submit" and would submit an enclosing <form> on click —
      // default the no-href (button) form to type="button" unless the consumer set one.
      ...(rendersAsButton && (resolvedRest as { type?: string }).type === undefined
        ? { type: 'button' as const }
        : {}),
      'data-active': active || undefined,
      // aria-current="page" is page-navigation semantics, valid only on the <a> form; omit it on the
      // <button> form so an action trigger isn't announced as the current page.
      'aria-current': active && !rendersAsButton ? ('page' as const) : undefined,
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
