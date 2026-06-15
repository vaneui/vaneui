import { forwardRef } from 'react';
import type { CardFooterProps } from "./CardFooterProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultCardFooterTheme } from "./defaultCardFooterTheme";

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.card.footer ?? defaultCardFooterTheme} ref={ref} {...props} />;
  }
);

CardFooter.displayName = 'CardFooter';
