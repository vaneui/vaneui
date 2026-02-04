import React, { forwardRef, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from './ModalProps';
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';
import { useScrollLock } from '../../utils/scrollLock';
import { useFocusTrap } from '../../utils/focusTrap';

/**
 * Modal component - an accessible dialog window.
 *
 * Built on top of Overlay, adds:
 * - Scroll lock (prevents body scroll)
 * - Focus trap (Tab cycles within modal)
 * - Escape key to close
 * - ARIA dialog semantics
 * - Focus restoration on close
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
 * // Large modal without overlay click-to-close
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   closeOnOverlayClick={false}
 *   lg
 * >
 *   <Title>Form</Title>
 *   <Input placeholder="Name" />
 *   <Button filled>Submit</Button>
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // Modal with custom overlay (blur effect)
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   overlayProps={{ blur: true }}
 * >
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
      children,
      ...props
    },
    ref
  ) {
    const theme = useTheme();
    const contentRef = useRef<HTMLDivElement>(null);

    // Merge forwarded ref with internal contentRef
    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        // Update internal ref
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        // Forward to external ref
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

    if (!open) return null;

    const content = (
      <ThemedComponent
        theme={theme.modal.overlay}
        onClick={handleOverlayClick}
        {...overlayProps}
      >
        <ThemedComponent
          ref={mergedRef}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          theme={theme.modal.content as any}
          role="dialog"
          aria-modal="true"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          {...props}
        >
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
