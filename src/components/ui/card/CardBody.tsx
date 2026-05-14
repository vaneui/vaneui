import { forwardRef } from 'react';
import type { CardBodyProps } from "./CardBodyProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  function CardBody(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.card.body} ref={ref} {...props} />;
  }
);

CardBody.displayName = 'CardBody';
