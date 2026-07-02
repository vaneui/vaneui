import { createContext, useContext } from 'react';

export interface MenuContextValue {
  /** Close this menu; in a submenu this bubbles to the root so selecting a leaf closes the whole tree. */
  closeMenu: () => void;
  closeOnItemClick: boolean;
  loop: boolean;
  /** True when this menu is nested inside another menu (a submenu). */
  isSubmenu: boolean;
  /** Submenu only: close just this submenu and return focus to its trigger (ArrowLeft / Escape). */
  closeSubmenu?: () => void;
}

export const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenuContext() {
  return useContext(MenuContext);
}
