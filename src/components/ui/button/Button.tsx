import { forwardRef } from 'react';
import type { ButtonProps } from "./ButtonProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { resolveDisabledLink } from "../../utils/disabledLink";

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
 * // Filled button with large size
 * <Button lg filled>Submit</Button>
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
 * // Full-width danger button
 * <Button danger className="w-full">Delete</Button>
 * ```
 *
 * @see {@link ButtonProps} for all available props
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, ...rest } = props;
    const theme = useTheme();

    const isDisabled = rest.disabled || loading;
    const resolvedProps = resolveDisabledLink(rest, !!isDisabled);

    if (loading) {
      const loadingProps = { ...resolvedProps, disabled: true as const, 'data-loading': 'true' };
      return (
        <ThemedComponent ref={ref} theme={theme.button.main} {...loadingProps}>
          <ThemedComponent theme={theme.button.spinner}>
            {theme.button.spinner.themes.spinnerElement()}
          </ThemedComponent>
          <span className="invisible">{resolvedProps.children}</span>
        </ThemedComponent>
      );
    }

    return <ThemedComponent ref={ref} theme={theme.button.main} {...resolvedProps} />;
  }
);

Button.displayName = 'Button';
