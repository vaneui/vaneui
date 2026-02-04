import { forwardRef } from 'react';
import type { ButtonProps } from "./ButtonProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";

/**
 * A clickable button component with customizable appearance, size, and behavior.
 *
 * Supports rendering as a button element or anchor tag when href is provided.
 * Can be styled with different appearances (primary, secondary, success, etc.),
 * sizes (xs to xl), and variants (filled, outline).
 *
 * @example
 * ```tsx
 * // Basic button
 * <Button>Click me</Button>
 * ```
 *
 * @example
 * ```tsx
 * // Primary filled button with large size
 * <Button primary lg filled>Submit</Button>
 * ```
 *
 * @example
 * ```tsx
 * // Button as a link
 * <Button href="/about" secondary>About</Button>
 * ```
 *
 * @example
 * ```tsx
 * // Danger button with custom styling
 * <Button danger outline className="w-full">Delete</Button>
 * ```
 *
 * @see {@link ButtonProps} for all available props
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.button} {...props} />
  }
);

Button.displayName = 'Button';
