import React, { forwardRef, useRef, useEffect, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from './ModalProps';
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';
import { useScrollLock } from '../../utils/scrollLock';
import { useFocusTrap } from '../../utils/focusTrap';
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
      open,
      onClose,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      scrollLock = true,
      focusTrap = true,
      overlayProps,
      keepMounted = false,
      noAnimation = false,
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

    // Transition states for overlay and content
    const overlayTransition = useTransition(open, 200, noAnimation);
    const contentTransition = useTransition(open, 200, noAnimation);
    const zIndex = useStackingContext(open);

    // Merge forwarded ref with internal contentRef
    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    // Scroll lock
    useScrollLock(open && scrollLock);

    // Focus trap
    useFocusTrap(contentRef, open && focusTrap);

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

    const content = (
      <ThemedComponent
        theme={theme.modal.overlay}
        onClick={handleOverlayClick}
        data-state={isHidden ? undefined : overlayTransition.state}
        style={{ zIndex, ...(isHidden ? { display: 'none' } : undefined) }}
        aria-hidden={isHidden || undefined}
        {...computedOverlayProps}
      >
        <ThemedComponent
          ref={mergedRef}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          theme={theme.modal.content as any}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledBy ? labelId : undefined}
          aria-describedby={ariaDescribedBy ? descId : undefined}
          data-state={isHidden ? undefined : contentTransition.state}
          style={fullScreenStyle}
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
