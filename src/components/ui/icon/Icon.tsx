import { forwardRef } from 'react';
import type { IconProps } from "./IconProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * A lightweight icon wrapper component for displaying SVGs.
 *
 * Icon renders as a `<span>` with inline-flex layout that sizes SVG children
 * via CSS variables. By default, it inherits `currentColor` from the parent.
 * Pass an appearance prop (`primary`, `danger`, etc.) to apply themed colors.
 *
 * @example
 * ```tsx
 * // Basic icon (inherits parent color)
 * <Icon><SvgIcon /></Icon>
 * ```
 *
 * @example
 * ```tsx
 * // Colored icon
 * <Icon danger><WarningIcon /></Icon>
 * ```
 *
 * @example
 * ```tsx
 * // Large icon
 * <Icon lg><LogoIcon /></Icon>
 * ```
 *
 * @see {@link IconProps} for all available props
 */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  function Icon(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.icon} ref={ref} {...props} />;
  }
);

Icon.displayName = 'Icon';
