import { forwardRef } from 'react';
import type { ColProps } from "./ColProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * A column flex container for vertical content organization.
 *
 * Arranges children in a column (vertical) layout with consistent spacing.
 * Similar to Stack but without responsive breakpoints. Use for predictable
 * vertical layouts that don't need to change based on screen size.
 *
 * @example
 * ```tsx
 * // Basic column
 * <Col gap>
 *   <Title>Column Content</Title>
 *   <Text>First paragraph</Text>
 *   <Text>Second paragraph</Text>
 * </Col>
 * ```
 *
 * @example
 * ```tsx
 * // Column with centered items
 * <Col itemsCenter justifyCenter gap>
 *   <Badge>Status</Badge>
 *   <Button>Action</Button>
 * </Col>
 * ```
 *
 * @example
 * ```tsx
 * // Full-height column
 * <Col className="h-screen" justifyBetween>
 *   <header>Header</header>
 *   <main>Main Content</main>
 *   <footer>Footer</footer>
 * </Col>
 * ```
 *
 * @see {@link ColProps} for all available props
 */
export const Col = forwardRef<HTMLDivElement, ColProps>(
  function Col(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.col} ref={ref} {...props} />
  }
);

Col.displayName = 'Col';
