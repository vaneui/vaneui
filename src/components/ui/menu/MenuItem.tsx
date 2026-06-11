import { forwardRef, useCallback, useMemo } from 'react';
import type { MenuItemProps } from './MenuItemProps';
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';
import { useMenuContext } from './MenuContext';
import { createScopedKeydownHandler } from '../../utils/scopedKeydownHandler';
import { defaultMenuItemTheme } from './defaultMenuItemTheme';

export const MenuItem = forwardRef<HTMLElement, MenuItemProps>(
  function MenuItem(props, ref) {
    const { closeMenuOnClick, ...rest } = props;
    const theme = useTheme();
    const ctx = useMenuContext();

    const shouldClose = closeMenuOnClick ?? ctx?.closeOnItemClick ?? true;
    const loop = ctx?.loop ?? true;
    const disabled = props.disabled;

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

        if (event.key === 'Escape') {
          event.preventDefault();
          ctx?.closeMenu();
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
          e.currentTarget.focus();
        }
      },
      [disabled]
    );

    const mergedProps = {
      ...rest,
      role: 'menuitem' as const,
      tabIndex: -1,
      'data-menu-item': '',
      'aria-disabled': disabled || undefined,
      onClick: handleClick,
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
