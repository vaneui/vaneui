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

    // Only render a keyboard focus ring when Card tag-switches to <a> (href set).
    // Plain <div> isn't focusable, so the class would be dead. Explicit
    // noFocusVisible from the user wins; both props otherwise resolve to
    // focusVisible (first in category enum), so we must skip injection when
    // noFocusVisible is set.
    const focusInjection = props.href && !props.noFocusVisible ? { focusVisible: true as const } : undefined;

    if (isCompoundMode) {
      return <ThemedComponent ref={ref} theme={theme.card.main} noPadding {...focusInjection} {...props}>{children}</ThemedComponent>;
    }

    return <ThemedComponent ref={ref} theme={theme.card.main} {...focusInjection} {...props}>{children}</ThemedComponent>;
  }
);

Card.displayName = 'Card';
