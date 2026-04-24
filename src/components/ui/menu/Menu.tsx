import React, { useRef, useCallback, useId, useEffect, cloneElement } from 'react';
import type { MenuProps } from './MenuProps';
import { MenuContext, type MenuContextValue } from './MenuContext';
import { useControllableState } from '../../utils/controllableState';
import { Popup } from '../popup/Popup';
import { useTheme, ThemeProvider } from '../../themeContext';
import { ComponentKeys } from '../props';

/**
 * Menu — a dropdown menu triggered by a single element.
 *
 * Renders the `trigger` element with ref + ARIA + click/keyboard handlers,
 * and a Popup containing `children` (MenuItem, Divider, MenuLabel).
 *
 * @example
 * ```tsx
 * <Menu trigger={<Button>Actions</Button>}>
 *   <MenuItem onClick={handleEdit}>Edit</MenuItem>
 *   <MenuItem onClick={handleCopy}>Copy</MenuItem>
 *   <Divider />
 *   <MenuItem danger onClick={handleDelete}>Delete</MenuItem>
 * </Menu>
 * ```
 */
export function Menu({
  children,
  trigger,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onClose: onCloseProp,
  closeOnItemClick = true,
  loop = true,
  disabled = false,
  // Popup props (forwarded)
  transitionDuration = 150,
  ...popupProps
}: MenuProps) {
  const anchorRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuId = `menu-${useId().replace(/:/g, '-')}`;

  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const effectiveOpen = open && !disabled;

  const onCloseRef = useRef(onCloseProp);
  useEffect(() => {
    onCloseRef.current = onCloseProp;
  });

  const closeMenu = useCallback(() => {
    setOpen(false);
    onCloseRef.current?.();
  }, [setOpen]);

  const openMenu = useCallback(() => {
    if (!disabled) setOpen(true);
  }, [setOpen, disabled]);

  const toggleMenu = useCallback(() => {
    if (effectiveOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [effectiveOpen, closeMenu, openMenu]);

  // Return focus to trigger when menu closes
  const prevOpenRef = useRef(false);
  useEffect(() => {
    if (prevOpenRef.current && !effectiveOpen && anchorRef.current) {
      anchorRef.current.focus();
    }
    prevOpenRef.current = effectiveOpen;
  }, [effectiveOpen]);

  // Focus first menu item on open
  useEffect(() => {
    if (!effectiveOpen || !contentRef.current) return;

    const raf = requestAnimationFrame(() => {
      const firstItem = contentRef.current?.querySelector<HTMLElement>(
        '[data-menu-item]:not([data-disabled])'
      );
      firstItem?.focus();
    });

    return () => cancelAnimationFrame(raf);
  }, [effectiveOpen]);

  // Clone trigger with ARIA + handlers
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const original = (trigger as React.ReactElement<Record<string, unknown>>).props?.onClick;
      if (typeof original === 'function') {
        (original as (e: React.MouseEvent) => void)(e);
      }
      toggleMenu();
    },
    [trigger, toggleMenu]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const original = (trigger as React.ReactElement<Record<string, unknown>>).props?.onKeyDown;
      if (typeof original === 'function') {
        (original as (e: React.KeyboardEvent) => void)(e);
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        openMenu();
      }

      if (e.key === 'Escape' && effectiveOpen) {
        e.preventDefault();
        closeMenu();
      }
    },
    [trigger, openMenu, closeMenu, effectiveOpen]
  );

  const triggerElement = cloneElement(trigger, {
    ref: anchorRef,
    'aria-haspopup': 'menu',
    'aria-expanded': effectiveOpen,
    'aria-controls': effectiveOpen ? menuId : undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  } as Record<string, unknown>);

  const theme = useTheme();

  const ctx: MenuContextValue = {
    closeMenu,
    closeOnItemClick,
    loop,
  };

  // When the user explicitly sizes the Menu (e.g. `<Menu lg>`), propagate that
  // size to MenuItem / MenuLabel / nested Divider so the whole dropdown scales
  // uniformly. When no explicit size is passed we leave each sub-component's
  // own default alone — preserving the compact-by-default design intent.
  const explicitSize = ComponentKeys.size.find(
    (k) => (popupProps as Record<string, unknown>)[k]
  );
  const childSizeDefaults = explicitSize ? { [explicitSize]: true } : undefined;

  return (
    <MenuContext.Provider value={ctx}>
      {triggerElement}
      <ThemeProvider themeDefaults={{
        popup: theme.menu.popup.defaults,
        divider: childSizeDefaults
          ? { ...theme.menu.divider.defaults, ...childSizeDefaults }
          : theme.menu.divider.defaults,
        ...(childSizeDefaults && {
          menu: {
            item: childSizeDefaults,
            label: childSizeDefaults,
          },
        }),
      }}>
        <Popup
          ref={contentRef}
          open={effectiveOpen}
          onClose={closeMenu}
          anchorRef={anchorRef}
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          data-menu-dropdown=""
          transitionDuration={transitionDuration}
          {...popupProps}
        >
          {children}
        </Popup>
      </ThemeProvider>
    </MenuContext.Provider>
  );
}

Menu.displayName = 'Menu';
