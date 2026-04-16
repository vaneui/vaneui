import React, { useState, useRef, useCallback, useEffect, useId, cloneElement } from 'react';
import type { PopupTriggerProps } from './PopupTriggerProps';
import { Popup } from './Popup';

/**
 * PopupTrigger - convenience wrapper that manages open state and ref wiring.
 *
 * Simplifies the common pattern of anchor + popup by handling:
 * - Ref management (auto-wires anchorRef to the trigger element)
 * - Open/close state management
 * - Click, hover, and focus trigger modes
 * - Hover delays for tooltip-like behavior
 *
 * @example
 * ```tsx
 * // Click-triggered popup (default)
 * <PopupTrigger popup={<Text>Dropdown content</Text>}>
 *   <Button>Open Menu</Button>
 * </PopupTrigger>
 * ```
 *
 * @example
 * ```tsx
 * // Hover-triggered popup with delay
 * <PopupTrigger
 *   triggerOnHover
 *   openDelay={200}
 *   popup={<Text sm>Tooltip text</Text>}
 *   popupProps={{ top: true, sm: true, noPadding: false }}
 * >
 *   <Button>Hover me</Button>
 * </PopupTrigger>
 * ```
 *
 * @example
 * ```tsx
 * // Focus-triggered popup (for inputs)
 * <PopupTrigger
 *   triggerOnFocus
 *   popup={<List><ListItem>Suggestion 1</ListItem></List>}
 *   popupProps={{ bottomStart: true, matchWidth: true }}
 * >
 *   <Input placeholder="Search..." />
 * </PopupTrigger>
 * ```
 */
export function PopupTrigger({
  children,
  popup,
  triggerOnClick,
  triggerOnHover,
  triggerOnFocus,
  openDelay = 0,
  closeDelay = 150,
  popupProps,
  popupId: popupIdProp,
  disabled = false,
}: PopupTriggerProps) {
  // Default to click when no trigger boolean is set
  const isHover = triggerOnHover ?? false;
  const isFocus = triggerOnFocus ?? false;
  const useClick = triggerOnClick ?? (!isHover && !isFocus);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);
  const generatedId = useId();
  const popupId = popupIdProp || `popup-trigger-${generatedId.replace(/:/g, '-')}`;
  const prevOpenRef = useRef(false);

  // Return focus to trigger element when popup closes (skip for focus/hover triggers to avoid re-open loop)
  useEffect(() => {
    if (prevOpenRef.current && !open && useClick && anchorRef.current) {
      anchorRef.current.focus();
    }
    prevOpenRef.current = open;
  }, [open, useClick]);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const clearTimers = useCallback(() => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const handleOpen = useCallback(() => {
    clearTimers();
    if (openDelay > 0) {
      openTimeoutRef.current = setTimeout(() => setOpen(true), openDelay);
    } else {
      setOpen(true);
    }
  }, [openDelay, clearTimers]);

  const handleClose = useCallback(() => {
    clearTimers();
    if (isHover && closeDelay > 0) {
      closeTimeoutRef.current = setTimeout(() => setOpen(false), closeDelay);
    } else {
      setOpen(false);
    }
  }, [isHover, closeDelay, clearTimers]);

  const handleToggle = useCallback(() => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [open, handleOpen, handleClose]);

  // Build event handlers based on trigger mode (skip when disabled)
  const triggerHandlers: Record<string, React.EventHandler<React.SyntheticEvent>> = {};

  if (!disabled) {
    const childProps = (children as React.ReactElement<Record<string, unknown>>).props;

    const composeHandler = (name: string, handler: () => void) => {
      return (e: React.SyntheticEvent) => {
        const original = childProps?.[name];
        if (typeof original === 'function') {
          (original as (e: React.SyntheticEvent) => void)(e);
        }
        handler();
      };
    };

    if (useClick) {
      triggerHandlers.onClick = (e: React.SyntheticEvent) => {
        const originalOnClick = childProps?.onClick;
        if (typeof originalOnClick === 'function') {
          (originalOnClick as (e: React.SyntheticEvent) => void)(e);
        }
        handleToggle();
      };
    }
    if (isHover) {
      triggerHandlers.onMouseEnter = composeHandler('onMouseEnter', handleOpen);
      triggerHandlers.onMouseLeave = composeHandler('onMouseLeave', handleClose);
      // Accessibility: keyboard focus/blur also opens/closes in hover mode
      triggerHandlers.onFocus = composeHandler('onFocus', handleOpen);
      triggerHandlers.onBlur = composeHandler('onBlur', handleClose);
    }
    if (isFocus && !isHover) {
      // Focus-only mode (hover already handles focus/blur above)
      triggerHandlers.onFocus = composeHandler('onFocus', handleOpen);
      triggerHandlers.onBlur = composeHandler('onBlur', handleClose);
    }
  }

  // Determine the appropriate aria-haspopup value based on popup role
  const ariaHaspopup = popupProps?.role || 'dialog';

  // Clone the child element with ref, event handlers, and ARIA attributes
  const triggerElement = cloneElement(children, {
    ref: anchorRef,
    'aria-expanded': disabled ? undefined : open,
    'aria-haspopup': disabled ? undefined : ariaHaspopup,
    'aria-controls': !disabled && open ? popupId : undefined,
    ...triggerHandlers,
  } as Record<string, unknown>);

  return (
    <>
      {triggerElement}
      <Popup
        open={open}
        onClose={handleClose}
        anchorRef={anchorRef}
        id={popupId}
        disabled={disabled}
        {...(isHover ? {
          onMouseEnter: () => { clearTimers(); },
          onMouseLeave: handleClose,
          onFocus: () => { clearTimers(); },
          onBlur: handleClose,
        } : {})}
        {...popupProps}
      >
        {popup}
      </Popup>
    </>
  );
}

PopupTrigger.displayName = 'PopupTrigger';
