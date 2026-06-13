import { forwardRef } from 'react';
import type { CardHeaderProps } from "./CardHeaderProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultCardHeaderTheme } from "./defaultCardHeaderTheme";

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.card.header ?? defaultCardHeaderTheme} ref={ref} {...props} />;
  }
);

CardHeader.displayName = 'CardHeader';
