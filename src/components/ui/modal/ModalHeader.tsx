import { forwardRef, useEffect } from 'react';
import type { ModalHeaderProps } from "./ModalHeaderProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useModalContext } from './ModalContext';

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
