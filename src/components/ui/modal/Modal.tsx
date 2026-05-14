import React, { forwardRef, useRef, useEffect, useId, useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from './ModalProps';
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';
import { useScrollLock } from '../../utils/scrollLock';
import { useFocusTrap } from '../../utils/focusTrap';
import { useControllableState } from '../../utils/controllableState';
import { useTransition } from '../../utils/transition';
import { useStackingContext } from '../../utils/stackingContext';
import { useMergedRef } from '../../utils/mergedRef';
import { pushEscapeHandler } from '../../utils/escapeStack';
import { ModalContext } from './ModalContext';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalCloseButton } from './ModalCloseButton';

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  function Modal(
    {
      open: openProp,
      onClose: onCloseProp,
      defaultOpen = false,
      onOpenChange,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      scrollLock = true,
      focusTrap = true,
      returnFocus = true,
      initialFocus,
      overlayProps,
      keepMounted = false,
      noAnimation = false,
      transitionDuration = 200,
      fullScreen = false,
      portal = true,
      onEnterComplete,
      onExitComplete,
      title,
      footer,
      withCloseButton,
      children,
      ...props
    },
    ref
  ) {
    const theme = useTheme();
    const contentRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useControllableState({
      value: openProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const onClose = useCallback(() => {
      onCloseProp?.();
      setOpen(false);
    }, [onCloseProp, setOpen]);

    const uniqueId = useId();
    const titleId = `modal-title-${uniqueId.replace(/:/g, '-')}`;
    const bodyId = `modal-body-${uniqueId.replace(/:/g, '-')}`;
    const [titleMounted, setTitleMounted] = useState(false);
    const [bodyMounted, setBodyMounted] = useState(false);

    const overlayTransition = useTransition(open, transitionDuration, noAnimation, { onEnterComplete, onExitComplete });
    const contentTransition = useTransition(open, transitionDuration, noAnimation);
    const zIndex = useStackingContext(open, 'modal');

    const mergedRef = useMergedRef(ref, contentRef);

    useScrollLock(open && scrollLock);

    const focusTrapOptions = useMemo(
      () => ({ returnFocus, initialFocus }),
      [returnFocus, initialFocus]
    );
    useFocusTrap(contentRef, open && focusTrap, focusTrapOptions);

    // only the topmost floating element closes on Escape
    useEffect(() => {
      if (!open || !closeOnEscape) return;
      return pushEscapeHandler(onClose);
    }, [open, closeOnEscape, onClose]);

    const handleOverlayClick = (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    // must run unconditionally before early return
    const contextValue = useMemo(
      () => ({ onClose, titleId, bodyId, setTitleMounted, setBodyMounted }),
      [onClose, titleId, bodyId]
    );

    const childArray = React.Children.toArray(children);
    const isCompoundMode = childArray.some(
      child => React.isValidElement(child) &&
        (child.type === ModalHeader || child.type === ModalBody || child.type === ModalFooter)
    );
    const showCloseButton = withCloseButton ?? (title !== undefined);

    const shouldMount = overlayTransition.mounted || keepMounted;
    if (!shouldMount) return null;

    const isHidden = !overlayTransition.mounted && keepMounted;

    const computedOverlayProps = {
      ...overlayProps,
      ...(fullScreen ? { transparent: true } : {}),
    };

    const cssVars = {
      '--z-index': zIndex,
      ...(transitionDuration !== 200 ? { '--transition-duration': `${transitionDuration}ms` } : undefined),
    } as React.CSSProperties;

    const contentDurationStyle = transitionDuration !== 200
      ? { '--transition-duration': `${transitionDuration}ms` } as React.CSSProperties
      : undefined;

    const content = (
      <ThemedComponent
        theme={theme.modal.overlay}
        className={isHidden ? 'hidden' : undefined}
        onClick={handleOverlayClick}
        data-state={isHidden ? undefined : overlayTransition.state}
        style={cssVars}
        aria-hidden={isHidden || undefined}
        {...computedOverlayProps}
      >
        <ThemedComponent
          ref={mergedRef}
          theme={theme.modal.content}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleMounted ? titleId : undefined}
          aria-describedby={bodyMounted ? bodyId : undefined}
          data-state={isHidden ? undefined : contentTransition.state}
          style={contentDurationStyle}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          {...props}
          {...(fullScreen ? { sharp: true, wScreen: true, hScreen: true } : {})}
        >
          <ModalContext.Provider value={contextValue}>
            {isCompoundMode ? (
              children
            ) : (
              <>
                {(title !== undefined || showCloseButton) && (
                  <ModalHeader>
                    {title}
                    {showCloseButton && <ModalCloseButton />}
                  </ModalHeader>
                )}
                <ModalBody>{children}</ModalBody>
                {footer !== undefined && (
                  <ModalFooter>{footer}</ModalFooter>
                )}
              </>
            )}
          </ModalContext.Provider>
        </ThemedComponent>
      </ThemedComponent>
    );

    if (portal && typeof document !== 'undefined') {
      return createPortal(content, document.body);
    }

    return content;
  }
);

Modal.displayName = 'Modal';
