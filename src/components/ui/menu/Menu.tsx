import React, { useRef, useCallback, useId, useEffect, cloneElement } from 'react';
import type { MenuProps } from './MenuProps';
import { MenuContext, type MenuContextValue } from './MenuContext';
import { useControllableState } from '../../utils/controllableState';
import { Popup } from '../popup/Popup';

/**
 * Menu — a dropdown menu triggered by a single element.
 *
 * Renders the `trigger` element with ref + ARIA + click/keyboard handlers,
 * and a Popup containing `children` (MenuItem, MenuSeparator, MenuLabel).
 *
 * @example
 * ```tsx
 * <Menu trigger={<Button>Actions</Button>}>
 *   <MenuItem onClick={handleEdit}>Edit</MenuItem>
 *   <MenuItem onClick={handleCopy}>Copy</MenuItem>
 *   <MenuSeparator />
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

  const ctx: MenuContextValue = {
    closeMenu,
    closeOnItemClick,
    loop,
  };

  return (
    <MenuContext.Provider value={ctx}>
      {triggerElement}
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
        md
        flex
        column
        noGap
        rounded
        shadow
        border
        noRing
        primary
        outline
        wFit
        bottom
        {...popupProps}
      >
        {children}
      </Popup>
    </MenuContext.Provider>
  );
}

Menu.displayName = 'Menu';
