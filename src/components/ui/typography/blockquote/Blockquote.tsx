import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";
import { defaultBlockquoteTheme } from "./defaultBlockquoteTheme";

export const Blockquote = forwardRef<HTMLQuoteElement, TypographyProps>(
  function Blockquote(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme?.blockquote ?? defaultBlockquoteTheme} {...props} />
  }
);

Blockquote.displayName = 'Blockquote';
