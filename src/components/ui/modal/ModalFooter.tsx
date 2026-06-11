import { forwardRef } from 'react';
import type { ModalFooterProps } from "./ModalFooterProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { markModalPart } from './modalParts';

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  function ModalFooter(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.modal.footer} ref={ref} {...props} />;
  }
);

ModalFooter.displayName = 'ModalFooter';
markModalPart(ModalFooter, 'footer');
