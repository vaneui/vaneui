import React from 'react';
import { resolveDisabledLink } from '../utils/disabledLink';

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

  it('should NOT add tabIndex: -1 (element stays in tab order)', () => {
    const props = { href: '/test' };
    const result = resolveDisabledLink(props, true);
    expect(result).not.toHaveProperty('tabIndex');
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

  it('should drop consumer onClick when disabled (Ant Design pattern)', () => {
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
