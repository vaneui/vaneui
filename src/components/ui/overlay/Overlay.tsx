import React, { forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { OverlayProps } from "./OverlayProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { defaultOverlayTheme } from "./defaultOverlayTheme";
import { useTransition } from '../../utils/transition';
import { useStackingContext } from '../../utils/stackingContext';
import { pushEscapeHandler } from '../../utils/escapeStack';
import { composeEventHandlers } from '../../utils/composeEventHandlers';

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
      onClick: consumerOnClick,
      style: consumerStyle,
      className: consumerClassName,
      ...props
    },
    ref
  ) {
    const theme = useTheme();
    const { mounted, state } = useTransition(open, transitionDuration, noAnimation, { onEnterComplete, onExitComplete });
    const zIndex = useStackingContext(open, 'overlay');

    // keyboard parity with backdrop click-to-close: Escape dismisses a
    // dismissible (onClose) overlay — only the topmost one, via the shared stack
    useEffect(() => {
      if (!open || !onClose) return;
      return pushEscapeHandler(() => onClose());
    }, [open, onClose]);

    if (!mounted && !keepMounted) return null;

    const handleClick = (event: React.MouseEvent) => {
      // defaultPrevented lets a composed consumer onClick veto the close
      if (!pointerEventsNone && !event.defaultPrevented && event.target === event.currentTarget && onClose) {
        onClose();
      }
    };

    const isHidden = !mounted && keepMounted;

    const content = (
      <ThemedComponent
        ref={ref}
        theme={theme?.overlay ?? defaultOverlayTheme}
        data-state={isHidden ? undefined : state}
        aria-hidden={isHidden || undefined}
        {...{
          ...props,
          pointerEventsNone,
          className: [isHidden ? 'hidden' : undefined, consumerClassName].filter(Boolean).join(' ') || undefined,
          onClick: composeEventHandlers(consumerOnClick, handleClick),
          style: {
            '--z-index': zIndex,
            ...(transitionDuration !== 200 ? { '--transition-duration': `${transitionDuration}ms` } : undefined),
            ...consumerStyle,
          } as React.CSSProperties,
        }}
      >
        {children}
      </ThemedComponent>
    );

    if (portal) {
      // SSR: the portal target can't exist server-side, and rendering the
      // content inline would hydrate differently than the client (which
      // portals to document.body) - render nothing; portaled content
      // appears after hydration
      if (typeof document === 'undefined') {
        return null;
      }
      return createPortal(content, document.body);
    }

    return content;
  }
);

Overlay.displayName = 'Overlay';
