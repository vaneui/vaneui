import { forwardRef } from 'react';
import type { ModalHeaderProps } from "./ModalHeaderProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * ModalHeader - top section of a compound Modal.
 *
 * Flex row with items-center and justify-between by default.
 * Does not scroll (flex-shrink: 0 via CSS).
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={close}>
 *   <ModalHeader>
 *     <Title>Edit Profile</Title>
 *   </ModalHeader>
 *   <ModalBody>...</ModalBody>
 *   <ModalFooter>...</ModalFooter>
 * </Modal>
 * ```
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.modal.header} ref={ref} {...props} />;
  }
);

ModalHeader.displayName = 'ModalHeader';
