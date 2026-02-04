import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { OverlayProps } from "./OverlayProps";
import { BlurTheme } from "../theme/layout/blurTheme";
import { PointerEventsTheme } from "../theme/layout/pointerEventsTheme";
import { RingTheme } from "../theme/layout/ringTheme";
import { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { ringConsumerClass } from "../classes/appearanceClasses";
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
  // Base classes - only non-prop-driven styles
  'vane-overlay inset-0 z-50 bg-(--overlay-bg)',
  {
    layout: {
      ...defaultLayoutsThemes,
      blur: new BlurTheme(),
      pointerEvents: new PointerEventsTheme(),
      ring: new RingTheme(),
      shadow: ShadowAppearanceTheme.createLayoutTheme(),
    },
    appearance: {
      ring: new SimpleConsumerTheme({ base: ringConsumerClass }, 'ring'),
    },
  },
  // Defaults - use boolean props instead of hardcoded classes
  overlayDefaults,
  OVERLAY_CATEGORIES,
  undefined,
  'layout'
);
