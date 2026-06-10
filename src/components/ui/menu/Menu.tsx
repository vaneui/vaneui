import React, { useRef, useCallback, useId, useEffect, useMemo, cloneElement } from 'react';
import type { MenuProps } from './MenuProps';
import { MenuContext, type MenuContextValue } from './MenuContext';
import { useControllableState } from '../../utils/controllableState';
import { Popup } from '../popup/Popup';
import { useTheme, ThemeProvider } from '../../themeContext';
import { ComponentKeys } from '../props';
import { composeRefs, getElementRef } from '../../utils/composeRefs';

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

  // return focus to trigger when menu closes
  const prevOpenRef = useRef(false);
  useEffect(() => {
    if (prevOpenRef.current && !effectiveOpen && anchorRef.current) {
      anchorRef.current.focus();
    }
    prevOpenRef.current = effectiveOpen;
  }, [effectiveOpen]);

  // focus first menu item on open
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

  // compose with the trigger's own ref — cloneElement would silently
  // replace a ref the consumer attached to their trigger element
  const triggerElement = cloneElement(trigger, {
    ref: composeRefs(getElementRef(trigger), anchorRef),
    'aria-haspopup': 'menu',
    'aria-expanded': effectiveOpen,
    'aria-controls': effectiveOpen ? menuId : undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  } as Record<string, unknown>);

  const theme = useTheme();

  // memoized so MenuItems don't re-render on every Menu render
  const ctx: MenuContextValue = useMemo(() => ({
    closeMenu,
    closeOnItemClick,
    loop,
  }), [closeMenu, closeOnItemClick, loop]);

  // explicit size on Menu propagates to MenuItem / MenuLabel / Divider; no explicit size keeps each sub-component's default
  const explicitSize = ComponentKeys.size.find(
    (k) => (popupProps as Record<string, unknown>)[k]
  );

  // memoized so the nested ThemeProvider's memo stays valid across
  // re-renders (open/close toggles) — an inline literal here would re-clone
  // the theme tree on every Menu render
  const childThemeDefaults = useMemo(() => {
    const childSizeDefaults = explicitSize ? { [explicitSize]: true } : undefined;
    return {
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
    };
  }, [theme, explicitSize]);

  return (
    <MenuContext.Provider value={ctx}>
      {triggerElement}
      <ThemeProvider themeDefaults={childThemeDefaults}>
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
