import type { MenuContentProps } from "./MenuContentProps";

/**
 * Theme defaults for the menu dropdown container.
 *
 * MenuContent is a Popup with menu-specific defaults.
 * These props are spread directly onto the underlying Popup,
 * so Popup's own theme handles CSS class generation.
 *
 * Customizable via ThemeProvider:
 * ```tsx
 * <ThemeProvider themeDefaults={{ menu: { content: { sharp: true, lg: true } } }}>
 * ```
 */
export const menuContentDefaults: Partial<MenuContentProps> = {
  md: true,
  flex: true,
  column: true,
  noGap: true,
  rounded: true,
  shadow: true,
  border: true,
  noRing: true,
  primary: true,
  outline: true,
  wFit: true,
  bottomStart: true,
};
