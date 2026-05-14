import { forwardRef } from 'react';
import type { ModalFooterProps } from "./ModalFooterProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  function ModalFooter(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.modal.footer} ref={ref} {...props} />;
  }
);

ModalFooter.displayName = 'ModalFooter';
