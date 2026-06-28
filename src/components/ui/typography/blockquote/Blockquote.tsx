import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";
import { warnSemanticTagOverride } from "../../../utils/warnSemanticTag";
import { defaultBlockquoteTheme } from "./defaultBlockquoteTheme";

export type BlockquoteProps = TypographyProps & {
  /** Source of the quote: sets the `<blockquote cite>` attribute and renders a
   *  visible `<cite>` source line below the quote. */
  cite?: string;
};

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>(
  function Blockquote({ children, ...rest }, ref) {
    const theme = useTheme();
    warnSemanticTagOverride('Blockquote', rest.tag, ['blockquote']);
    const { cite } = rest;
    return (
      <ThemedComponent ref={ref} theme={theme?.blockquote ?? defaultBlockquoteTheme} {...rest}>
        {children}
        {cite && <cite className="vane-blockquote-cite">{cite}</cite>}
      </ThemedComponent>
    );
  }
);

Blockquote.displayName = 'Blockquote';
