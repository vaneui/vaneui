import { forwardRef, useEffect } from 'react';
import type { ModalHeaderProps } from "./ModalHeaderProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useModalContext } from './ModalContext';

/**
 * ModalHeader - top section of a compound Modal.
 *
 * Flex row with items-center and justify-between by default.
 * Does not scroll (flex-shrink: 0 via CSS).
 *
 * Place a ModalCloseButton inside to get a right-aligned close button.
 *
 * When used inside a Modal, automatically sets `id` for `aria-labelledby` connection.
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={close}>
 *   <ModalHeader>
 *     <Title>Edit Profile</Title>
 *     <ModalCloseButton />
 *   </ModalHeader>
 *   <ModalBody>...</ModalBody>
 *   <ModalFooter>...</ModalFooter>
 * </Modal>
 * ```
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader(props, ref) {
    const theme = useTheme();
    const ctx = useModalContext();

    useEffect(() => {
      ctx?.setTitleMounted(true);
      return () => { ctx?.setTitleMounted(false); };
    }, [ctx]);

    const mergedProps = { ...props, id: props.id ?? ctx?.titleId };
    return <ThemedComponent theme={theme.modal.header} ref={ref} {...mergedProps} />;
  }
);

ModalHeader.displayName = 'ModalHeader';
