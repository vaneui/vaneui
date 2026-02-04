import { forwardRef } from 'react';
import type { ChipProps } from "./ChipProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * A chip component for displaying tags, filters, or selections.
 *
 * Chips are interactive elements commonly used to represent tags, filters,
 * or user selections. They typically appear in pill shape and can be
 * removed or clicked. Similar to badges but more interactive in nature.
 *
 * @example
 * ```tsx
 * // Basic chip
 * <Chip>React</Chip>
 * ```
 *
 * @example
 * ```tsx
 * // Filter chip with primary color
 * <Chip primary pill>JavaScript</Chip>
 * ```
 *
 * @example
 * ```tsx
 * // Removable tag chip
 * <Chip secondary outline xs>TypeScript ×</Chip>
 * ```
 *
 * @example
 * ```tsx
 * // Clickable chip as link
 * <Chip href="/tag/react" accent>React</Chip>
 * ```
 *
 * @see {@link ChipProps} for all available props
 */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  function Chip(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.chip} ref={ref} {...props} />
  }
);

Chip.displayName = 'Chip';
