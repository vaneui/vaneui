import React, { useRef, useCallback, useId, useEffect, useMemo, cloneElement } from 'react';
import type { MenuProps } from './MenuProps';
import { MenuContext, useMenuContext, type MenuContextValue } from './MenuContext';
import { useControllableState } from '../../utils/controllableState';
import { Popup } from '../popup/Popup';
import { useTheme } from '../../themeContext';
// Menu renders a nested ThemeProvider to push its sub-theme defaults onto
// Popup/Divider children — this is a deliberate opt-in to the full theme
// registry (ThemeProvider imports defaultTheme as its merge base)
import { ThemeProvider } from '../../ThemeProvider';
import { defaultMenuPopupTheme } from './defaultMenuPopupTheme';
import { defaultMenuDividerTheme } from '../divider/defaultMenuDividerTheme';
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

  // a Menu rendered inside another Menu's MenuContext is a submenu
  const parentCtx = useMenuContext();
  const isSubmenu = parentCtx !== null;

  const effectiveOpen = open && !disabled;

  const onCloseRef = useRef(onCloseProp);
  useEffect(() => {
    onCloseRef.current = onCloseProp;
  });

  // close only this menu level — used for dismissal (Escape / ArrowLeft /
  // click-outside). In a submenu, focus returns to its trigger via the
  // return-focus effect below.
  const closeSelf = useCallback(() => {
    setOpen(false);
    onCloseRef.current?.();
  }, [setOpen]);

  // selecting a leaf item closes this level and, for a submenu, bubbles up so
  // the whole tree closes
  const closeMenu = useCallback(() => {
    closeSelf();
    if (isSubmenu) parentCtx?.closeMenu();
  }, [closeSelf, isSubmenu, parentCtx]);

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

  // ArrowUp on the closed trigger opens with focus on the LAST enabled item
  const focusLastOnOpenRef = useRef(false);

  // focus first (or last, when opened via ArrowUp) menu item on open
  useEffect(() => {
    if (!effectiveOpen || !contentRef.current) return;

    const raf = requestAnimationFrame(() => {
      const items = contentRef.current?.querySelectorAll<HTMLElement>(
        '[data-menu-item]:not([data-disabled])'
      );
      if (!items || items.length === 0) return;
      const target = focusLastOnOpenRef.current ? items[items.length - 1] : items[0];
      focusLastOnOpenRef.current = false;
      target.focus();
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

      if (isSubmenu) {
        // submenu trigger: ArrowRight opens (the open effect focuses the first
        // item), ArrowLeft / Escape close just this submenu. ArrowUp/Down and
        // Enter/Space are left to the trigger MenuItem's own handler (parent
        // navigation + click-to-open).
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          openMenu();
        } else if ((e.key === 'ArrowLeft' || e.key === 'Escape') && effectiveOpen) {
          e.preventDefault();
          closeSelf();
        }
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!disabled && !effectiveOpen) {
          focusLastOnOpenRef.current = e.key === 'ArrowUp';
        }
        openMenu();
      }

      if (e.key === 'Escape' && effectiveOpen) {
        e.preventDefault();
        closeMenu();
      }
    },
    [trigger, openMenu, closeMenu, closeSelf, effectiveOpen, disabled, isSubmenu]
  );

  // hover opens a submenu (mouse parity with the keyboard ArrowRight)
  const handleTriggerMouseEnter = useCallback(() => {
    if (isSubmenu) openMenu();
  }, [isSubmenu, openMenu]);

  // compose with the trigger's own ref — cloneElement would silently
  // replace a ref the consumer attached to their trigger element
  const triggerElement = cloneElement(trigger, {
    ref: composeRefs(getElementRef(trigger), anchorRef),
    'aria-haspopup': 'menu',
    'aria-expanded': effectiveOpen,
    'aria-controls': effectiveOpen ? menuId : undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    ...(isSubmenu
      ? {
          // the submenu trigger is itself an item of the parent menu, so
          // activating it must NOT close the parent; hovering it opens the submenu
          closeMenuOnClick: false,
          onMouseEnter: handleTriggerMouseEnter,
        }
      : {}),
  } as Record<string, unknown>);

  const theme = useTheme();
  const menuPopupTheme = theme?.menu.popup ?? defaultMenuPopupTheme;
  const menuDividerTheme = theme?.menu.divider ?? defaultMenuDividerTheme;

  // memoized so MenuItems don't re-render on every Menu render
  const ctx: MenuContextValue = useMemo(() => ({
    closeMenu,
    closeOnItemClick,
    loop,
    isSubmenu,
    closeSubmenu: isSubmenu ? closeSelf : undefined,
  }), [closeMenu, closeOnItemClick, loop, isSubmenu, closeSelf]);

  // a submenu defaults to opening on the inline-end side (flips if no room)
  const hasExplicitPlacement = ComponentKeys.placement.some(
    (k) => (popupProps as Record<string, unknown>)[k]
  );
  const submenuPlacementProps = isSubmenu && !hasExplicitPlacement ? { rightStart: true } : {};

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
      popup: menuPopupTheme.defaults,
      divider: childSizeDefaults
        ? { ...menuDividerTheme.defaults, ...childSizeDefaults }
        : menuDividerTheme.defaults,
      ...(childSizeDefaults && {
        menu: {
          item: childSizeDefaults,
          label: childSizeDefaults,
        },
      }),
    };
  }, [menuPopupTheme, menuDividerTheme, explicitSize]);

  return (
    <MenuContext.Provider value={ctx}>
      {triggerElement}
      <ThemeProvider themeDefaults={childThemeDefaults}>
        <Popup
          ref={contentRef}
          open={effectiveOpen}
          onClose={closeSelf}
          anchorRef={anchorRef}
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          data-menu-dropdown=""
          transitionDuration={transitionDuration}
          {...submenuPlacementProps}
          {...popupProps}
        >
          {children}
        </Popup>
      </ThemeProvider>
    </MenuContext.Provider>
  );
}

Menu.displayName = 'Menu';
