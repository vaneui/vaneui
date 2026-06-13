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

    // Only claim the dialog's accessible name when there is real title
    // content. A header holding only a close button (the convenience
    // `withCloseButton` path with no `title`, or `<ModalHeader><ModalCloseButton/>`)
    // must NOT register a title — otherwise the dialog's aria-labelledby
    // would point at an empty span, leaving it with no accessible name.
    const hasTitle = titleChildren.length > 0;
    useEffect(() => {
      if (!hasTitle) return;
      ctx?.setTitleMounted(true);
      return () => { ctx?.setTitleMounted(false); };
    }, [ctx, hasTitle]);

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
