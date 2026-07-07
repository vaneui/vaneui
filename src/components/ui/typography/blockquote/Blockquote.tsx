import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import type { BorderProps } from "../../props";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";
import { warnSemanticTagOverride } from "../../../utils/warnSemanticTag";
import { defaultBlockquoteTheme } from "./defaultBlockquoteTheme";
import { defaultBlockquoteCiteTheme } from "./defaultBlockquoteCiteTheme";

export type BlockquoteProps = TypographyProps & BorderProps & {
  /** Source of the quote: sets the `<blockquote cite>` attribute and renders a
   *  visible `<cite>` source line below the quote. */
  cite?: string;
};

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>(
  function Blockquote({ children, ...rest }, ref) {
    const theme = useTheme();
    warnSemanticTagOverride('Blockquote', rest.tag, ['blockquote']);
    const { cite } = rest;
    // the source line is a themed <cite> (see defaultBlockquoteCiteTheme) — no
    // raw CSS literals; muted color, spacing and font all come from the theme
    const citeTheme = theme?.blockquoteCite ?? defaultBlockquoteCiteTheme;
    return (
      <ThemedComponent ref={ref} theme={theme?.blockquote ?? defaultBlockquoteTheme} {...rest}>
        {children}
        {cite && <ThemedComponent theme={citeTheme}>{cite}</ThemedComponent>}
      </ThemedComponent>
    );
  }
);

Blockquote.displayName = 'Blockquote';
