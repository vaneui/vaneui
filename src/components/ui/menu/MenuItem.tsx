import { forwardRef, useCallback, useMemo } from 'react';
import type { MenuItemProps } from './MenuItemProps';
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';
import { useMenuContext } from './MenuContext';
import { createScopedKeydownHandler } from '../../utils/scopedKeydownHandler';
import { defaultMenuItemTheme } from './defaultMenuItemTheme';

// Roving tabindex: the item focused last is its menu's one tab stop and every other item stays at -1.
// Focus still moves with the arrow keys; the tab stop is there so that a menu long enough to scroll
// holds a tabbable element inside its scroll box. It is kept on the elements themselves, per menu
// element: a submenu's trigger is an item of the parent menu, and moving focus should not re-render items.
const menuTabStops = new WeakMap<Element, HTMLElement>();

export const MenuItem = forwardRef<HTMLElement, MenuItemProps>(
  function MenuItem(props, ref) {
    const { closeMenuOnClick, ...rest } = props;
    const theme = useTheme();
    const ctx = useMenuContext();

    const shouldClose = closeMenuOnClick ?? ctx?.closeOnItemClick ?? true;
    const loop = ctx?.loop ?? true;
    const disabled = props.disabled;

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLElement>) => {
        const item = e.currentTarget;
        const menu = item.closest('[data-menu-dropdown]');
        if (menu) {
          const previous = menuTabStops.get(menu);
          if (previous && previous !== item) previous.tabIndex = -1;
          item.tabIndex = 0;
          menuTabStops.set(menu, item);
        }
        const origFocus = rest.onFocus;
        if (typeof origFocus === 'function') {
          (origFocus as (e: React.FocusEvent<HTMLButtonElement>) => void)(e as React.FocusEvent<HTMLButtonElement>);
        }
      },
      [rest.onFocus]
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (disabled) return;
        const origClick = rest.onClick;
        if (typeof origClick === 'function') {
          (origClick as (e: React.MouseEvent<HTMLButtonElement>) => void)(e as React.MouseEvent<HTMLButtonElement>);
        }
        if (shouldClose) {
          ctx?.closeMenu();
        }
      },
      [disabled, rest.onClick, shouldClose, ctx]
    );

    const handleKeyDown = useMemo(() => createScopedKeydownHandler({
      parentSelector: '[data-menu-dropdown]',
      siblingSelector: '[data-menu-item]:not([data-disabled])',
      loop,
      orientation: 'vertical',
      onKeyDown: (event) => {
        const origKeyDown = rest.onKeyDown;
        if (typeof origKeyDown === 'function') {
          (origKeyDown as (e: React.KeyboardEvent<HTMLButtonElement>) => void)(event as React.KeyboardEvent<HTMLButtonElement>);
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (!disabled) {
            event.currentTarget.click();
          }
        }

        // ArrowLeft inside a submenu closes just that submenu and returns
        // focus to its trigger (APG submenu pattern); a no-op in a root menu.
        if (event.key === 'ArrowLeft' && ctx?.isSubmenu && ctx.closeSubmenu) {
          event.preventDefault();
          ctx.closeSubmenu();
        }

        if (event.key === 'Tab') {
          ctx?.closeMenu();
        }
      },
    }), [loop, rest.onKeyDown, disabled, ctx]);

    // prevent mousedown from stealing focus — items manage focus via keyboard
    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const origMouseDown = rest.onMouseDown;
        if (typeof origMouseDown === 'function') {
          (origMouseDown as (e: React.MouseEvent<HTMLButtonElement>) => void)(e as React.MouseEvent<HTMLButtonElement>);
        }
      },
      [rest.onMouseDown]
    );

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (!disabled) {
          // no scrolling: in a menu that scrolls, an item half out of view would slide under the pointer
          e.currentTarget.focus({ preventScroll: true });
        }
        // a submenu left open by a sibling closes; a submenu trigger reopens its own below
        ctx?.closeOpenSubmenu();
        // forward to a composed handler (e.g. a submenu trigger opening on hover)
        const origMouseEnter = rest.onMouseEnter;
        if (typeof origMouseEnter === 'function') {
          (origMouseEnter as (e: React.MouseEvent<HTMLButtonElement>) => void)(e as React.MouseEvent<HTMLButtonElement>);
        }
      },
      [disabled, rest.onMouseEnter, ctx]
    );

    const mergedProps = {
      ...rest,
      // menuitemcheckbox / menuitemradio (with aria-checked) are the checkable forms, so a passed role wins
      role: rest.role ?? 'menuitem',
      // every item starts out of the tab order; handleFocus moves the one tab stop
      tabIndex: -1,
      'data-menu-item': '',
      'aria-disabled': disabled || undefined,
      onClick: handleClick,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      onMouseDown: handleMouseDown,
      onMouseEnter: handleMouseEnter,
    };

    return (
      <ThemedComponent
        ref={ref}
        theme={theme?.menu.item ?? defaultMenuItemTheme}
        {...mergedProps}
      />
    );
  }
);

MenuItem.displayName = 'MenuItem';
