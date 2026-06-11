import { forwardRef, useEffect, Children, isValidElement } from 'react';
import type { ReactNode } from 'react';
import type { ModalHeaderProps } from "./ModalHeaderProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useModalContext } from './ModalContext';
import { getModalPart, markModalPart } from './modalParts';
import { defaultModalHeaderTheme } from './defaultModalHeaderTheme';

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader(props, ref) {
    const theme = useTheme();
    const ctx = useModalContext();

    useEffect(() => {
      ctx?.setTitleMounted(true);
      return () => { ctx?.setTitleMounted(false); };
    }, [ctx]);

    const { children, ...rest } = props;

    // titleId must label the title content ONLY: if it sat on the header
    // element, the dialog's accessible name (aria-labelledby -> titleId)
    // would concatenate the close button's "Close" label after the title.
    // The wrapper span is display:contents, so every title child stays an
    // individual flex item and the rendered layout is unchanged; close
    // buttons render after the title content.
    const titleChildren: ReactNode[] = [];
    const actionChildren: ReactNode[] = [];
    Children.toArray(children).forEach(child => {
      if (isValidElement(child) && getModalPart(child.type) === 'closeButton') {
        actionChildren.push(child);
      } else {
        titleChildren.push(child);
      }
    });

    return (
      <ThemedComponent theme={theme?.modal.header ?? defaultModalHeaderTheme} ref={ref} {...rest}>
        <span id={ctx?.titleId} className="contents">{titleChildren}</span>
        {actionChildren}
      </ThemedComponent>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';
markModalPart(ModalHeader, 'header');
