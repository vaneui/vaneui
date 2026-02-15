import { ComponentTheme, defaultSizedLayoutClassMappers } from "../theme/common";
import type { OverlayProps } from "../overlay";
import type { ModalOverlayTheme } from "./ModalOverlayTheme";
import { OVERLAY_CATEGORIES } from "../overlay/OverlayCategories";
import { modalOverlayDefaults } from "./modalOverlayDefaults";
import { BlurClassMapper, OverlayBackgroundClassMapper, PointerEventsClassMapper, RingClassMapper } from "../theme/layout";
import { ShadowAppearanceClassMapper, SimpleConsumerClassMapper } from "../theme/appearance";
import { ringConsumerClass } from "../classes/appearanceClasses";

/**
 * Default theme for Modal overlay (the backdrop).
 * Same structure as standalone Overlay but with modal-specific defaults.
 */
export const defaultModalOverlayTheme = new ComponentTheme<OverlayProps, ModalOverlayTheme>(
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
      shadow: ShadowAppearanceClassMapper.createLayoutTheme(),
    },
    appearance: {
      ring: new SimpleConsumerClassMapper({ base: ringConsumerClass }, 'ring'),
    },
  },
  // Defaults - modal overlay can have different defaults than standalone overlay
  modalOverlayDefaults,
  OVERLAY_CATEGORIES,
  undefined,
  'layout'
);
