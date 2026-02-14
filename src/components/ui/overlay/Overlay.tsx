import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import type { OverlayProps } from "./OverlayProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { useTransition } from '../../utils/transition';
import { useStackingContext } from '../../utils/stackingContext';

/**
 * Overlay component - a fullscreen backdrop for modals, drawers, lightboxes, etc.
 *
 * Features:
 * - Portal rendering (escapes parent z-index context)
 * - Click-to-close behavior
 * - Optional blur effect
 * - Centered by default (use itemsStart/justifyStart to override)
 * - Enter/exit animations (disable with noAnimation)
 * - Dynamic z-index stacking for nested overlays
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
      keepMounted = false,
      noAnimation = false,
      transitionDuration = 200,
      pointerEventsNone,
      children,
      ...props
    },
    ref
  ) {
    const theme = useTheme();
    const { mounted, state } = useTransition(open, transitionDuration, noAnimation);
    const zIndex = useStackingContext(open);

    if (!mounted && !keepMounted) return null;

    // Handle click on overlay background (not children)
    const handleClick = (event: React.MouseEvent) => {
      if (!pointerEventsNone && event.target === event.currentTarget && onClose) {
        onClose();
      }
    };

    const isHidden = !mounted && keepMounted;

    const content = (
      <ThemedComponent
        ref={ref}
        theme={theme.overlay}
        onClick={handleClick}
        data-state={isHidden ? undefined : state}
        style={{
          zIndex,
          ...(transitionDuration !== 200 ? { '--transition-duration': `${transitionDuration}ms` } as React.CSSProperties : undefined),
          ...(isHidden ? { display: 'none' } : undefined),
        }}
        aria-hidden={isHidden || undefined}
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
