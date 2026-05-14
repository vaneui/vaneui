import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import type { OverlayProps } from "./OverlayProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { useTransition } from '../../utils/transition';
import { useStackingContext } from '../../utils/stackingContext';

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  function Overlay(
    {
      open = true,
      onClose,
      portal = true,
      keepMounted = false,
      noAnimation = false,
      transitionDuration = 200,
      onEnterComplete,
      onExitComplete,
      pointerEventsNone,
      children,
      ...props
    },
    ref
  ) {
    const theme = useTheme();
    const { mounted, state } = useTransition(open, transitionDuration, noAnimation, { onEnterComplete, onExitComplete });
    const zIndex = useStackingContext(open, 'overlay');

    if (!mounted && !keepMounted) return null;

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
        className={isHidden ? 'hidden' : undefined}
        onClick={handleClick}
        data-state={isHidden ? undefined : state}
        style={{
          '--z-index': zIndex,
          ...(transitionDuration !== 200 ? { '--transition-duration': `${transitionDuration}ms` } : undefined),
        } as React.CSSProperties}
        aria-hidden={isHidden || undefined}
        {...{ ...props, pointerEventsNone }}
      >
        {children}
      </ThemedComponent>
    );

    if (portal && typeof document !== 'undefined') {
      return createPortal(content, document.body);
    }

    return content;
  }
);

Overlay.displayName = 'Overlay';
