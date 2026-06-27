import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";
import { warnSemanticTagOverride } from "../../../utils/warnSemanticTag";
import { defaultBlockquoteTheme } from "./defaultBlockquoteTheme";

export const Blockquote = forwardRef<HTMLQuoteElement, TypographyProps>(
  function Blockquote(props, ref) {
    const theme = useTheme();
    warnSemanticTagOverride('Blockquote', props.tag, ['blockquote']);
    return <ThemedComponent ref={ref} theme={theme?.blockquote ?? defaultBlockquoteTheme} {...props} />
  }
);

Blockquote.displayName = 'Blockquote';
