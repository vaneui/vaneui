import React, { useRef, useCallback, useEffect, useId, cloneElement } from 'react';
import type { PopupTriggerProps } from './PopupTriggerProps';
import { Popup } from './Popup';
import { useControllableState } from '../../utils/controllableState';
import { composeRefs, getElementRef } from '../../utils/composeRefs';

export function PopupTrigger({
  children,
  popup,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
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

  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const anchorRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const popupId = popupIdProp || `popup-trigger-${generatedId.replace(/:/g, '-')}`;
  const prevOpenRef = useRef(false);
  // set only while we programmatically return focus to the trigger on close, so
  // a hover/focus trigger's onFocus doesn't immediately re-open the popup
  const suppressOpenRef = useRef(false);

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
  }, [openDelay, clearTimers, setOpen]);

  const handleClose = useCallback(() => {
    clearTimers();
    if (isHover && closeDelay > 0) {
      closeTimeoutRef.current = setTimeout(() => setOpen(false), closeDelay);
    } else {
      setOpen(false);
    }
  }, [isHover, closeDelay, clearTimers, setOpen]);

  // Return focus to the trigger when the popup closes and focus would otherwise
  // be lost (Escape / click-outside) or trapped in the now-removed popup. Click
  // mode always returns (its prior contract); for hover/focus modes the suppress
  // flag stops the returned focus from re-opening the popup.
  useEffect(() => {
    if (prevOpenRef.current && !open && anchorRef.current) {
      const active = document.activeElement;
      const focusLostOrInPopup =
        !active || active === document.body || !!popupRef.current?.contains(active);
      if (useClick || focusLostOrInPopup) {
        if (!useClick) suppressOpenRef.current = true;
        anchorRef.current.focus();
      }
    }
    prevOpenRef.current = open;
  }, [open, useClick]);

  const handleToggle = useCallback(() => {
    if (open) handleClose();
    else handleOpen();
  }, [open, handleOpen, handleClose]);

  // A "focus out" closes only when focus left BOTH the trigger and the popup.
  // Moving focus between them (they form one focus group) keeps the popup open
  // so keyboard users can reach its content (SC 1.4.13), instead of closing on
  // the trigger's blur before focus has landed in the popup.
  const handleFocusOut = useCallback((e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (anchorRef.current?.contains(next) || popupRef.current?.contains(next)) return;
    handleClose();
  }, [handleClose]);

  const handleTriggerFocus = useCallback(() => {
    if (suppressOpenRef.current) { suppressOpenRef.current = false; return; }
    handleOpen();
  }, [handleOpen]);

  const triggerHandlers: Record<string, React.EventHandler<React.SyntheticEvent>> = {};

  if (!disabled) {
    const childProps = (children as React.ReactElement<Record<string, unknown>>).props;

    const compose = (name: string, handler: (e: React.SyntheticEvent) => void) =>
      (e: React.SyntheticEvent) => {
        const original = childProps?.[name];
        if (typeof original === 'function') (original as (e: React.SyntheticEvent) => void)(e);
        handler(e);
      };

    if (useClick) {
      triggerHandlers.onClick = compose('onClick', () => handleToggle());
    }
    if (isHover) {
      triggerHandlers.onMouseEnter = compose('onMouseEnter', () => handleOpen());
      triggerHandlers.onMouseLeave = compose('onMouseLeave', () => handleClose());
    }
    // keyboard focus opens in hover mode too; blur uses the focus-group check
    if (isHover || isFocus) {
      triggerHandlers.onFocus = compose('onFocus', () => handleTriggerFocus());
      triggerHandlers.onBlur = compose('onBlur', (e) => handleFocusOut(e as React.FocusEvent));
    }
  }

  const popupRole = popupProps?.role || 'dialog';
  // tooltip semantics differ from disclosure semantics: the trigger is
  // DESCRIBED BY the tooltip, and aria-haspopup/aria-expanded do not apply
  // (haspopup has no "tooltip" value). aria-controls/aria-describedby are
  // emitted only while the popup is open — the popup unmounts when closed, so
  // referencing its id while closed would be a dangling IDREF (worse than
  // absent). aria-haspopup + aria-expanded already advertise the relationship.
  const isTooltip = popupRole === 'tooltip';

  const triggerAria: Record<string, unknown> = isTooltip
    ? { 'aria-describedby': !disabled && open ? popupId : undefined }
    : {
        'aria-expanded': disabled ? undefined : open,
        'aria-haspopup': disabled ? undefined : popupRole,
        'aria-controls': !disabled && open ? popupId : undefined,
      };

  // compose with the trigger's own ref — cloneElement would silently
  // replace a ref the consumer attached to their trigger element
  const triggerElement = cloneElement(children, {
    ref: composeRefs(getElementRef(children), anchorRef),
    ...triggerAria,
    ...triggerHandlers,
  } as Record<string, unknown>);

  // popup-side focus-group handlers: keep it open while focus (or, in hover
  // mode, the pointer) is within it; close when it leaves the whole group
  const popupGroupHandlers = (isHover || isFocus)
    ? {
        onFocus: () => { clearTimers(); },
        onBlur: (e: React.FocusEvent) => handleFocusOut(e),
        ...(isHover
          ? { onMouseEnter: () => { clearTimers(); }, onMouseLeave: () => handleClose() }
          : {}),
      }
    : {};

  return (
    <>
      {triggerElement}
      <Popup
        ref={popupRef}
        open={open}
        onClose={handleClose}
        anchorRef={anchorRef}
        id={popupId}
        disabled={disabled}
        // click-opened dialogs portal to document.body, breaking Tab order —
        // move focus in on open; never steal focus for hover/focus modes or
        // tooltips (consumer popupProps can override)
        autoFocus={useClick && !isTooltip}
        {...popupGroupHandlers}
        {...popupProps}
      >
        {popup}
      </Popup>
    </>
  );
}

PopupTrigger.displayName = 'PopupTrigger';
