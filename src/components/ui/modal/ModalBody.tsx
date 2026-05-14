import { forwardRef, useEffect } from 'react';
import type { ModalBodyProps } from "./ModalBodyProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useModalContext } from './ModalContext';

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
