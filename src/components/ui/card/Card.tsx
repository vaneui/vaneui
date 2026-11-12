import React, { forwardRef, useEffect, useRef } from 'react';
import type { CardProps } from "./CardProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { useMergedRef } from "../../utils/mergedRef";
import { isCardPart } from './cardParts';
import { defaultCardTheme } from "./defaultCardTheme";

const INTERACTIVE_SELECTOR = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

// A CardHeader/CardBody/CardFooter among the children switches the Card to compound
// mode. Children.toArray does not flatten Fragments, so the scan recurses through them;
// parts are identified by their static marker (survives memo()-style wrappers) instead
// of reference equality. A part rendered by a consumer component, or one that arrives
// as a lazy reference from a Server Component, cannot be seen from here: for those the
// stylesheet decides from the rendered DOM (see the compound Card rule in rules.css).
const containsCardPart = (nodes: React.ReactNode): boolean =>
  React.Children.toArray(nodes).some(child => {
    if (!React.isValidElement(child)) return false;
    if (child.type === React.Fragment) {
      return containsCardPart((child.props as { children?: React.ReactNode }).children);
    }
    return isCardPart(child.type);
  });

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
    const isCompoundMode = containsCardPart(children);

    // An explicit padding prop keeps the Card's own inset next to its parts. The marker
    // tells the DOM-driven compound rule in rules.css to leave such a Card alone.
    const ownPadding = props.padding || props.paddingX || props.paddingY
      ? { 'data-own-padding': '' }
      : undefined;

    // Only render a keyboard focus ring when Card tag-switches to <a> (href set).
    // Plain <div> isn't focusable, so the class would be dead. Explicit
    // noFocusVisible from the user wins; both props otherwise resolve to
    // focusVisible (first in category enum), so we must skip injection when
    // noFocusVisible is set.
    const focusInjection = props.href && !props.noFocusVisible ? { focusVisible: true as const } : undefined;

    if (isCompoundMode) {
      return <ThemedComponent ref={mergedRef} theme={cardTheme} noPadding {...focusInjection} {...ownPadding} {...props}>{children}</ThemedComponent>;
    }

    return <ThemedComponent ref={mergedRef} theme={cardTheme} {...focusInjection} {...ownPadding} {...props}>{children}</ThemedComponent>;
  }
);

Card.displayName = 'Card';
