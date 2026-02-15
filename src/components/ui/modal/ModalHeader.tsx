import { forwardRef } from 'react';
import type { ModalHeaderProps } from "./ModalHeaderProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useModalContext } from "./ModalContext";

/**
 * ModalHeader - top section of a compound Modal.
 *
 * Flex row with items-center and justify-between by default.
 * Does not scroll (flex-shrink: 0 via CSS).
 *
 * When placed inside a Modal with `closeButton`, automatically renders
 * the close button inline (right-aligned via justify-between).
 * This replaces the absolute-positioned fallback.
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={close} closeButton>
 *   <ModalHeader>
 *     <Title>Edit Profile</Title>
 *   </ModalHeader>
 *   <ModalBody>...</ModalBody>
 *   <ModalFooter>...</ModalFooter>
 * </Modal>
 * ```
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader({ children, ...props }, ref) {
    const theme = useTheme();
    const modalCtx = useModalContext();

    return (
      <ThemedComponent theme={theme.modal.header} ref={ref} {...props}>
        {children}
        {modalCtx?.closeButton && (
          <ThemedComponent
            theme={theme.button}
            tag="button"
            className="vane-modal-close"
            {...{
              type: 'button',
              secondary: true,
              transparent: true,
              noShadow: true,
              noRing: true,
              onClick: modalCtx.onClose,
              'aria-label': 'Close',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </ThemedComponent>
        )}
      </ThemedComponent>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';
