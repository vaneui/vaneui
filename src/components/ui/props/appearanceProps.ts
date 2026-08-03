/**
 * Appearance props for controlling component colors
 */

export interface AppearanceProps {
  /** Primary color appearance (gray) */
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
  /** Inherit appearance from parent — suppresses own data-appearance/data-variant, uses parent's CSS variables */
  inheritAppearance?: boolean;
}
