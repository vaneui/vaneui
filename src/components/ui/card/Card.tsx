import React, { forwardRef } from 'react';
import type { CardProps } from "./CardProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card({ children, ...props }, ref) {
    const theme = useTheme();

    // compound mode: sub-components own padding when present in children
    const childArray = React.Children.toArray(children);
    const isCompoundMode = childArray.some(
      child => React.isValidElement(child) &&
        (child.type === CardHeader || child.type === CardBody || child.type === CardFooter)
    );

    if (isCompoundMode) {
      return <ThemedComponent ref={ref} theme={theme.card.main} noPadding {...props}>{children}</ThemedComponent>;
    }

    return <ThemedComponent ref={ref} theme={theme.card.main} {...props}>{children}</ThemedComponent>;
  }
);

Card.displayName = 'Card';
