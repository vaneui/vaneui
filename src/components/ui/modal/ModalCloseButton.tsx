import { forwardRef, useCallback, useMemo, type MouseEvent } from 'react';
import type { ModalCloseButtonProps } from './ModalCloseButtonProps';
import { ThemedComponent } from '../../themedComponent';
import { useTheme } from '../../themeContext';
import { mergeDefaults } from '../../utils/deepMerge';
import { useModalContext } from './ModalContext';
import { markModalPart } from './modalParts';
// renders through Button's main theme by design; its own sub-theme node only
// contributes the close-button default props
import { defaultButtonTheme } from '../button/defaultButtonTheme';
import { defaultModalCloseButtonTheme } from './defaultModalCloseButtonTheme';

export const ModalCloseButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
  function ModalCloseButton({ className, children, onClick, ...props }, ref) {
    const theme = useTheme();
    const modalCtx = useModalContext();
    const buttonTheme = theme?.button.main ?? defaultButtonTheme;
    const closeDefaults = (theme?.modal.closeButton ?? defaultModalCloseButtonTheme).defaults;
    const hasChildren = children !== undefined && children !== null && children !== false;

    // The × defaults merge in at the defaults level, so a prop you pass (lg, danger, ...) wins over
    // them per category. A labelled button (children) keeps Button's own defaults: the × look is
    // for the icon only.
    const closeTheme = useMemo(() => {
      if (hasChildren) return buttonTheme;
      const derived = buttonTheme.withDefaults(
        mergeDefaults(buttonTheme.defaults as Record<string, boolean>, closeDefaults as Record<string, boolean>) as typeof buttonTheme.defaults
      );
      // withDefaults resets extraClasses; keep an outer ThemeProvider's
      derived.extraClasses = buttonTheme.extraClasses;
      return derived;
    }, [buttonTheme, closeDefaults, hasChildren]);

    // your onClick runs first; call event.preventDefault() in it to keep the modal open
    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) modalCtx?.onClose?.();
    }, [onClick, modalCtx]);

    return (
      <ThemedComponent
        theme={closeTheme}
        tag="button"
        // merge a consumer className with the identity class (a plain
        // className prop would otherwise replace vane-modal-close)
        className={[hasChildren ? undefined : 'vane-modal-close', className].filter(Boolean).join(' ') || undefined}
        type="button"
        // the × needs a name; a labelled button takes its name from its text
        aria-label={hasChildren ? undefined : 'Close'}
        ref={ref}
        {...props}
        {...{ onClick: handleClick }}
      >
        {hasChildren ? children : (
          <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        )}
      </ThemedComponent>
    );
  }
);

ModalCloseButton.displayName = 'ModalCloseButton';
markModalPart(ModalCloseButton, 'closeButton');
