import React from 'react';

// Disabled + href renders a PLACEHOLDER LINK: an <a> without href (valid
// HTML), announced as a link via role (an anchor without href has no
// implicit link role), kept focusable via tabIndex so keyboard and
// screen-reader users can still discover the disabled control — the
// aria-disabled pattern. The tag is forced to 'a' (a consumer tag like a
// router Link would crash without href). `disabled` stays in the props so
// the disabled styling/extraction still applies; getComponentConfig
// suppresses the native disabled attr on tags that don't support it, which
// keeps the placeholder link in the tab order. Enter/Space activation and
// clicks are blocked.
export function resolveDisabledLink<T extends Record<string, unknown> & { href?: string }>(
  props: T,
  isDisabled: boolean
): T {
  if (!isDisabled || !props.href) return props;
  const { href: _href, ...withoutHref } = props;
  return {
    ...withoutHref,
    tag: 'a',
    'aria-disabled': true,
    role: 'link',
    tabIndex: (props.tabIndex as number | undefined) ?? 0,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
      }
    },
  } as unknown as T;
}
