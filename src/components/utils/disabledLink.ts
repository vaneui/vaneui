import React from 'react';

/**
 * When a link-capable component (Button, NavLink) is disabled and has an href,
 * strip the href and add accessibility attributes so assistive tech announces
 * the element as a disabled link. The element remains focusable (no tabIndex: -1)
 * per WCAG best practices for aria-disabled elements, but click and Enter key
 * activation are blocked (Enter and Space keys).
 */
export function resolveDisabledLink<T extends Record<string, unknown> & { href?: string }>(
  props: T,
  isDisabled: boolean
): T {
  if (!isDisabled || !props.href) return props;
  const { href: _href, ...withoutHref } = props;
  const origOnClick = (withoutHref as Record<string, unknown>).onClick;
  const origOnKeyDown = (withoutHref as Record<string, unknown>).onKeyDown;
  return {
    ...withoutHref,
    'aria-disabled': true,
    role: 'link',
    onClick: (e: React.MouseEvent) => {
      if (typeof origOnClick === 'function') origOnClick(e);
      e.preventDefault();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (typeof origOnKeyDown === 'function') origOnKeyDown(e);
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
      }
    },
  } as unknown as T;
}
