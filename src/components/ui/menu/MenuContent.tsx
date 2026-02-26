import { forwardRef, useEffect, useRef, useCallback } from 'react';
import { Popup } from '../popup/Popup';
import type { PopupProps } from '../popup/PopupProps';
import { useMenuContext } from './MenuContext';
import { useTheme } from '../../themeContext';
import type { MenuContentProps as MenuContentThemeProps } from './MenuContentProps';

export type MenuContentProps = Omit<PopupProps, 'anchorRef' | 'open' | 'onClose'> &
  MenuContentThemeProps & {
  /** Additional popup props override */
  children?: React.ReactNode;
};

/**
 * MenuContent — wraps Popup with menu-specific ARIA roles and focus management.
 *
 * Renders a `<Popup>` positioned relative to the MenuTrigger anchor.
 * On open, focuses the first non-disabled menu item.
 * Visual styling is controlled by `theme.menu.content.defaults`, which
 * are spread onto Popup as props. Popup's own theme handles CSS class
 * generation. Menu-specific CSS variable overrides (compact padding)
 * are applied via `[data-menu-dropdown]` in vars.css.
 *
 * Must be used inside a `<Menu>` provider.
 */
export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(
    {
      children,
      ...popupProps
    },
    ref
  ) {
    const ctx = useMenuContext();
    if (!ctx) {
      throw new Error('MenuContent must be used inside a <Menu> component');
    }

    const { open, closeMenu, anchorRef, menuId } = ctx;
    const contentRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();

    // Merge forwarded ref with internal ref
    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // Focus first menu item on open
    useEffect(() => {
      if (!open || !contentRef.current) return;

      // Defer to allow portal rendering to complete
      const raf = requestAnimationFrame(() => {
        const firstItem = contentRef.current?.querySelector<HTMLElement>(
          '[data-menu-item]:not([data-disabled])'
        );
        firstItem?.focus();
      });

      return () => cancelAnimationFrame(raf);
    }, [open]);

    return (
      <Popup
        ref={mergedRef}
        open={open}
        onClose={closeMenu}
        anchorRef={anchorRef}
        id={menuId}
        role="menu"
        aria-orientation="vertical"
        data-menu-dropdown=""
        transitionDuration={150}
        {...theme.menu.content.defaults}
        {...popupProps}
      >
        {children}
      </Popup>
    );
  }
);

MenuContent.displayName = 'MenuContent';
