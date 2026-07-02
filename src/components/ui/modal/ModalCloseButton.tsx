import { forwardRef } from 'react';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from '../../themeContext';
import { useModalContext } from './ModalContext';
import { markModalPart } from './modalParts';
// renders through Button's main theme by design; its own sub-theme node only
// contributes the close-button default props
import { defaultButtonTheme } from '../button/defaultButtonTheme';
import { defaultModalCloseButtonTheme } from './defaultModalCloseButtonTheme';

export const ModalCloseButton = forwardRef<HTMLButtonElement, React.ComponentPropsWithRef<'button'>>(
  function ModalCloseButton({ className, ...props }, ref) {
    const theme = useTheme();
    const modalCtx = useModalContext();

    return (
      <ThemedComponent
        theme={theme?.button.main ?? defaultButtonTheme}
        tag="button"
        // merge a consumer className with the identity class (a plain
        // className prop would otherwise replace vane-modal-close)
        className={['vane-modal-close', className].filter(Boolean).join(' ')}
        type="button"
        onClick={modalCtx?.onClose}
        aria-label="Close"
        ref={ref}
        {...(theme?.modal.closeButton ?? defaultModalCloseButtonTheme).defaults}
        {...props}
      >
        <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </ThemedComponent>
    );
  }
);

ModalCloseButton.displayName = 'ModalCloseButton';
markModalPart(ModalCloseButton, 'closeButton');
