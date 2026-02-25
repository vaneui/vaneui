import { forwardRef } from 'react';
import type { CardBodyProps } from "./CardBodyProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * CardBody - scrollable content section of a compound Card.
 *
 * Flex column with overflow-auto by default.
 * Takes remaining space (flex: 1, min-height: 0 via CSS).
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader><Title>Long Form</Title></CardHeader>
 *   <CardBody>
 *     <Text>Scrollable content goes here.</Text>
 *   </CardBody>
 *   <CardFooter><Button filled>Save</Button></CardFooter>
 * </Card>
 * ```
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  function CardBody(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.card.body} ref={ref} {...props} />;
  }
);

CardBody.displayName = 'CardBody';
