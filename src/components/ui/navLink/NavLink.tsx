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

    // The label span holds the text, so it can truncate and take the free space. It runs from the
    // first piece of text to the last, so an element between two pieces of text (an icon inside
    // the label) keeps its place; elements before the first text and after the last render
    // directly in the flex container.
    const items: React.ReactNode[] = [];
    Children.forEach(children, (child) => {
      if (child != null && child !== false && child !== true) items.push(child);
    });
    const isText = (child: React.ReactNode) => !isValidElement(child);
    const firstText = items.findIndex(isText);
    const lastText = items.length - 1 - [...items].reverse().findIndex(isText);
    const leading = firstText < 0 ? items : items.slice(0, firstText);
    const textParts = firstText < 0 ? [] : items.slice(firstText, lastText + 1);
    const trailing = firstText < 0 ? [] : items.slice(lastText + 1);

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
