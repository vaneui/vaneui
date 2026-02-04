import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import type { OverlayProps } from "./OverlayProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";

/**
 * Overlay component - a fullscreen backdrop for modals, drawers, lightboxes, etc.
 *
 * Features:
 * - Portal rendering (escapes parent z-index context)
 * - Click-to-close behavior
 * - Optional blur effect
 * - Centered by default (use itemsStart/justifyStart to override)
 * - Themeable via ThemeProvider
 *
 * @example
 * ```tsx
 * // Basic overlay with centered content (default)
 * <Overlay open={isOpen} onClose={() => setIsOpen(false)}>
 *   <Card>Modal content</Card>
 * </Overlay>
 * ```
 *
 * @example
 * ```tsx
 * // Drawer-style (not centered)
 * <Overlay open={drawerOpen} onClose={() => setDrawerOpen(false)} itemsStart justifyStart>
 *   <Card className="h-full w-80">Drawer</Card>
 * </Overlay>
 * ```
 *
 * @example
 * ```tsx
 * // Loading overlay (no close, blur effect, clicks pass through)
 * <Overlay open={isLoading} blur pointerEventsNone>
 *   <Spinner />
 * </Overlay>
 * ```
 *
 * @see {@link OverlayProps} for all available props
 */
export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  function Overlay(
    {
      open = true,
      onClose,
      portal = true,
      pointerEventsNone,
      children,
      ...props
    },
    ref
  ) {
    const theme = useTheme();

    if (!open) return null;

    // Handle click on overlay background (not children)
    const handleClick = (event: React.MouseEvent) => {
      if (!pointerEventsNone && event.target === event.currentTarget && onClose) {
        onClose();
      }
    };

    const content = (
      <ThemedComponent
        ref={ref}
        theme={theme.overlay}
        onClick={handleClick}
        {...{ ...props, pointerEventsNone }}
      >
        {children}
      </ThemedComponent>
    );

    // Portal to body or render in place
    if (portal && typeof document !== 'undefined') {
      return createPortal(content, document.body);
    }

    return content;
  }
);

Overlay.displayName = 'Overlay';
