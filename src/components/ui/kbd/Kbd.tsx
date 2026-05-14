import { forwardRef } from 'react';
import type { KbdProps } from "./KbdProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  function Kbd(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.kbd} ref={ref} {...props} />
  }
);

Kbd.displayName = 'Kbd';
