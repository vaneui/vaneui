import { forwardRef } from 'react';
import type { CardFooterProps } from "./CardFooterProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * CardFooter - bottom action bar of a compound Card.
 *
 * Flex row with items-center and justify-end by default.
 * Does not scroll (flex-shrink: 0 via CSS).
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader><Title>Confirm</Title></CardHeader>
 *   <CardBody><Text>Are you sure?</Text></CardBody>
 *   <CardFooter>
 *     <Button secondary>Cancel</Button>
 *     <Button filled>Save</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.card.footer} ref={ref} {...props} />;
  }
);

CardFooter.displayName = 'CardFooter';
