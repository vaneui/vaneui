import { forwardRef } from 'react';
import type { ContainerProps } from "./ContainerProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * A page-level content wrapper with maximum width constraints.
 *
 * Centers content horizontally on the page (`mx-auto`) and constrains it
 * to a max-width that scales with the size prop. Has no padding by default —
 * use `padding` prop or wrap children in `Section` for spacing. Typically
 * the outermost wrapper for page content.
 *
 * @example
 * ```tsx
 * // Basic container
 * <Container>
 *   <PageTitle>My Page</PageTitle>
 *   <Text>Page content goes here.</Text>
 * </Container>
 * ```
 *
 * @example
 * ```tsx
 * // Larger max-width
 * <Container lg>
 *   <Section>Section 1</Section>
 *   <Section>Section 2</Section>
 * </Container>
 * ```
 *
 * @example
 * ```tsx
 * // Full-width container
 * <Container className="max-w-none">
 *   Wide content
 * </Container>
 * ```
 *
 * @see {@link ContainerProps} for all available props
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.container} ref={ref} {...props} />
  }
);

Container.displayName = 'Container';
