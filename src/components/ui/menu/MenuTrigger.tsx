import React, { cloneElement, useEffect, useRef, useCallback } from 'react';
import { useMenuContext } from './MenuContext';

export interface MenuTriggerProps {
  children: React.ReactElement;
}

/**
 * MenuTrigger — clones its child element to wire up ref, ARIA attributes,
 * and click/keyboard handlers for opening the menu.
 *
 * Must be used inside a `<Menu>` provider.
 */
export function MenuTrigger({ children }: MenuTriggerProps) {
  const ctx = useMenuContext();
  if (!ctx) {
    throw new Error('MenuTrigger must be used inside a <Menu> component');
  }

  const { open, toggleMenu, openMenu, closeMenu, anchorRef, menuId } = ctx;
  const prevOpenRef = useRef(false);

  // Return focus to trigger when menu closes
  useEffect(() => {
    if (prevOpenRef.current && !open && anchorRef.current) {
      anchorRef.current.focus();
    }
    prevOpenRef.current = open;
  }, [open, anchorRef]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Call original onClick if present
      const original = (children as React.ReactElement<Record<string, unknown>>).props?.onClick;
      if (typeof original === 'function') {
        (original as (e: React.MouseEvent) => void)(e);
      }
      toggleMenu();
    },
    [children, toggleMenu]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Call original onKeyDown if present
      const original = (children as React.ReactElement<Record<string, unknown>>).props?.onKeyDown;
      if (typeof original === 'function') {
        (original as (e: React.KeyboardEvent) => void)(e);
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        openMenu();
      }

      if (e.key === 'Escape' && open) {
        e.preventDefault();
        closeMenu();
      }
    },
    [children, openMenu, closeMenu, open]
  );

  return cloneElement(children, {
    ref: anchorRef,
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    'aria-controls': open ? menuId : undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  } as Record<string, unknown>);
}

MenuTrigger.displayName = 'MenuTrigger';
