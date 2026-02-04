import { forwardRef } from 'react';
import type { DividerProps } from "./DividerProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * A visual separator component for dividing content sections.
 *
 * Renders a horizontal line by default to separate content blocks. Can be styled
 * with different appearances and sizes. Supports vertical orientation for
 * side-by-side content. Useful for creating visual hierarchy and content organization.
 *
 * @example
 * ```tsx
 * // Basic divider (horizontal)
 * <Text>Section 1</Text>
 * <Divider />
 * <Text>Section 2</Text>
 * ```
 *
 * @example
 * ```tsx
 * // Vertical divider
 * <Row>
 *   <Text>Left</Text>
 *   <Divider vertical />
 *   <Text>Right</Text>
 * </Row>
 * ```
 *
 * @example
 * ```tsx
 * // Styled divider
 * <Divider primary lg />
 * ```
 *
 * @example
 * ```tsx
 * // Divider with padding
 * <Divider padding />
 * ```
 *
 * @see {@link DividerProps} for all available props
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.divider} ref={ref} {...props} />
  }
);

Divider.displayName = 'Divider';
