import { useRef, useCallback, useId, useEffect } from 'react';
import type { MenuProps } from './MenuProps';
import { MenuContext, type MenuContextValue } from './MenuContext';
import { useControllableState } from '../../utils/controllableState';

/**
 * Root Menu component — provides context for MenuTrigger, MenuContent, and MenuItem.
 *
 * Renders no DOM element. Manages open state, close behavior, and keyboard config.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuTrigger>
 *     <Button>Actions</Button>
 *   </MenuTrigger>
 *   <MenuContent>
 *     <MenuItem onClick={handleEdit}>Edit</MenuItem>
 *     <MenuItem onClick={handleCopy}>Copy</MenuItem>
 *     <Divider />
 *     <MenuItem danger onClick={handleDelete}>Delete</MenuItem>
 *   </MenuContent>
 * </Menu>
 * ```
 */
export function Menu({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onClose: onCloseProp,
  closeOnItemClick = true,
  loop = true,
  disabled = false,
}: MenuProps) {
  const anchorRef = useRef<HTMLElement>(null);
  const menuId = useId().replace(/:/g, '-');

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

  const ctx: MenuContextValue = {
    open: effectiveOpen,
    closeMenu,
    openMenu,
    toggleMenu,
    closeOnItemClick,
    loop,
    anchorRef,
    menuId: `menu-${menuId}`,
  };

  return (
    <MenuContext.Provider value={ctx}>
      {children}
    </MenuContext.Provider>
  );
}

Menu.displayName = 'Menu';
