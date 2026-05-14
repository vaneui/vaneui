import { forwardRef } from 'react';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from '../../themeContext';
import { useModalContext } from './ModalContext';

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
