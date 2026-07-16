import { forwardRef } from 'react';
import type { CaptionProps } from "./CaptionProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultCaptionTheme } from "./defaultCaptionTheme";

export const Caption = forwardRef<HTMLTableCaptionElement, CaptionProps>(
  function Caption(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.table.caption ?? defaultCaptionTheme} ref={ref} {...props} />;
  }
);

Caption.displayName = 'Caption';
