/**
 * Appearance props for controlling component colors
 */

export interface AppearanceProps {
  /** Default color appearance */
  default?: boolean;
  /** Primary color appearance (blue) */
  primary?: boolean;
  /** Secondary color appearance (gray) */
  secondary?: boolean;
  /** Tertiary color appearance */
  tertiary?: boolean;
  /** Accent color appearance (rose) */
  accent?: boolean;
  /** Success color appearance (green) */
  success?: boolean;
  /** Danger color appearance (red) */
  danger?: boolean;
  /** Warning color appearance (amber) */
  warning?: boolean;
  /** Info color appearance (cyan) */
  info?: boolean;
}
