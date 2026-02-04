import { forwardRef } from 'react';
import type { BadgeProps } from "./BadgeProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * A compact badge component for displaying status, labels, or counts.
 *
 * Badges are typically used to highlight important information or indicate
 * status (e.g., "New", "Beta", notification counts). Supports the same
 * customization options as buttons including appearances, sizes, and variants.
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge>New</Badge>
 * ```
 *
 * @example
 * ```tsx
 * // Success badge with filled variant
 * <Badge success filled>Active</Badge>
 * ```
 *
 * @example
 * ```tsx
 * // Notification count badge
 * <Badge danger pill xs>3</Badge>
 * ```
 *
 * @example
 * ```tsx
 * // Badge as a link
 * <Badge href="/beta" info outline>Beta</Badge>
 * ```
 *
 * @see {@link BadgeProps} for all available props
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme.badge} ref={ref} {...props} />
  }
);

Badge.displayName = 'Badge';
