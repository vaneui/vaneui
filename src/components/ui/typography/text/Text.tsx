import { forwardRef } from 'react';
import type { TypographyProps } from "../common";
import { useTheme } from "../../../themeContext";
import { ThemedComponent } from "../../../themedComponent";
import { defaultTextTheme } from "./defaultTextTheme";

export const Text = forwardRef<HTMLParagraphElement, TypographyProps>(
  function Text(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme?.text ?? defaultTextTheme} {...props} />
  }
);

Text.displayName = 'Text';
