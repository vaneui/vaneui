import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";

export const Blockquote = forwardRef<HTMLQuoteElement, TypographyProps>(
  function Blockquote(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.blockquote} {...props} />
  }
);

Blockquote.displayName = 'Blockquote';
