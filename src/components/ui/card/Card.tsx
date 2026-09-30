import React, { forwardRef, useEffect, useRef } from 'react';
import type { CardProps } from "./CardProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useMergedRef } from "../../utils/mergedRef";
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { defaultCardTheme } from "./defaultCardTheme";

const INTERACTIVE_SELECTOR = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card({ children, ...props }, ref) {
    const theme = useTheme();
    const cardTheme = theme?.card.main ?? defaultCardTheme;
    const localRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(ref, localRef);

    // dev-only: a Card with href is a link, so a nested control is interactive content inside <a>
    useEffect(() => {
      if (process.env.NODE_ENV === 'production' || !props.href) return;
      if (localRef.current?.querySelector(INTERACTIVE_SELECTOR)) {
        console.warn(
          'VaneUI: a Card with `href` contains an interactive element (button, link or field). One click would trigger both, and the link\'s accessible name swallows the card. Render the Card without `href`, put a Link in its title, and keep the controls as siblings.'
        );
      }
    }, [props.href]);

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
      return <ThemedComponent ref={mergedRef} theme={cardTheme} noPadding {...focusInjection} {...props}>{children}</ThemedComponent>;
    }

    return <ThemedComponent ref={mergedRef} theme={cardTheme} {...focusInjection} {...props}>{children}</ThemedComponent>;
  }
);

Card.displayName = 'Card';
