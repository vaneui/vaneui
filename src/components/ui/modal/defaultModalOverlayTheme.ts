import {
  ComponentTheme,
  defaultLayoutsThemes,
} from "../theme/common/ComponentTheme";
import type { OverlayProps } from "../overlay";
import type { ModalOverlayTheme } from "./ModalOverlayTheme";
import { OVERLAY_CATEGORIES } from "../overlay/OverlayCategories";
import { modalOverlayDefaults } from "./modalOverlayDefaults";
import { BlurTheme } from "../theme/layout/blurTheme";
import { PointerEventsTheme } from "../theme/layout/pointerEventsTheme";
import { RingTheme } from "../theme/layout/ringTheme";
import { ShadowAppearanceTheme } from "../theme/appearance/shadowAppearanceTheme";
import { SimpleConsumerTheme } from "../theme/appearance/simpleConsumerTheme";
import { ringConsumerClass } from "../classes/appearanceClasses";

/**
 * Default theme for Modal overlay (the backdrop).
 * Same structure as standalone Overlay but with modal-specific defaults.
 */
export const defaultModalOverlayTheme = new ComponentTheme<OverlayProps, ModalOverlayTheme>(
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
  // Defaults - modal overlay can have different defaults than standalone overlay
  modalOverlayDefaults,
  OVERLAY_CATEGORIES,
  undefined,
  'layout'
);
