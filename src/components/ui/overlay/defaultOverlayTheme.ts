import { ComponentTheme, defaultSizedLayoutClassMappers, ringAppearance, shadowLayoutAppearance } from "../theme/common";
import type { OverlayProps } from "./OverlayProps";
import { BlurClassMapper, OverlayBackgroundClassMapper, PointerEventsClassMapper, RingClassMapper } from "../theme/layout";
import { OVERLAY_CATEGORIES } from "./OverlayCategories";
import type { OverlayTheme } from "./OverlayTheme";
import { overlayDefaults } from "./overlayDefaults";

/**
 * Default theme for Overlay component.
 *
 * Base classes provide:
 * - inset-0 for full viewport coverage
 * - z-index for stacking above content
 * - Semi-transparent background via CSS variable
 *
 * Props control:
 * - fixed: Fixed positioning (default: true)
 * - flex: Flexbox display (default: true)
 * - itemsCenter: Vertical centering (default: true)
 * - justifyCenter: Horizontal centering (default: true)
 * - blur: Backdrop blur effect (default: false)
 * - pointerEventsNone: Disable pointer events (default: false)
 */
export const defaultOverlayTheme = new ComponentTheme<OverlayProps, OverlayTheme>(
  'div',
  // Base classes - only non-prop-driven styles (bg moved to overlayBackground mapper for transparent support)
  'vane-overlay inset-0',
  {
    layout: {
      ...defaultSizedLayoutClassMappers,
      blur: new BlurClassMapper(),
      overlayBackground: new OverlayBackgroundClassMapper(),
      pointerEvents: new PointerEventsClassMapper(),
      ring: new RingClassMapper(),
      shadow: shadowLayoutAppearance,
    },
    appearance: {
      ring: ringAppearance,
    },
  },
  // Defaults - use boolean props instead of hardcoded classes
  overlayDefaults,
  OVERLAY_CATEGORIES,
  undefined,
  'layout'
);
