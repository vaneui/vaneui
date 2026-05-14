import React from 'react';

// Element stays focusable per WCAG aria-disabled best practice; Enter/Space activation is blocked.
export function resolveDisabledLink<T extends Record<string, unknown> & { href?: string }>(
  props: T,
  isDisabled: boolean
): T {
  if (!isDisabled || !props.href) return props;
  const { href: _href, ...withoutHref } = props;
  return {
    ...withoutHref,
    'aria-disabled': true,
    role: 'link',
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
