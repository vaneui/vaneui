import {
  ComponentTheme,
  defaultLayoutClassMappers,
} from "../theme/common/ComponentTheme";
import type { OverlayProps } from "../overlay";
import type { ModalOverlayTheme } from "./ModalOverlayTheme";
import { OVERLAY_CATEGORIES } from "../overlay/OverlayCategories";
import { modalOverlayDefaults } from "./modalOverlayDefaults";
import { BlurClassMapper } from "../theme/layout/blurClassMapper";
import { PointerEventsClassMapper } from "../theme/layout/pointerEventsClassMapper";
import { RingClassMapper } from "../theme/layout/ringClassMapper";
import { WidthClassMapper } from "../theme/layout/widthClassMapper";
import { HeightClassMapper } from "../theme/layout/heightClassMapper";
import { ShadowAppearanceClassMapper } from "../theme/appearance/shadowAppearanceClassMapper";
import { SimpleConsumerClassMapper } from "../theme/appearance/simpleConsumerClassMapper";
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
      ...defaultLayoutClassMappers,
      blur: new BlurClassMapper(),
      pointerEvents: new PointerEventsClassMapper(),
      ring: new RingClassMapper(),
      shadow: ShadowAppearanceClassMapper.createLayoutTheme(),
      width: new WidthClassMapper(),
      height: new HeightClassMapper(),
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
