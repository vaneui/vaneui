import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { resolveDisabledLink } from '../utils/disabledLink';
import { Badge, Button, Chip, Code, IconButton, Link, NavLink, ThemeProvider, defaultTheme } from '../../index';

describe('resolveDisabledLink', () => {
  it('should return props unchanged when not disabled', () => {
    const props = { href: '/test', className: 'my-class' };
    const result = resolveDisabledLink(props, false);
    expect(result).toBe(props);
  });

  it('should return props unchanged when no href is present', () => {
    const props = { className: 'my-class' };
    const result = resolveDisabledLink(props, true);
    expect(result).toBe(props);
  });

  it('should strip href when disabled and href are both present', () => {
    const props = { href: '/test', className: 'my-class' };
    const result = resolveDisabledLink(props, true);
    expect(result).not.toHaveProperty('href');
  });

  it('should add aria-disabled="true"', () => {
    const props = { href: '/test' };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;
    expect(result['aria-disabled']).toBe(true);
  });

  it('should add role="link"', () => {
    const props = { href: '/test' };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;
    expect(result['role']).toBe('link');
  });

  it('should force tag "a" so the element renders as a placeholder link, not a <button>', () => {
    const props = { href: '/test' };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;
    expect(result.tag).toBe('a');
  });

  it('should add tabIndex 0 (an anchor without href is not focusable by default)', () => {
    const props = { href: '/test' };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;
    expect(result.tabIndex).toBe(0);
  });

  it('should respect a consumer-supplied tabIndex', () => {
    const props = { href: '/test', tabIndex: -1 };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;
    expect(result.tabIndex).toBe(-1);
  });

  it('should add onClick handler that calls preventDefault', () => {
    const props = { href: '/test' };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;
    expect(result.onClick).toBeDefined();

    const mockEvent = { preventDefault: jest.fn() } as unknown as React.MouseEvent;
    (result.onClick as (e: React.MouseEvent) => void)(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should add onKeyDown handler that prevents Enter activation', () => {
    const props = { href: '/test' };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;
    expect(result.onKeyDown).toBeDefined();

    const enterEvent = { key: 'Enter', preventDefault: jest.fn() } as unknown as React.KeyboardEvent;
    (result.onKeyDown as (e: React.KeyboardEvent) => void)(enterEvent);
    expect(enterEvent.preventDefault).toHaveBeenCalled();
  });

  it('should add onKeyDown handler that prevents Space activation', () => {
    const props = { href: '/test' };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;

    const spaceEvent = { key: ' ', preventDefault: jest.fn() } as unknown as React.KeyboardEvent;
    (result.onKeyDown as (e: React.KeyboardEvent) => void)(spaceEvent);
    expect(spaceEvent.preventDefault).toHaveBeenCalled();
  });

  it('should NOT prevent non-activation keys in onKeyDown handler', () => {
    const props = { href: '/test' };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;

    const tabEvent = { key: 'Tab', preventDefault: jest.fn() } as unknown as React.KeyboardEvent;
    (result.onKeyDown as (e: React.KeyboardEvent) => void)(tabEvent);
    expect(tabEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('should preserve existing props (className, etc.)', () => {
    const props = { href: '/test', className: 'my-class', 'data-testid': 'link' };
    const result = resolveDisabledLink(props, true);
    expect(result.className).toBe('my-class');
    expect(result['data-testid']).toBe('link');
  });

  it('should drop consumer onClick when disabled', () => {
    const consumerOnClick = jest.fn();
    const props = { href: '/test', onClick: consumerOnClick };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;

    const mockEvent = { preventDefault: jest.fn() } as unknown as React.MouseEvent;
    (result.onClick as (e: React.MouseEvent) => void)(mockEvent);

    expect(consumerOnClick).not.toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should drop consumer onKeyDown when disabled on activation keys', () => {
    const consumerOnKeyDown = jest.fn();
    const props = { href: '/test', onKeyDown: consumerOnKeyDown };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;

    const enterEvent = { key: 'Enter', preventDefault: jest.fn() } as unknown as React.KeyboardEvent;
    (result.onKeyDown as (e: React.KeyboardEvent) => void)(enterEvent);

    expect(consumerOnKeyDown).not.toHaveBeenCalled();
    expect(enterEvent.preventDefault).toHaveBeenCalled();
  });

  it('should work without consumer handlers (no onClick/onKeyDown on props)', () => {
    const props = { href: '/test' };
    const result = resolveDisabledLink(props, true) as Record<string, unknown>;

    const mockEvent = { preventDefault: jest.fn() } as unknown as React.MouseEvent;
    (result.onClick as (e: React.MouseEvent) => void)(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    const enterEvent = { key: 'Enter', preventDefault: jest.fn() } as unknown as React.KeyboardEvent;
    (result.onKeyDown as (e: React.KeyboardEvent) => void)(enterEvent);
    expect(enterEvent.preventDefault).toHaveBeenCalled();
  });
});

// Every component that turns into a link with `href` has to apply the pattern above when it
// is also disabled. Left as `<a href>` it only looks disabled: the pointer is blocked by the
// disabled styling, but the keyboard still reaches the link and Enter follows it.
describe('disabled + href on link-capable components', () => {
  type LinkCapableProps = {
    href?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    tabIndex?: number;
    children?: React.ReactNode;
    'aria-label'?: string;
  };
  const components: [string, React.ComponentType<LinkCapableProps>][] = [
    ['Button', Button as React.ComponentType<LinkCapableProps>],
    ['IconButton', IconButton as React.ComponentType<LinkCapableProps>],
    ['NavLink', NavLink as React.ComponentType<LinkCapableProps>],
    ['Link', Link as React.ComponentType<LinkCapableProps>],
    ['Chip', Chip as React.ComponentType<LinkCapableProps>],
    ['Badge', Badge as React.ComponentType<LinkCapableProps>],
    ['Code', Code as React.ComponentType<LinkCapableProps>],
  ];

  const renderLink = (ui: React.ReactElement) =>
    render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>).container.firstElementChild as HTMLElement;

  describe.each(components)('%s', (_name, Component) => {
    it('renders a placeholder link: an <a> without href, aria-disabled, still in the tab order', () => {
      const el = renderLink(<Component href="/target" disabled aria-label="target">Target</Component>);
      expect(el.tagName).toBe('A');
      expect(el).not.toHaveAttribute('href');
      expect(el).not.toHaveAttribute('disabled');
      expect(el).toHaveAttribute('aria-disabled', 'true');
      expect(el).toHaveAttribute('role', 'link');
      expect(el).toHaveAttribute('tabindex', '0');
      expect(el).toHaveAttribute('data-disabled', 'true');
      el.focus();
      expect(document.activeElement).toBe(el);
    });

    it('blocks a click and Enter / Space activation and never calls the consumer handlers', () => {
      const onClick = jest.fn();
      const onKeyDown = jest.fn();
      const el = renderLink(
        <Component href="/target" disabled onClick={onClick} onKeyDown={onKeyDown} aria-label="target">Target</Component>
      );
      // fireEvent returns false when the event's default action was prevented
      expect(fireEvent.click(el)).toBe(false);
      expect(fireEvent.keyDown(el, { key: 'Enter' })).toBe(false);
      expect(fireEvent.keyDown(el, { key: ' ' })).toBe(false);
      expect(fireEvent.keyDown(el, { key: 'Tab' })).toBe(true);
      expect(onClick).not.toHaveBeenCalled();
      expect(onKeyDown).not.toHaveBeenCalled();
    });

    it('keeps a consumer tabIndex', () => {
      const el = renderLink(<Component href="/target" disabled tabIndex={-1} aria-label="target">Target</Component>);
      expect(el).toHaveAttribute('tabindex', '-1');
    });

    it('stays a real link while enabled', () => {
      const el = renderLink(<Component href="/target" aria-label="target">Target</Component>);
      expect(el.tagName).toBe('A');
      expect(el).toHaveAttribute('href', '/target');
      expect(el).not.toHaveAttribute('aria-disabled');
      expect(el).not.toHaveAttribute('role');
      expect(el).not.toHaveAttribute('tabindex');
    });
  });

  it.each([
    ['Chip', Chip as React.ComponentType<LinkCapableProps>, 'SPAN'],
    ['Badge', Badge as React.ComponentType<LinkCapableProps>, 'SPAN'],
    ['Code', Code as React.ComponentType<LinkCapableProps>, 'CODE'],
  ])('a disabled %s without href keeps its own tag and gains no link semantics', (_name, Component, tagName) => {
    const el = renderLink(<Component disabled>Plain</Component>);
    expect(el.tagName).toBe(tagName);
    expect(el).not.toHaveAttribute('role');
    expect(el).not.toHaveAttribute('tabindex');
    expect(el).not.toHaveAttribute('aria-disabled');
  });

  it('keeps the focus ring on a disabled link Chip, Badge and Code, since they stay focusable', () => {
    for (const Component of [Chip, Badge, Code] as React.ComponentType<LinkCapableProps>[]) {
      const el = renderLink(<Component href="/target" disabled>Target</Component>);
      expect(el).toHaveClass('focus-visible:outline-2');
    }
  });
});
