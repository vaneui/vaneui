import React, { useState, useRef, useCallback, useEffect, useId, cloneElement } from 'react';
import type { PopupTriggerProps } from './PopupTriggerProps';
import { Popup } from './Popup';
import { composeRefs, getElementRef } from '../../utils/composeRefs';

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
  const isHover = triggerOnHover ?? false;
  const isFocus = triggerOnFocus ?? false;
  const useClick = triggerOnClick ?? (!isHover && !isFocus);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);
  const generatedId = useId();
  const popupId = popupIdProp || `popup-trigger-${generatedId.replace(/:/g, '-')}`;
  const prevOpenRef = useRef(false);

  // return focus to trigger on close; skip for focus/hover to avoid re-open loop
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
      // a11y: keyboard focus/blur opens/closes in hover mode too
      triggerHandlers.onFocus = composeHandler('onFocus', handleOpen);
      triggerHandlers.onBlur = composeHandler('onBlur', handleClose);
    }
    if (isFocus && !isHover) {
      triggerHandlers.onFocus = composeHandler('onFocus', handleOpen);
      triggerHandlers.onBlur = composeHandler('onBlur', handleClose);
    }
  }

  const ariaHaspopup = popupProps?.role || 'dialog';

  // compose with the trigger's own ref — cloneElement would silently
  // replace a ref the consumer attached to their trigger element
  const triggerElement = cloneElement(children, {
    ref: composeRefs(getElementRef(children), anchorRef),
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
