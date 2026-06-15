import { forwardRef } from 'react';
import type { KbdProps } from "./KbdProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultKbdTheme } from "./defaultKbdTheme";

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  function Kbd(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.kbd ?? defaultKbdTheme} ref={ref} {...props} />
  }
);

Kbd.displayName = 'Kbd';
