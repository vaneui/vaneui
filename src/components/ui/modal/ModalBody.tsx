import { forwardRef, useEffect } from 'react';
import type { ModalBodyProps } from "./ModalBodyProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useModalContext } from './ModalContext';

/**
 * ModalBody - scrollable content section of a compound Modal.
 *
 * Flex column with overflow-auto by default.
 * Takes remaining space (flex: 1, min-height: 0 via CSS).
 *
 * When used inside a Modal, automatically sets `id` for `aria-describedby` connection.
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={close}>
 *   <ModalHeader><Title>Long Form</Title></ModalHeader>
 *   <ModalBody>
 *     <Input placeholder="Field 1" />
 *     <Input placeholder="Field 2" />
 *     <Input placeholder="Field 3" />
 *   </ModalBody>
 *   <ModalFooter><Button filled>Save</Button></ModalFooter>
 * </Modal>
 * ```
 */
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  function ModalBody(props, ref) {
    const theme = useTheme();
    const ctx = useModalContext();

    useEffect(() => {
      ctx?.setBodyMounted(true);
      return () => { ctx?.setBodyMounted(false); };
    }, [ctx]);

    const mergedProps = { ...props, id: props.id ?? ctx?.bodyId };
    return <ThemedComponent theme={theme.modal.body} ref={ref} {...mergedProps} />;
  }
);

ModalBody.displayName = 'ModalBody';
