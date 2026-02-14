import { forwardRef } from 'react';
import type { ModalFooterProps } from "./ModalFooterProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * ModalFooter - bottom action bar of a compound Modal.
 *
 * Flex row with items-center and justify-end by default.
 * Does not scroll (flex-shrink: 0 via CSS).
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={close}>
 *   <ModalHeader><Title>Confirm</Title></ModalHeader>
 *   <ModalBody><Text>Are you sure?</Text></ModalBody>
 *   <ModalFooter>
 *     <Button secondary onClick={close}>Cancel</Button>
 *     <Button danger filled onClick={handleDelete}>Delete</Button>
 *   </ModalFooter>
 * </Modal>
 * ```
 */
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  function ModalFooter(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.modal.footer} ref={ref} {...props} />;
  }
);

ModalFooter.displayName = 'ModalFooter';
