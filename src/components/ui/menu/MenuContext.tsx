import { createContext, useContext } from 'react';

export interface MenuContextValue {
  open: boolean;
  closeMenu: () => void;
  openMenu: () => void;
  toggleMenu: () => void;
  closeOnItemClick: boolean;
  loop: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  menuId: string;
}

export const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenuContext() {
  return useContext(MenuContext);
}
