import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import type { OverlayProps } from "./OverlayProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { useTransition } from '../../utils/transition';
import { useStackingContext } from '../../utils/stackingContext';
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
        theme={theme.overlay}
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

    if (portal && typeof document !== 'undefined') {
      return createPortal(content, document.body);
    }

    return content;
  }
);

Overlay.displayName = 'Overlay';
