import { forwardRef } from 'react';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from '../../themeContext';
import { useModalContext } from './ModalContext';

/**
 * ModalCloseButton — composable close button for Modal.
 *
 * Reads `onClose` from Modal's context automatically.
 * Place it wherever you want: inside ModalHeader, ModalBody, or directly in Modal.
 *
 * Renders through `theme.button.main` with appearance controlled by
 * `theme.modal.closeButton.defaults`. Customizable via ThemeProvider:
 *
 * ```tsx
 * <ThemeProvider themeDefaults={{ modal: { closeButton: { primary: true } } }}>
 * ```
 *
 * @example
 * ```tsx
 * // Inside ModalHeader (pushed right by justify-between)
 * <Modal open={isOpen} onClose={close}>
 *   <ModalHeader>
 *     <Title>Edit Profile</Title>
 *     <ModalCloseButton />
 *   </ModalHeader>
 *   <ModalBody>...</ModalBody>
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // In a simple modal (flows with content)
 * <Modal open={isOpen} onClose={close}>
 *   <ModalCloseButton />
 *   <Title>Confirm</Title>
 *   <Text>Are you sure?</Text>
 * </Modal>
 * ```
 */
export const ModalCloseButton = forwardRef<HTMLButtonElement, React.ComponentPropsWithRef<'button'>>(
  function ModalCloseButton(props, ref) {
    const theme = useTheme();
    const modalCtx = useModalContext();

    return (
      <ThemedComponent
        theme={theme.button.main}
        tag="button"
        className="vane-modal-close"
        type="button"
        onClick={modalCtx?.onClose}
        aria-label="Close"
        ref={ref}
        {...theme.modal.closeButton.defaults}
        {...props}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </ThemedComponent>
    );
  }
);

ModalCloseButton.displayName = 'ModalCloseButton';
