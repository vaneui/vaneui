import React, { forwardRef, useRef, useEffect, useMemo, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from './ModalProps';
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';
import { useScrollLock } from '../../utils/scrollLock';
import { useFocusTrap } from '../../utils/focusTrap';
import { useControllableState } from '../../utils/controllableState';
import { useTransition } from '../../utils/transition';
import { useStackingContext } from '../../utils/stackingContext';

/**
 * Modal component - an accessible dialog window.
 *
 * Features:
 * - Scroll lock (prevents body scroll)
 * - Focus trap (Tab cycles within modal)
 * - Escape key to close
 * - ARIA dialog semantics (aria-labelledby, aria-describedby)
 * - Focus restoration on close
 * - Enter/exit animations (disable with noAnimation)
 * - Dynamic z-index stacking for nested modals
 * - Optional close button, fullScreen, centered control
 * - Compound components: ModalHeader, ModalBody, ModalFooter
 *
 * @example
 * ```tsx
 * // Basic modal
 * <Modal open={isOpen} onClose={() => setIsOpen(false)}>
 *   <Title>Confirm</Title>
 *   <Text>Are you sure?</Text>
 *   <Row>
 *     <Button secondary onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button filled onClick={handleConfirm}>Confirm</Button>
 *   </Row>
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // Modal with compound components and close button
 * <Modal open={isOpen} onClose={close} closeButton>
 *   <ModalHeader><Title>Edit Profile</Title></ModalHeader>
 *   <ModalBody>
 *     <Input placeholder="Name" />
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button secondary onClick={close}>Cancel</Button>
 *     <Button filled>Save</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // Full-screen modal
 * <Modal open={isOpen} onClose={close} fullScreen>
 *   Content here
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
      closeButton = false,
      centered = true,
      fullScreen = false,
      ariaLabelledBy,
      ariaDescribedBy,
      children,
      ...props
    },
    ref
  ) {
    const theme = useTheme();
    const contentRef = useRef<HTMLDivElement>(null);
    const generatedId = useId();

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

    // Transition states for overlay and content
    const overlayTransition = useTransition(open, transitionDuration, noAnimation);
    const contentTransition = useTransition(open, transitionDuration, noAnimation);
    const zIndex = useStackingContext(open);

    // Merge forwarded ref with internal contentRef
    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // Scroll lock
    useScrollLock(open && scrollLock);

    // Focus trap
    const focusTrapOptions = useMemo(
      () => ({ returnFocus, initialFocus }),
      [returnFocus, initialFocus]
    );
    useFocusTrap(contentRef, open && focusTrap, focusTrapOptions);

    // Escape key handler
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, closeOnEscape, onClose]);

    // Handle overlay click
    const handleOverlayClick = (event: React.MouseEvent) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    // ARIA IDs
    const labelId = ariaLabelledBy || `${generatedId}-label`;
    const descId = ariaDescribedBy || `${generatedId}-desc`;

    // Determine if we should render at all
    const shouldMount = overlayTransition.mounted || keepMounted;
    if (!shouldMount) return null;

    const isHidden = !overlayTransition.mounted && keepMounted;

    // Build overlay props for centered/fullScreen
    const computedOverlayProps = {
      ...overlayProps,
      ...(centered === false ? { itemsStart: true as const } : {}),
      ...(fullScreen ? { className: [overlayProps?.className, 'bg-transparent'].filter(Boolean).join(' ') } : {}),
    };

    // Build content style for fullScreen
    const fullScreenStyle: React.CSSProperties | undefined = fullScreen
      ? { width: '100vw', height: '100vh', maxWidth: 'none', maxHeight: 'none', borderRadius: 0 }
      : undefined;

    const durationStyle = transitionDuration !== 200
      ? { '--transition-duration': `${transitionDuration}ms` } as React.CSSProperties
      : undefined;

    const content = (
      <ThemedComponent
        theme={theme.modal.overlay}
        onClick={handleOverlayClick}
        data-state={isHidden ? undefined : overlayTransition.state}
        style={{ zIndex, ...durationStyle, ...(isHidden ? { display: 'none' } : undefined) }}
        aria-hidden={isHidden || undefined}
        {...computedOverlayProps}
      >
        <ThemedComponent
          ref={mergedRef}
          theme={theme.modal.content}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledBy ? labelId : undefined}
          aria-describedby={ariaDescribedBy ? descId : undefined}
          data-state={isHidden ? undefined : contentTransition.state}
          style={{ ...durationStyle, ...fullScreenStyle }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          {...props}
        >
          {closeButton && (
            <button
              type="button"
              className="vane-modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          )}
          {children}
        </ThemedComponent>
      </ThemedComponent>
    );

    // Portal to body
    if (typeof document !== 'undefined') {
      return createPortal(content, document.body);
    }

    return content;
  }
);

Modal.displayName = 'Modal';
