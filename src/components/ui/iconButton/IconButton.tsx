import { forwardRef } from 'react';
import type { IconButtonProps } from "./IconButtonProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";

/**
 * A square icon-only button component with customizable appearance, size, and behavior.
 *
 * Designed for buttons that contain only an icon (SVG). Renders as a square with
 * equal padding and slightly larger icon sizing (1.25em) compared to regular Button (1em).
 * Supports rendering as a button element or anchor tag when href is provided.
 *
 * @example
 * ```tsx
 * // Basic icon button
 * <IconButton aria-label="Search"><SearchIcon /></IconButton>
 * ```
 *
 * @example
 * ```tsx
 * // Primary filled icon button with large size
 * <IconButton primary lg filled aria-label="Add"><PlusIcon /></IconButton>
 * ```
 *
 * @example
 * ```tsx
 * // Icon button as a link
 * <IconButton href="/settings" secondary aria-label="Settings"><GearIcon /></IconButton>
 * ```
 *
 * @see {@link IconButtonProps} for all available props
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const { loading, ...rest } = props;
    const theme = useTheme();

    if (loading) {
      const loadingProps = { ...rest, disabled: true as const, 'data-loading': 'true' };
      return (
        <ThemedComponent ref={ref} theme={theme.iconButton.main} {...loadingProps}>
          <ThemedComponent theme={theme.button.spinner} {...rest}>
            {theme.button.spinner.themes.spinnerElement()}
          </ThemedComponent>
          <span className="invisible">{rest.children}</span>
        </ThemedComponent>
      );
    }

    return <ThemedComponent ref={ref} theme={theme.iconButton.main} {...rest} />;
  }
);

IconButton.displayName = 'IconButton';
