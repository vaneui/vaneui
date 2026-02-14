import React, { useState, useRef, useCallback, useEffect, cloneElement } from 'react';
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
 *   trigger="hover"
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
 *   trigger="focus"
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
  trigger = 'click',
  openDelay = 0,
  closeDelay = 150,
  popupProps,
}: PopupTriggerProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);
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
    if (trigger === 'hover' && closeDelay > 0) {
      closeTimeoutRef.current = setTimeout(() => setOpen(false), closeDelay);
    } else {
      setOpen(false);
    }
  }, [trigger, closeDelay, clearTimers]);

  const handleToggle = useCallback(() => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [open, handleOpen, handleClose]);

  // Build event handlers based on trigger mode
  const triggerHandlers: Record<string, React.EventHandler<React.SyntheticEvent>> = {};

  if (trigger === 'click') {
    triggerHandlers.onClick = (e: React.SyntheticEvent) => {
      // Call original handler if present
      const originalOnClick = (children as React.ReactElement<Record<string, unknown>>).props?.onClick;
      if (typeof originalOnClick === 'function') {
        (originalOnClick as (e: React.SyntheticEvent) => void)(e);
      }
      handleToggle();
    };
  } else if (trigger === 'hover') {
    triggerHandlers.onMouseEnter = handleOpen;
    triggerHandlers.onMouseLeave = handleClose;
  } else if (trigger === 'focus') {
    triggerHandlers.onFocus = handleOpen;
    triggerHandlers.onBlur = handleClose;
  }

  // Clone the child element with ref and event handlers
  const triggerElement = cloneElement(children, {
    ref: anchorRef,
    ...triggerHandlers,
  } as Record<string, unknown>);

  return (
    <>
      {triggerElement}
      <Popup
        open={open}
        onClose={handleClose}
        anchorRef={anchorRef}
        {...(trigger === 'hover' ? {
          onMouseEnter: () => { clearTimers(); },
          onMouseLeave: handleClose,
        } : {})}
        {...popupProps}
      >
        {popup}
      </Popup>
    </>
  );
}

PopupTrigger.displayName = 'PopupTrigger';
