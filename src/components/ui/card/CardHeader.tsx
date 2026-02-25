import { forwardRef } from 'react';
import type { CardHeaderProps } from "./CardHeaderProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * CardHeader - top section of a compound Card.
 *
 * Flex row with items-center and justify-between by default.
 * Does not scroll (flex-shrink: 0 via CSS).
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <Title>Card Title</Title>
 *     <Button sm secondary>Edit</Button>
 *   </CardHeader>
 *   <CardBody>...</CardBody>
 *   <CardFooter>...</CardFooter>
 * </Card>
 * ```
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.card.header} ref={ref} {...props} />;
  }
);

CardHeader.displayName = 'CardHeader';
