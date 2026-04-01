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

/**
 * Modal component - an accessible dialog window.
 *
 * Features:
 * - Scroll lock (prevents body scroll)
 * - Focus trap (Tab cycles within modal)
 * - Escape key to close
 * - ARIA dialog semantics (role="dialog", aria-modal)
 * - Focus restoration on close
 * - Enter/exit animations (disable with noAnimation)
 * - Dynamic z-index stacking for nested modals
 * - Padding on sub-components (header/body/footer), not the wrapper
 * - Auto-wraps bare children in ModalBody; use ModalHeader/ModalBody/ModalFooter for compound mode
 * - Convenience props: title, footer, withCloseButton
 *
 * @example
 * ```tsx
 * // Simple — children auto-wrapped in ModalBody
 * <Modal open onClose={close}>
 *   <Title>Confirm</Title>
 *   <Text>Are you sure?</Text>
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // Convenience — title/footer auto-generate header/footer sub-components
 * <Modal open onClose={close} title={<Title>Edit Profile</Title>} footer={<Button filled>Save</Button>}>
 *   <Input placeholder="Name" />
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // Compound — explicit sub-components, rendered as-is
 * <Modal open onClose={close}>
 *   <ModalHeader><Title>Edit</Title><ModalCloseButton /></ModalHeader>
 *   <ModalBody><Input /></ModalBody>
 *   <ModalFooter><Button filled>Save</Button></ModalFooter>
 * </Modal>
 * ```
 */
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
    // Controllable open state — supports both controlled and uncontrolled modes
    const [open, setOpen] = useControllableState({
      value: openProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const onClose = useCallback(() => {
      onCloseProp?.();
      setOpen(false);
    }, [onCloseProp, setOpen]);

    // ARIA auto-connection: generate stable IDs and track mount state
    const uniqueId = useId();
    const titleId = `modal-title-${uniqueId.replace(/:/g, '-')}`;
    const bodyId = `modal-body-${uniqueId.replace(/:/g, '-')}`;
    const [titleMounted, setTitleMounted] = useState(false);
    const [bodyMounted, setBodyMounted] = useState(false);

    // Transition states for overlay and content
    const overlayTransition = useTransition(open, transitionDuration, noAnimation, { onEnterComplete, onExitComplete });
    const contentTransition = useTransition(open, transitionDuration, noAnimation);
    const zIndex = useStackingContext(open, 'modal');

    const mergedRef = useMergedRef(ref, contentRef);

    // Scroll lock
    useScrollLock(open && scrollLock);

    // Focus trap
    const focusTrapOptions = useMemo(
      () => ({ returnFocus, initialFocus }),
      [returnFocus, initialFocus]
    );
    useFocusTrap(contentRef, open && focusTrap, focusTrapOptions);

    // Escape key — only the topmost floating element (modal/popup) closes
    useEffect(() => {
      if (!open || !closeOnEscape) return;
      return pushEscapeHandler(onClose);
    }, [open, closeOnEscape, onClose]);

    // Handle overlay click
    const handleOverlayClick = (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    // Must be before early return — hooks must run unconditionally
    const contextValue = useMemo(
      () => ({ onClose, titleId, bodyId, setTitleMounted, setBodyMounted }),
      [onClose, titleId, bodyId]
    );

    // Detect compound mode: user explicitly passes ModalHeader/ModalBody/ModalFooter as children
    const childArray = React.Children.toArray(children);
    const isCompoundMode = childArray.some(
      child => React.isValidElement(child) &&
        (child.type === ModalHeader || child.type === ModalBody || child.type === ModalFooter)
    );
    const showCloseButton = withCloseButton ?? (title !== undefined);

    // Determine if we should render at all
    const shouldMount = overlayTransition.mounted || keepMounted;
    if (!shouldMount) return null;

    const isHidden = !overlayTransition.mounted && keepMounted;

    // Build overlay props for fullScreen
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

    // Portal to body or render in place
    if (portal && typeof document !== 'undefined') {
      return createPortal(content, document.body);
    }

    return content;
  }
);

Modal.displayName = 'Modal';
