import { createContext, useContext } from 'react';

export interface MenuContextValue {
  closeMenu: () => void;
  closeOnItemClick: boolean;
  loop: boolean;
}

export const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenuContext() {
  return useContext(MenuContext);
}
