import React, { forwardRef } from 'react';
import type { CardProps } from "./CardProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';

/**
 * A container component for grouping related content with padding and borders.
 *
 * Cards provide visual separation and organization for content blocks. Support
 * responsive flex direction with breakpoint props. Use for content cards,
 * feature boxes, or any grouped content that needs visual distinction.
 *
 * Supports compound mode: when children include CardHeader, CardBody, or
 * CardFooter, the Card removes its own padding so sub-components own theirs.
 *
 * @example
 * ```tsx
 * // Simple card (backwards-compatible)
 * <Card>
 *   <Title>Card Title</Title>
 *   <Text>Card content goes here.</Text>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Compound card with sub-components
 * <Card>
 *   <CardHeader>
 *     <Title>Card Title</Title>
 *     <Button sm secondary>Edit</Button>
 *   </CardHeader>
 *   <CardBody>
 *     <Text>Scrollable content area</Text>
 *   </CardBody>
 *   <CardFooter>
 *     <Button secondary>Cancel</Button>
 *     <Button filled>Save</Button>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * @example
 * ```tsx
 * // Card with styling
 * <Card primary outline shadow padding gap>
 *   <Title>Feature</Title>
 *   <Text>Description of the feature</Text>
 *   <Button>Learn More</Button>
 * </Card>
 * ```
 *
 * @see {@link CardProps} for all available props
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card({ children, ...props }, ref) {
    const theme = useTheme();

    // Detect compound mode: user explicitly passes CardHeader/CardBody/CardFooter as children
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
