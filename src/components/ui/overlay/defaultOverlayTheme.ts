import {
  ComponentTheme,
  defaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { OverlayProps } from "./OverlayProps";
import { BlurClassMapper } from "../theme/layout/blurClassMapper";
import { PointerEventsClassMapper } from "../theme/layout/pointerEventsClassMapper";
import { RingClassMapper } from "../theme/layout/ringClassMapper";
import { WidthClassMapper } from "../theme/layout/widthClassMapper";
import { HeightClassMapper } from "../theme/layout/heightClassMapper";
import { ringAppearance, shadowLayoutAppearance } from "../theme/common/appearanceClassMappers";
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
      ...defaultLayoutClassMappers,
      blur: new BlurClassMapper(),
      pointerEvents: new PointerEventsClassMapper(),
      ring: new RingClassMapper(),
      shadow: shadowLayoutAppearance,
      width: new WidthClassMapper(),
      height: new HeightClassMapper(),
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
