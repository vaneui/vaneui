/**
 * When a link-capable component (Button, NavLink) is disabled and has an href,
 * strip the href and add accessibility attributes so assistive tech announces
 * the element as a disabled link.
 */
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
    tabIndex: -1,
  } as unknown as T;
}
