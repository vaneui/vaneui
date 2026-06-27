import React, { forwardRef, useRef, useEffect, useId, useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from './ModalProps';
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';
import { defaultModalContentTheme } from './defaultModalContentTheme';
import { defaultModalOverlayTheme } from './defaultModalOverlayTheme';
import { useScrollLock } from '../../utils/scrollLock';
import { useFocusTrap } from '../../utils/focusTrap';
import { useInertBackground } from '../../utils/inertBackground';
import { useControllableState } from '../../utils/controllableState';
import { useTransition } from '../../utils/transition';
import { useStackingContext } from '../../utils/stackingContext';
import { useMergedRef } from '../../utils/mergedRef';
import { pushEscapeHandler } from '../../utils/escapeStack';
import { composeEventHandlers } from '../../utils/composeEventHandlers';
import { ModalContext } from './ModalContext';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalCloseButton } from './ModalCloseButton';
import { getModalPart } from './modalParts';

// Any ModalHeader/ModalBody/ModalFooter among the children switches Modal
// from convenience mode (auto ModalBody wrapping) to compound mode (children
// rendered as-is). Children.toArray does not flatten Fragments, so the scan
// recurses through them; sub-components are identified by their static
// modal-part marker (survives memo()-style wrappers) instead of reference
// equality. A consumer component that merely renders a ModalHeader cannot be
// detected without rendering it — it falls back to convenience mode.
const containsModalSection = (nodes: React.ReactNode): boolean =>
  React.Children.toArray(nodes).some(child => {
    if (!React.isValidElement(child)) return false;
    if (child.type === React.Fragment) {
      return containsModalSection((child.props as { children?: React.ReactNode }).children);
    }
    const part = getModalPart(child.type);
    return part === 'header' || part === 'body' || part === 'footer';
  });

// A dialog's accessible name comes (in compound mode) from a ModalHeader that
// carries real title content — anything other than a close button. Mirror
// ModalHeader's own title/close split so the dev no-name warning agrees with
// how aria-labelledby is actually wired (a header with only a close button
// names nothing).
const compoundHeaderHasTitle = (nodes: React.ReactNode): boolean =>
  React.Children.toArray(nodes).some(child => {
    if (!React.isValidElement(child)) return false;
    if (child.type === React.Fragment) {
      return compoundHeaderHasTitle((child.props as { children?: React.ReactNode }).children);
    }
    if (getModalPart(child.type) !== 'header') return false;
    return React.Children.toArray((child.props as { children?: React.ReactNode }).children)
      .some(c => !(React.isValidElement(c) && getModalPart(c.type) === 'closeButton'));
  });

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
    const overlayRef = useRef<HTMLDivElement>(null);
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

    // neutralize the page behind the dialog for AT/focus (the focus trap only
    // guards the Tab boundary); skips the dialog's own portal and any overlay
    // portaled out of it (e.g. an in-modal menu).
    useInertBackground(open, overlayRef);

    // only the topmost floating element closes on Escape
    useEffect(() => {
      if (!open || !closeOnEscape) return;
      return pushEscapeHandler(onClose);
    }, [open, closeOnEscape, onClose]);

    const handleOverlayClick = (event: React.MouseEvent) => {
      // defaultPrevented lets a composed consumer onClick veto the close
      if (closeOnOverlayClick && !event.defaultPrevented && event.target === event.currentTarget) {
        onClose();
      }
    };

    // must run unconditionally before early return
    const contextValue = useMemo(
      () => ({ onClose, titleId, bodyId, setTitleMounted, setBodyMounted }),
      [onClose, titleId, bodyId]
    );

    const isCompoundMode = containsModalSection(children);
    const showCloseButton = withCloseButton ?? (title !== undefined);

    // dev-only: a dialog with no accessible name is an ARIA violation
    // (mirrors IconButton). Computed synchronously so it never false-fires —
    // an explicit aria-label/aria-labelledby, the convenience `title`, or a
    // compound ModalHeader carrying title content.
    const hasAccessibleName =
      title !== undefined
      || Boolean((props as Record<string, unknown>)['aria-label'])
      || Boolean((props as Record<string, unknown>)['aria-labelledby'])
      || (isCompoundMode && compoundHeaderHasTitle(children));
    useEffect(() => {
      if (process.env.NODE_ENV !== 'production' && open && !hasAccessibleName) {
        console.warn(
          'VaneUI: Modal has no accessible name — pass a `title`, render a ModalHeader, or set aria-label/aria-labelledby so screen readers can announce the dialog.'
        );
      }
    }, [open, hasAccessibleName]);

    const shouldMount = overlayTransition.mounted || keepMounted;
    if (!shouldMount) return null;

    const isHidden = !overlayTransition.mounted && keepMounted;

    // consumer onClick/style/className must COMPOSE with the internal
    // handlers and CSS variables, never replace them (a consumer onClick
    // would otherwise kill click-to-close; a consumer style would wipe
    // --z-index)
    const {
      onClick: overlayOnClick,
      style: overlayStyle,
      className: overlayClassName,
      ...restOverlayProps
    } = {
      ...overlayProps,
      ...(fullScreen ? { transparent: true } : {}),
    };

    const {
      onClick: contentOnClick,
      style: contentStyle,
      ...restProps
    } = props;

    const cssVars = {
      '--z-index': zIndex,
      ...(transitionDuration !== 200 ? { '--transition-duration': `${transitionDuration}ms` } : undefined),
    } as React.CSSProperties;

    const contentDurationStyle = transitionDuration !== 200
      ? { '--transition-duration': `${transitionDuration}ms` } as React.CSSProperties
      : undefined;

    const content = (
      <ThemedComponent
        ref={overlayRef}
        theme={theme?.modal.overlay ?? defaultModalOverlayTheme}
        data-state={isHidden ? undefined : overlayTransition.state}
        aria-hidden={isHidden || undefined}
        {...{
          ...restOverlayProps,
          className: [isHidden ? 'hidden' : undefined, overlayClassName].filter(Boolean).join(' ') || undefined,
          onClick: composeEventHandlers(overlayOnClick, handleOverlayClick),
          style: { ...cssVars, ...overlayStyle },
        }}
      >
        <ThemedComponent
          ref={mergedRef}
          theme={theme?.modal.content ?? defaultModalContentTheme}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleMounted ? titleId : undefined}
          aria-describedby={bodyMounted ? bodyId : undefined}
          data-state={isHidden ? undefined : contentTransition.state}
          {...{
            ...restProps,
            ...(fullScreen ? { sharp: true, wScreen: true, hScreen: true } : {}),
            onClick: composeEventHandlers(contentOnClick, (e: React.MouseEvent) => e.stopPropagation()),
            style: { ...contentDurationStyle, ...contentStyle },
          }}
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

    if (portal) {
      // SSR: the portal target can't exist server-side, and rendering the
      // content inline would hydrate differently than the client (which
      // portals to document.body) - render nothing; portaled content
      // appears after hydration
      if (typeof document === 'undefined') {
        return null;
      }
      return createPortal(content, document.body);
    }

    return content;
  }
);

Modal.displayName = 'Modal';
