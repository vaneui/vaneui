import { forwardRef } from 'react';
import type { CodeProps } from "./CodeProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * An inline code component for displaying code snippets or technical terms.
 *
 * Renders text in a monospace font with subtle background styling to
 * distinguish code from regular text. Ideal for inline code references,
 * variable names, or short code snippets within paragraphs.
 *
 * @example
 * ```tsx
 * // Basic inline code
 * <Code>const x = 10</Code>
 * ```
 *
 * @example
 * ```tsx
 * // Code with custom appearance
 * <Code primary filled>npm install</Code>
 * ```
 *
 * @example
 * ```tsx
 * // Code block style
 * <Code secondary outline lg mono>function hello() {}</Code>
 * ```
 *
 * @example
 * ```tsx
 * // Code with custom styling
 * <Code className="px-4 py-2">git commit -m "message"</Code>
 * ```
 *
 * @see {@link CodeProps} for all available props
 */
export const Code = forwardRef<HTMLElement, CodeProps>(
  function Code(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.code} ref={ref} {...props} />
  }
);

Code.displayName = 'Code';
